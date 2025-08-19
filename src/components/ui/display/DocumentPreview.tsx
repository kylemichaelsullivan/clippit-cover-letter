'use client';

import { memo, useMemo } from 'react';
import { generatePageHeaderHTML, formatContentForPDF } from '@/lib/utils';
import { generateUIStyles } from '@/config/shared-styles';
import { extractTipTapContent } from '@/lib/utils/tiptap';
import type { CandidateDetails } from '@/types';

type DocumentPreviewProps = {
	content: string;
	candidateDetails: CandidateDetails;
	fontSize?: number;
	className?: string;
};

export const DocumentPreview = memo(function DocumentPreview({
	content,
	candidateDetails,
	fontSize = 11,
	className = '',
}: DocumentPreviewProps) {
	const htmlContent = useMemo(() => {
		const pageHeader = generatePageHeaderHTML(candidateDetails);
		const extractedContent = extractTipTapContent(content);
		const formattedContent = formatContentForPDF(extractedContent);

		return `
			<!DOCTYPE html>
			<html>
				<head>
					<style>
						html {
							font-size: ${fontSize}pt;
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
						
						/* TipTap Editor Styles */
						.print-document-content {
							line-height: 1.6;
						}
						
						.print-document-content h1,
						.print-document-content h2,
						.print-document-content h3,
						.print-document-content h4,
						.print-document-content h5,
						.print-document-content h6 {
							font-weight: bold;
							margin: 1rem 0 0.5rem 0;
							line-height: 1.4;
						}
						
						.print-document-content h1 { font-size: 1.8em; }
						.print-document-content h2 { font-size: 1.5em; }
						.print-document-content h3 { font-size: 1.3em; }
						.print-document-content h4 { font-size: 1.1em; }
						.print-document-content h5 { font-size: 1em; }
						.print-document-content h6 { font-size: 0.9em; }
						
						.print-document-content p {
							margin: 0.5rem 0;
							line-height: 1.6;
							min-height: 1em;
						}
						
						.print-document-content strong {
							font-weight: bold;
						}
						
						.print-document-content em {
							font-style: italic;
						}
						
						.print-document-content u {
							text-decoration: underline;
						}
						
						.print-document-content ul,
						.print-document-content ol {
							margin: 0.5rem 0;
							padding-left: 2rem;
						}
						
						.print-document-content li {
							margin: 0.25rem 0;
							line-height: 1.5;
						}
						
						.print-document-content ul {
							list-style-type: disc;
						}
						
						.print-document-content ol {
							list-style-type: decimal;
						}
						
						.print-document-content br {
							line-height: 1;
						}
						
						/* Skills formatting */
						.print-document-content ul li strong {
							font-weight: bold;
						}
						
						${generateUIStyles()}
					</style>
				</head>
				<body>
					<div style="background-color: white; width: 8.5in; min-height: 11in; margin: 0 auto;">
						${pageHeader}
						<div class="print-content print-document-content">${formattedContent}</div>
					</div>
				</body>
			</html>
		`;
	}, [content, candidateDetails, fontSize]);

	return (
		<iframe
			srcDoc={htmlContent}
			className={`DocumentPreview w-full rounded-lg border-0 ${className}`}
			style={{ height: '11in', minHeight: '600px' }}
			title='Document Preview'
		/>
	);
});
