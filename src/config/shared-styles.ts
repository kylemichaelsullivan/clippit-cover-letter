// Shared style generators that can be used in both PDF generation and UI display

// Prose styles that are used by both PDF and UI
const SHARED_PROSE_CORE = `
	white-space: pre-wrap;
	color: var(--color-black);
	line-height: 1.2;
`;

const SHARED_PROSE_RESET = `
	padding: 0;
	margin: 0;
`;

const SHARED_HEADINGS = `
	color: var(--color-black);
	line-height: 1.2;
	margin: 0;
`;

const SHARED_HEADING_VARIANTS = `
	font-variant: small-caps;
`;

const SHARED_FONT_SIZES = {
	h1: '1.875rem',
	h2: '1.5rem',
	h3: '1.25rem',
	h4: '1.125rem',
};

const SHARED_PARAGRAPH = `
	margin: 0;
`;

const SHARED_EMPHASIS = {
	strong: `
		color: var(--color-black);
		font-weight: 700;
	`,
	em: `
		font-style: italic;
	`,
};

const SHARED_LISTS = `
	margin: 0;
`;

const SHARED_LIST_ITEMS = `
	margin: 0.5rem 0 0;
`;

const SHARED_BLOCKQUOTE = `
	border-left: 3px solid var(--color-light-gray);
	color: var(--color-gray);
	font-style: italic;
	padding-left: 1rem;
	margin: 0;
`;

const SHARED_LINKS = `
	color: var(--color-blue);
	text-decoration: underline;
`;

const SHARED_LINKS_HOVER = `
	color: var(--color-light-blue);
`;

const SHARED_HR = `
	border: none;
	border-top: 1px solid var(--color-light-gray);
	margin: 1em 0;
`;

function generateProseStyles(className: string): string {
	return `
${className} {
${SHARED_PROSE_CORE}
}

${className} * {
${SHARED_PROSE_RESET}
}

${className} h1,
${className} h2,
${className} h3,
${className} h4,
${className} h5,
${className} h6 {
${SHARED_HEADINGS}
}

${className} h1,
${className} h2 {
${SHARED_HEADING_VARIANTS}
}

${className} h1 {
	font-size: ${SHARED_FONT_SIZES.h1};
	font-weight: 700;
}

${className} h2 {
	font-size: ${SHARED_FONT_SIZES.h2};
	font-weight: 700;
	border-bottom: 1px solid var(--color-gray);
}

${className} * + h2 {
	padding-top: 1rem;
}

${className} h3 {
	font-size: ${SHARED_FONT_SIZES.h3};
	font-weight: 600;
}

${className} * + h3 {
	padding-top: 0.5rem;
}

${className} h4 {
	font-size: ${SHARED_FONT_SIZES.h4};
}

${className} p {
${SHARED_PARAGRAPH}
}

${className} strong {
${SHARED_EMPHASIS.strong}
}

${className} em {
${SHARED_EMPHASIS.em}
}

${className} .text-shadow {
	font-weight: 500;
	text-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
}

${className} ul,
${className} ol {
${SHARED_LISTS}
}

${className} ul {
	list-style: disc;
	padding-left: 1.5rem;
}

${className} ol {
	list-style: decimal;
	padding-left: 2rem;
}

${className} li {
${SHARED_LIST_ITEMS}
}

${className} blockquote {
${SHARED_BLOCKQUOTE}
}



${className} a {
${SHARED_LINKS}
}

${className} a:hover {
${SHARED_LINKS_HOVER}
}

${className} hr {
${SHARED_HR}
}

${className} .page-break {
	display: block;
	clear: both;
	border: none;
	break-before: page;
	page-break-before: always;
	height: 0;
	padding: 0;
	margin: 0;
}
`;
}

export function generateSharedProseStyles(): string {
	return generateProseStyles('.shared-prose');
}

export function generateProseCompactStyles(): string {
	return generateProseStyles('.prose-compact');
}

export function generatePrintContentStyles(): string {
	return generateProseStyles('.print-content');
}

// Page header styles
const SHARED_PAGE_HEADER_CORE = `
	text-align: center;
	padding: 0;
`;

const SHARED_PAGE_HEADER_NAME = `
	font-weight: bold;
	text-transform: uppercase;
	margin: 0;
`;

const SHARED_PAGE_HEADER_CONTACT = `
	color: var(--color-gray);
	font-size: 0.875rem;
	margin: 0;
`;

function generatePageHeaderStyles(
	className: string,
	margin: string = '0 0 2rem 0',
): string {
	return `
${className} {
${SHARED_PAGE_HEADER_CORE}
	margin: ${margin};
}

${className}-name {
${SHARED_PAGE_HEADER_NAME}
}

${className}-contact {
${SHARED_PAGE_HEADER_CONTACT}
}
`;
}

export function generateSharedPageHeaderStyles(): string {
	return generatePageHeaderStyles('.shared-page-header');
}

export function generateUIPageHeaderStyles(): string {
	return generatePageHeaderStyles('.page-header', '0 0 2rem 0');
}

export function generateUIStyles(): string {
	return `
${generateProseCompactStyles()}
${generatePrintContentStyles()}
${generateUIPageHeaderStyles()}

.print-document-content {
	background-color: #ffffff !important;
	color: #000000 !important;
}

.print-document-content h1,
.print-document-content h2,
.print-document-content h3,
.print-document-content h4,
.print-document-content h5,
.print-document-content h6 {
	color: #000000 !important;
}

.print-document-content h1 {
	border-bottom: 1px solid #64748b !important;
}

.print-document-content h2 {
	page-break-after: avoid !important;
	break-after: avoid !important;
	orphans: 2 !important;
}

.print-document-content p {
	color: #000000 !important;
	min-height: 1em;
}

.print-document-content strong {
	color: #000000 !important;
}

.print-document-content em {
	color: #000000 !important;
}

.print-document-content .text-shadow {
	font-weight: 500 !important;
	text-shadow: 0 1px 1px rgba(0, 0, 0, 0.25) !important;
}

.print-document-content .page-break {
	page-break-before: always !important;
	break-before: page !important;
	height: 0 !important;
	margin: 0 !important;
	padding: 0 !important;
	border: none !important;
	display: block !important;
	clear: both !important;
}

/* Visual indicator for page breaks in editor (screen only) */
.TipTapEditorContent .page-break {
	height: 2px !important;
	margin: 1rem 0 !important;
	background: linear-gradient(to right, transparent, #cbd5e1, transparent) !important;
	border-radius: 1px !important;
}

.TipTapEditorContent .page-break::before {
	content: 'Page Break' !important;
	display: block !important;
	text-align: center !important;
	font-size: 0.75rem !important;
	color: #64748b !important;
	margin-bottom: 0.5rem !important;
	font-style: italic !important;
}

/* Hide visual indicators in print */
@media print {
	.TipTapEditorContent .page-break {
		height: 0 !important;
		margin: 0 !important;
		background: none !important;
	}
	
	.TipTapEditorContent .page-break::before {
		content: none !important;
		display: none !important;
	}
}

.print-document-content ul,
.print-document-content ol {
	color: #000000 !important;
}

.print-document-content li {
	color: #000000 !important;
}

.print-document-content blockquote {
	color: #374151 !important;
}

.print-document-content code {
	background-color: #f3f4f6 !important;
	color: #000000 !important;
}

.print-document-content pre {
	background-color: #f3f4f6 !important;
}

.print-document-content hr {
	border-color: #f3f4f6 !important;
}

/* Print-friendly page header styles */
.print-document .page-header-name {
	color: #000000 !important;
}

.print-document .page-header-contact {
	color: #6b7280 !important;
}
`;
}
