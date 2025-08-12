import {
	generateSharedProseStyles,
	generateSharedPageHeaderStyles,
	generatePrintContentStyles,
	generateUIPageHeaderStyles,
} from './shared-styles';

// PDF-specific styles that extend the shared styles
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
	min-height: 11in;
	width: 8.5in;
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
		size: letter;
		background-color: white;
		padding: 0;
		margin: 0;
	}
	
	body > div {
		padding: 0;
	}
}

${generateSharedProseStyles()}
${generateSharedPageHeaderStyles()}
${generatePrintContentStyles()}
${generateUIPageHeaderStyles()}
`;
