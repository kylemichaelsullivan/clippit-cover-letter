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
