'use client';

import { memo } from 'react';

import { DocumentPreview as UIDocumentPreview } from '@/components/ui/display';
import { renderHtmlContent } from '@/lib/utils';
import { useCandidateStore } from '@/lib/stores';
import type { DocumentType, FontSize } from '@/types';

type DocumentPreviewProps = {
	content: string;
	documentType?: DocumentType;
	fontSize?: FontSize;
	className?: string;
};

export const DocumentPreview = memo(function DocumentPreview({
	content,
	documentType,
	fontSize,
	className,
}: DocumentPreviewProps) {
	const { candidateDetails } = useCandidateStore();
	const isCoverLetter = documentType === 'cover-letter';
	const isResume = documentType === 'resume';

	const renderPageHeader = () => {
		if (!isCoverLetter && !isResume) return null;

		const { fullName, email, phone, linkedin, portfolio } = candidateDetails;
		const formattedLinkedin = linkedin ? `/in/${linkedin}` : '';
		const contactInfo = [email, phone, formattedLinkedin, portfolio]
			.filter(Boolean)
			.join(' | ');

		return (
			<div className='page-header text-center'>
				<h1 className='page-header-name text-2xl font-bold'>{fullName}</h1>
				{contactInfo && (
					<div className='page-header-contact text-sm font-light'>
						{contactInfo}
					</div>
				)}
			</div>
		);
	};

	if (isResume || isCoverLetter) {
		return (
			<div
				className={`print-content print-document border-light-gray force-white-bg border p-2 ${className || ''}`}
			>
				<UIDocumentPreview
					className='rounded-lg'
					documentType={isCoverLetter ? 'cover-letter' : 'resume'}
					content={content}
					candidateDetails={candidateDetails}
					fontSize={fontSize || [11, 'pt']}
				/>
			</div>
		);
	}

	return (
		<div
			className={`print-content print-document border-light-gray force-white-bg border p-2 ${className || ''}`}
		>
			{renderPageHeader()}
			<div className='p-0'>{renderHtmlContent(content, candidateDetails)}</div>
		</div>
	);
});
