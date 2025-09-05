'use client';

import { memo, type ReactNode } from 'react';

import { ActionButtons } from '@/components/results/actions';
import { DocumentContent } from './DocumentContent';
import { useCandidateStore } from '@/lib/stores';
import type { DocumentType, FontSize } from '@/types';

type DocumentSectionProps = {
	documentType: DocumentType;
	title: string;
	content: string;
	fontSize: FontSize;
	showActions?: boolean;
	headerElement?: ReactNode;
	className?: string;
};

export const DocumentSection = memo(function DocumentSection({
	className,
	documentType,
	title,
	content,
	fontSize,
	showActions = true,
	headerElement,
}: DocumentSectionProps) {
	const { candidateDetails } = useCandidateStore();

	if (!content || content.trim() === '') {
		return null;
	}

	return (
		<div className={className}>
			<div className='flex flex-col gap-4'>
				<DocumentContent
					documentType={documentType}
					title={title}
					content={content}
					fontSize={fontSize}
					headerElement={headerElement}
					isEditable={false}
				/>
				{showActions && (
					<ActionButtons
						documentType={documentType}
						filename={
							documentType === 'cover-letter' ? 'cover-letter' : 'resume'
						}
						text={content}
						candidateDetails={candidateDetails}
						fontSize={fontSize}
					/>
				)}
			</div>
		</div>
	);
});
