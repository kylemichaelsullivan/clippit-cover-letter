import puppeteer from 'puppeteer';
import { NextRequest, NextResponse } from 'next/server';
import type { CandidateDetails } from '@/types';
import { generateUIStyles } from '@/config/shared-styles';

type GeneratePDFRequest = {
	filename: string;
	candidateDetails: CandidateDetails;
	html: string;
	fontSize?: string;
};

export async function POST(request: NextRequest) {
	console.log('PDF generation API called');

	try {
		const {
			filename,
			candidateDetails,
			html,
			fontSize = '11pt',
		}: GeneratePDFRequest = await request.json();

		console.log('PDF generation request received:', { filename, fontSize });

		console.log('Launching Puppeteer browser…');
		let browser;
		try {
			browser = await puppeteer.launch({
				headless: true,
				args: [
					'--no-sandbox',
					'--disable-setuid-sandbox',
					'--disable-dev-shm-usage',
					'--disable-gpu',
					'--no-first-run',
					'--no-zygote',
					'--single-process',
					'--disable-web-security',
					'--disable-features=VizDisplayCompositor',
					'--disable-extensions',
					'--disable-plugins',
					'--disable-images',
					'--disable-javascript',
					'--disable-background-timer-throttling',
					'--disable-backgrounding-occluded-windows',
					'--disable-renderer-backgrounding',
				],
				timeout: 60000,
				executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
			});
		} catch (browserError) {
			console.error('Failed to launch Puppeteer browser:', browserError);
			throw new Error(
				`Failed to start PDF generation engine: ${browserError instanceof Error ? browserError.message : 'Unknown error'}`,
			);
		}

		const page = await browser.newPage();

		const headerTemplate = await generateHeaderTemplate(candidateDetails);
		const footerTemplate = await generateFooterTemplate(candidateDetails);

		const fullHTML = `
			<!DOCTYPE html>
			<html>
				<head>
					<meta charset="UTF-8">
					<title>${filename}</title>
					<style>
						:root {
							--white: #ffffff;
							--red: #dc2626;
							--green: #10b981;
							--light-blue: #60a5fa;
							--blue: #3b82f6;
							--light-gray: #cbd5e1;
							--gray: #64748b;
							--black: #0f172a;
							--color-white: var(--white);
							--color-red: var(--red);
							--color-green: var(--green);
							--color-light-blue: var(--light-blue);
							--color-blue: var(--blue);
							--color-light-gray: var(--light-gray);
							--color-gray: var(--gray);
							--color-black: var(--black);
							--font-geist-mono: 'Courier New', monospace;
						}
						
						html {
							font-size: ${fontSize};
						}
						
						body { 
							box-sizing: border-box;
							font-family: Arial, sans-serif; 
							margin: 0;
							padding: 0;
							line-height: 1.2;
							background-color: white;
						}
						
						.content {
							padding: 1rem;
							max-width: 8.5in;
							margin: 0 auto;
						}
						
						/* Content styles */
						h1, h2, h3, h4, h5, h6 {
							margin: 0.5rem 0 0.25rem 0;
							color: var(--color-black);
							line-height: 1.1;
						}
						
						h1 { 
							font-size: 1.875rem; 
							font-weight: 700;
							font-variant: small-caps;
							border-bottom: 1px solid var(--color-gray);
							padding-bottom: 0.25rem;
							margin-bottom: 0.5rem;
						}
						h2 { 
							font-size: 1.5rem; 
							font-weight: 700;
							font-variant: small-caps;
							border-bottom: 1px solid var(--color-gray);
							padding-bottom: 0.25rem;
							margin-bottom: 0.5rem;
						}
						h3 { 
							font-size: 1.25rem; 
							margin-bottom: 0.25rem;
						}
						
						p {
							margin: 0.25rem 0;
							line-height: 1.1;
						}
						
						ul, ol {
							margin: 0.25rem 0;
							padding-left: 1.5rem;
							line-height: 1.1;
						}
						
						li {
							margin: 0.125rem 0;
							line-height: 1.1;
							padding: 0.125rem 0 0;
						}
						
						strong {
							font-weight: bold;
							color: var(--color-black);
						}
						
						.signature-image {
							width: auto;
							max-height: 2.5em;
						}
						
						/* Use shared styles for consistency */
						${generateUIStyles()}
					</style>
				</head>
				<body>
					<div class="content">
						${html}
					</div>
				</body>
			</html>
		`;

		await page.setContent(fullHTML);

		const pdf = await page.pdf({
			format: 'Letter',
			displayHeaderFooter: true,
			headerTemplate: headerTemplate,
			footerTemplate: footerTemplate,
			margin: {
				top: '80px',
				bottom: '80px',
				left: '40px',
				right: '40px',
			},
			printBackground: true,
		});

		await browser.close();

		return new NextResponse(Buffer.from(pdf), {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="${filename}.pdf"`,
				'Content-Length': pdf.length.toString(),
			},
		});
	} catch (error) {
		console.error('PDF generation error:', error);

		let errorMessage = 'Failed to generate PDF';
		if (error instanceof Error) {
			if (error.message.includes('timeout')) {
				errorMessage = 'PDF generation timed out. Please try again.';
			} else if (error.message.includes('launch')) {
				errorMessage =
					'Failed to start PDF generation engine. Please try again.';
			} else if (error.message.includes('network')) {
				errorMessage =
					'Network error during PDF generation. Please check your connection.';
			} else {
				errorMessage = `PDF generation failed: ${error.message}`;
			}
		}

		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}

async function generateHeaderTemplate(
	candidateDetails: CandidateDetails,
): Promise<string> {
	const { fullName, email, phone, linkedin, portfolio } = candidateDetails;

	const formattedLinkedin = linkedin ? `/in/${linkedin}` : '';
	const contactInfo = [email, phone, formattedLinkedin, portfolio]
		.filter(Boolean)
		.join(' | ');

	return `
		<div style="
			width: 100%;
			text-align: center;
			padding: 10px 0;
			font-family: Arial, sans-serif;
			font-size: 11pt;
			line-height: 1.0;
		">
			<div style="
				font-size: 18pt;
				font-weight: bold;
				margin-bottom: 4px;
				text-transform: uppercase;
				color: #0f172a;
				line-height: 1.0;
			">${fullName || 'Your Name'}</div>
			${contactInfo ? `<div style="font-size: 10pt; color: #64748b; line-height: 1.0;">${contactInfo}</div>` : ''}
		</div>
	`;
}

async function generateFooterTemplate(
	candidateDetails: CandidateDetails,
): Promise<string> {
	const { logo, logoInclude, portfolioQRCode, portfolio } = candidateDetails;

	const logoHTML =
		logoInclude && logo
			? `<img src="${logo}" style="width: auto; height: 36px; max-width: 36px;" alt="Logo" />`
			: '';

	const shouldShowQRCode =
		portfolioQRCode && portfolio && portfolio.trim() !== '';

	const qrCodeHTML = shouldShowQRCode
		? `<div style="width: 36px; height: 36px;">${await generateQRCodeSVG(portfolio)}</div>`
		: '';

	return `
		<div style="
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 40px;
			font-family: Arial, sans-serif;
			font-size: 9pt;
			color: #64748b;
		">
			${qrCodeHTML}
			${logoHTML}
		</div>
	`;
}

async function generateQRCodeSVG(url: string): Promise<string> {
	try {
		const QRCode = await import('qrcode');
		const svg = await QRCode.toString(url, {
			type: 'svg',
			width: 36,
			margin: 1,
			errorCorrectionLevel: 'L',
			color: {
				dark: '#000000',
				light: '#FFFFFF',
			},
		});
		return svg;
	} catch (error) {
		console.error('Error generating QR code:', error);
		return '';
	}
}
