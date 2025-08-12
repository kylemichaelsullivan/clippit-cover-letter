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
	padding: 1rem 0;
}

body { 
	box-sizing: border-box;
	background-color: #f3f4f6;
	font-family: Arial, sans-serif; 
	font-size: 12pt;
	line-height: 1.6; 
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

.print-content {
	white-space: pre-wrap;
	color: var(--color-black);
	line-height: 1.25;
}

.print-content h1,
.print-content h2,
.print-content h3,
.print-content h4,
.print-content h5,
.print-content h6 {
	color: var(--color-black);
	font-weight: 700;
	line-height: 1.125;
	margin-bottom: 0;
}

.print-content h1,
.print-content h2 {
	text-transform: uppercase;
}

.print-content h1 {
	font-size: 1.875rem;
}

.print-content h2 {
	border-bottom: 1px solid var(--color-gray);
	font-size: 1.5rem;
}

.print-content h3 {
	font-size: 1.25rem;
}

.print-content h4 {
	font-size: 1.125rem;
}

.print-content p {
	line-height: 1.25;
	margin-bottom: 0;
}

.print-content strong {
	color: var(--color-black);
	font-weight: 700;
}

.print-content em {
	font-style: italic;
}

.print-content ul,
.print-content ol {
	line-height: 1;
	padding-left: 1.5em;
	margin-bottom: 0;
}

.print-content li {
	margin-bottom: 0;
}

.print-content ul li {
	list-style-type: disc;
}

.print-content ol li {
	list-style-type: decimal;
}

.print-content blockquote {
	border-left: 4px solid var(--color-blue);
	color: var(--color-gray);
	font-style: italic;
	padding-left: 1em;
	margin: 0.75em 0;
}

.print-content code {
	background-color: var(--color-light-gray);
	border-radius: 0.25rem;
	font-family: var(--font-geist-mono), 'Courier New', monospace;
	font-size: 0.875em;
	padding: 0.125rem 0.25rem;
}

.print-content pre {
	background-color: var(--color-light-gray);
	border-radius: 0.5rem;
	padding: 1em;
	margin: 0.75em 0;
	overflow-x: auto;
}

.print-content pre code {
	background-color: transparent;
	padding: 0;
}

.print-content a {
	color: var(--color-blue);
	text-decoration: underline;
}

.print-content a:hover {
	color: var(--color-light-blue);
}

.print-content hr {
	border: none;
	border-top: 1px solid var(--color-light-gray);
	margin: 1em 0;
}

.page-header {
	text-align: center;
	padding: 0;
	margin: 0 0 2rem 0;
}

.page-header-name {
	font-size: 1.5rem;
	font-variant: small-caps;
	font-weight: bold;
	line-height: 1.125;
	margin: 0;
}

.page-header-contact {
	color: var(--color-gray);
	font-size: 0.875rem;
	margin: 0;
}
`;
