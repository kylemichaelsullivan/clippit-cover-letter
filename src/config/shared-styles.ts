// Shared style generators that can be used in both PDF generation and UI display

// Prose styles that are used by both PDF and UI
const SHARED_BLOCKQUOTE = `
	border-left: 3px solid var(--color-light-gray);
	color: var(--color-gray);
	font-style: italic;
	line-height: 1.2;
	padding-left: 1rem;
	margin: 0;
`;

const SHARED_EMPHASIS = {
	em: `
		font-style: italic;
	`,
	strong: `
		color: var(--color-black);
		font-weight: 700;
	`,
};

const SHARED_FONT_SIZES = {
	h1: '1.875rem',
	h2: '1.5rem',
	h3: '1.25rem',
	h4: '1.125rem',
};

const SHARED_HEADINGS = `
	color: var(--color-black);
	line-height: 1.1;
	margin: 0.5rem 0 0.25rem 0;
`;

const SHARED_HEADING_VARIANTS = `
	font-variant: small-caps;
`;

const SHARED_LINKS = `
	color: var(--color-blue);
	text-decoration: underline;
`;

const SHARED_LINKS_HOVER = `
	color: var(--color-light-blue);
`;

const SHARED_LISTS = `
	line-height: 1.1;
	margin: 0.25rem 0;
`;

const SHARED_LIST_ITEMS = `
	line-height: 1.1;
	padding: 0.125rem 0 0;
`;

const SHARED_PAGE_HEADER_CONTACT = `
	color: var(--color-gray);
	font-size: 0.875rem;
	margin: 0;
	line-height: 1.0;
`;

const SHARED_PAGE_HEADER_CORE = `
	padding: 0;
	text-align: center;
`;

const SHARED_PAGE_HEADER_NAME = `
	font-weight: bold;
	margin: 0;
	text-transform: uppercase;
	line-height: 1.0;
`;

const SHARED_PAGE_FOOTER = `
	position: absolute;
	width: 100%;
	height: 32px;
	right: 0;
	bottom: 0;
	left: 0;
`;

const SHARED_PAGE_LOGO = `
	position: absolute;
	width: auto;
	max-width: 32px;
	height: auto;
	max-height: 32px;
	right: 1rem;
	bottom: 0;
	z-index: 10;
`;

const SHARED_PAGE_LOGO_IMAGE = `
	object-fit: contain;
	width: auto;
	max-width: 32px;
	height: auto;
	max-height: 32px;
`;

const SHARED_PAGE_QR_CODE = `
	position: absolute;
	width: 32px;
	height: 32px;
	bottom: 0;
	left: 1rem;
	z-index: 10;
`;

const SHARED_PARAGRAPH = `
	line-height: 1.1;
	margin: 0.25rem 0;
`;

const SHARED_PROSE_CORE = `
	color: var(--color-black);
`;

const SHARED_PROSE_RESET = `
	padding: 0;
	margin: 0;
`;

const SHARED_PAGE_BREAK = `
	display: block;
	clear: both;
	border: none;
	break-before: page;
	page-break-before: always;
	height: 0;
	padding: 0;
	margin: 0;
`;

// Print document styles constants
const PRINT_DOCUMENT_CORE = `
	background-color: var(--color-white);
	color: var(--color-black);
`;

const PRINT_DOCUMENT_HEADINGS = `
	color: var(--color-black);
`;

const PRINT_DOCUMENT_H1_BORDER = `
	border-bottom: 1px solid var(--color-gray);
	padding-bottom: 0.25rem;
	font-variant: small-caps;
`;

const PRINT_DOCUMENT_H2_BREAK = `
	border-bottom: 1px solid var(--color-gray);
	padding-bottom: 0.25rem;
	font-variant: small-caps;
	break-after: avoid;
	orphans: 2;
	page-break-after: avoid;
`;

const PRINT_DOCUMENT_TEXT = `
	color: var(--color-black);
`;

const PRINT_DOCUMENT_TEXT_SHADOW = `
	font-weight: 500;
	text-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
`;

const PRINT_DOCUMENT_PAGE_BREAK = `
${SHARED_PAGE_BREAK}
	background: none;
`;

const PRINT_DOCUMENT_LISTS = `
	color: var(--color-black);
`;

const PRINT_DOCUMENT_BLOCKQUOTE = `
	color: var(--color-gray);
`;

const PRINT_DOCUMENT_CODE = `
	background-color: var(--color-light-gray);
	color: var(--color-black);
`;

const PRINT_DOCUMENT_PRE = `
	background-color: var(--color-light-gray);
`;

const PRINT_DOCUMENT_HR = `
	border-color: var(--color-light-gray);
`;

const PRINT_DOCUMENT_PAGE_HEADER_NAME = `
	color: var(--color-black);
	line-height: 1.0;
`;

const PRINT_DOCUMENT_PAGE_HEADER_CONTACT = `
	color: var(--color-gray);
	line-height: 1.0;
`;

// TipTap editor page break styles
const TIPTAP_PAGE_BREAK_VISUAL = `
	background: linear-gradient(to right, transparent, var(--color-light-gray), transparent);
	border-radius: 1px;
	height: 2px;
	margin: 1rem 0;
`;

const TIPTAP_PAGE_BREAK_LABEL = `
	display: block;
	content: 'Page Break';
	color: var(--color-gray);
	font-size: 0.75rem;
	font-style: italic;
	text-align: center;
	margin-bottom: 0.5rem;
`;

const TIPTAP_PAGE_BREAK_PRINT = `
	background: none;
	height: 0;
	margin: 0;
	page-break-before: always;
	break-before: page;
	display: block;
	clear: both;
	border: none;
	padding: 0;
`;

const TIPTAP_PAGE_BREAK_LABEL_PRINT = `
	display: none;
	content: none;
`;

const SIGNATURE_IMAGE = `
	width: auto;
	max-height: 3em;
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
	border-bottom: 1px solid var(--color-gray);
	font-size: ${SHARED_FONT_SIZES.h1};
	font-weight: 700;
	padding-bottom: 0.25rem;
	margin-bottom: 0.5rem;
}

${className} h2 {
	border-bottom: 1px solid var(--color-gray);
	font-size: ${SHARED_FONT_SIZES.h2};
	font-weight: 700;
	padding-bottom: 0.25rem;
	margin-bottom: 0.5rem;
}

${className} * + h2 {
	padding-top: 0.5rem;
}

${className} h3 {
	font-size: ${SHARED_FONT_SIZES.h3};
	font-weight: 600;
	margin-bottom: 0.25rem;
}

${className} * + h3 {
	padding-top: 0.25rem;
}

${className} h4 {
	font-size: ${SHARED_FONT_SIZES.h4};
}

${className} p {
${SHARED_PARAGRAPH}
}

${className} h2 + p {
	margin-top: 0;
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

${className} .page-break {
${SHARED_PAGE_BREAK}
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

function generatePrintDocumentStyles(className: string): string {
	return `
${className} {
${PRINT_DOCUMENT_CORE}
}

${className} h1,
${className} h2,
${className} h3,
${className} h4,
${className} h5,
${className} h6 {
${PRINT_DOCUMENT_HEADINGS}
}

${className} h1 {
${PRINT_DOCUMENT_H1_BORDER}
}

${className} h2 {
${PRINT_DOCUMENT_H2_BREAK}
}

${className} p {
${PRINT_DOCUMENT_TEXT}
}

${className} strong {
${PRINT_DOCUMENT_TEXT}
}

${className} em {
${PRINT_DOCUMENT_TEXT}
}

${className} .text-shadow {
${PRINT_DOCUMENT_TEXT_SHADOW}
}

${className} .page-break {
${PRINT_DOCUMENT_PAGE_BREAK}
}

${className} ul,
${className} ol {
${PRINT_DOCUMENT_LISTS}
}

${className} li {
${PRINT_DOCUMENT_LISTS}
}

${className} blockquote {
${PRINT_DOCUMENT_BLOCKQUOTE}
}

${className} code {
${PRINT_DOCUMENT_CODE}
}

${className} pre {
${PRINT_DOCUMENT_PRE}
}

${className} hr {
${PRINT_DOCUMENT_HR}
}
`;
}

function generatePrintPageHeaderStyles(className: string): string {
	return `
${className} .page-header-name {
${PRINT_DOCUMENT_PAGE_HEADER_NAME}
}

${className} .page-header-contact {
${PRINT_DOCUMENT_PAGE_HEADER_CONTACT}
}
`;
}

export function generatePrintDocumentContent(): string {
	return `
html {
	padding: 0;
}

${generatePrintDocumentStyles('.print-document-content')}
${generatePrintPageHeaderStyles('.print-document')}
.signature-image {
${SIGNATURE_IMAGE}
}

.page-footer {
${SHARED_PAGE_FOOTER}
}

.page-logo {
${SHARED_PAGE_LOGO}
}

.page-logo-image {
${SHARED_PAGE_LOGO_IMAGE}
}

.page-qr-code {
${SHARED_PAGE_QR_CODE}
}
`;
}

function generateTipTapPageBreakStylesInternal(className: string): string {
	return `
${className} .page-break {
${TIPTAP_PAGE_BREAK_VISUAL}
}

${className} .page-break::before {
${TIPTAP_PAGE_BREAK_LABEL}
}

@media print {
	${className} .page-break {
${TIPTAP_PAGE_BREAK_PRINT}
	}
	
	${className} .page-break::before {
${TIPTAP_PAGE_BREAK_LABEL_PRINT}
	}
}
`;
}

export function generateTipTapPageBreakStyles(): string {
	return generateTipTapPageBreakStylesInternal('.TipTapEditorContent');
}

function generatePageHeaderStyles(
	className: string,
	margin = '0 0 2rem 0'
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
${generatePrintDocumentContent()}
${generateTipTapPageBreakStyles()}
`;
}
