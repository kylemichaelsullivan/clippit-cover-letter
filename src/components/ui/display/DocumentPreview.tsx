'use client';

import { memo, useMemo } from 'react';
import { generatePageHeaderHTML, formatContentForPDF } from '@/lib/utils';
import { generateUIStyles } from '@/config/shared-styles';
import { extractTipTapContent } from '@/lib/utils/tiptap';
import { replaceSignaturePlaceholders } from '@/lib/utils/signatureReplacement';
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
		const contentWithSignature = replaceSignaturePlaceholders(
			formattedContent,
			candidateDetails,
		);

		return `
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
						
						/* Use shared styles for consistent formatting */
						${generateUIStyles()}
					</style>
				</head>
				<body>
					<div style="position: relative; background-color: white; width: 8.5in; min-height: 11in; margin: 0 auto;">
						${pageHeader}
						<div class="print-content print-document-content">${contentWithSignature}</div>
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
