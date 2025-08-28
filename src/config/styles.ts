import {
	generateSharedProseStyles,
	generateSharedPageHeaderStyles,
	generatePrintContentStyles,
	generateUIPageHeaderStyles,
	generatePrintDocumentContent,
} from './shared-styles';

export const PDF_STYLES = `
@page {
	size: letter;
	margin: 1in;
}

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
	font-size: 11pt;
	padding: 1rem 0;
}

body { 
	box-sizing: border-box;
	background-color: #f3f4f6;
	font-family: Arial, sans-serif; 
	width: 8.5in;
	min-height: 11in;
	margin: 0 auto;
}

body > div {
	padding: 1rem;
}

@media print {
	html {
		padding: 0;
		margin: 0;
	}
	
	body { 
		background-color: white;
		size: letter;
		padding: 0;
		margin: 0;
	}
	
	body > div {
		padding: 0;
	}
	
	.page-header {
		position: fixed;
		background-color: white;
		width: 100%;
		padding: 0.5rem 0;
		top: 0;
		right: 0;
		left: 0;
		z-index: 10;
	}
	
	.print-content {
		margin-top: 4rem;
		margin-bottom: 3rem;
	}
	
	.page-footer {
		position: fixed;
		background-color: white;
		right: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 0.5rem 0;
		z-index: 10;
	}
}

${generateSharedProseStyles()}
${generateSharedPageHeaderStyles()}
${generatePrintContentStyles()}
${generateUIPageHeaderStyles()}
${generatePrintDocumentContent()}

.signature-image {
	width: auto;
	max-height: 3em;
}
	
/* Additional PDF-specific styles for footer elements */
.page-footer {
	position: absolute;
	width: 100%;
	height: 32px;
	right: 0;
	bottom: 0;
	left: 0;
}

.page-logo, .page-logo-image {
	width: auto;
	max-width: 32px;
	height: auto;
	max-height: 32px;
}

.page-logo {
	position: absolute;
	right: 1rem;
	bottom: 0;
	z-index: 10;
}

.page-logo-image {
	object-fit: contain;
}

.page-qr-code {
	position: absolute;
	width: 32px;
	height: 32px;
	bottom: 0;
	left: 1rem;
	z-index: 10;
}
`;
