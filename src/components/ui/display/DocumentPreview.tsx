'use client';

import { generateUIStyles } from '@/config/shared-styles';
import {
	formatContentForPDF,
	generatePageFooterHTML,
	generatePageHeaderHTML,
} from '@/lib/utils';
import { getFontSizeString } from '@/lib/utils/fontSize';
import { replaceSignaturePlaceholders } from '@/lib/utils/signatureReplacement';
import { extractTipTapContent } from '@/lib/utils/tiptap';
import type { CandidateDetails, DocumentType, FontSize } from '@/types';
import { memo, useEffect, useState } from 'react';

type DocumentPreviewProps = {
	content: string;
	candidateDetails: CandidateDetails;
	documentType?: DocumentType;
	className?: string;
	fontSize?: FontSize;
};

export const DocumentPreview = memo(function DocumentPreview({
	content,
	candidateDetails,
	documentType = 'cover-letter',
	className = '',
	fontSize = [11, 'pt'],
}: DocumentPreviewProps) {
	const [htmlContent, setHtmlContent] = useState<string>('');

	useEffect(() => {
		const generateContent = async () => {
			const pageHeader = await generatePageHeaderHTML(candidateDetails);
			const pageFooter = await generatePageFooterHTML(candidateDetails);
			const extractedContent = extractTipTapContent(content);
			const formattedContent = formatContentForPDF(extractedContent);
			const contentWithSignature = replaceSignaturePlaceholders(
				formattedContent,
				candidateDetails
			);

			const html = `
				<!DOCTYPE html>
				<html>
					<head>
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
								font-size: ${getFontSizeString(fontSize)};
								padding: 1rem 0;
							}
							
							body { 
								box-sizing: border-box;
								font-family: Arial, sans-serif; 
								padding: 0;
								margin: 0;
							}
							
							body > div {
								position: relative;
								background-color: var(--color-white);
								width: 8.5in;
								height: auto;
								padding: 1in;
								margin: 0 auto;
							}

	 						/* Use shared styles for consistent formatting */
							${generateUIStyles()}
						</style>
					</head>
					<body>
						<div>
							${pageHeader}
							<div class="print-content print-document-content">
								${contentWithSignature}
							</div>
							${pageFooter}
						</div>
					</body>
				</html>
			`;

			setHtmlContent(html);
		};

		generateContent();
	}, [content, candidateDetails, documentType, fontSize]);

	return (
		<div className={`border p-4 ${className}`}>
			<iframe
				srcDoc={htmlContent}
				className='DocumentPreview w-full border-0'
				title='Document Preview'
				style={{
					height: 'calc(10in + 1rem)',
					aspectRatio: '8.5 / 11',
				}}
			/>
		</div>
	);
});
