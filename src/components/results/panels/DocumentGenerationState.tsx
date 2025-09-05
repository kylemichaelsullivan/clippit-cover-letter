'use client';

import { memo } from 'react';

import { EmptyState } from '@/components/ui/feedback';

type DocumentGenerationStateProps = {
	className?: string;
	hasSelectedDocuments?: boolean;
	title?: string;
	emptyStateVariant?: 'no-results' | 'no-data';
	hasContent?: boolean;
	isGenerating?: boolean;
};

export const DocumentGenerationState = memo(function DocumentGenerationState({
	className,
	hasSelectedDocuments = false,
	title = 'Document',
	emptyStateVariant = 'no-results',
	hasContent = false,
	isGenerating = false,
}: DocumentGenerationStateProps) {
	if (!hasSelectedDocuments) {
		return <EmptyState variant={emptyStateVariant} />;
	}

	if (hasSelectedDocuments && !hasContent) {
		return <EmptyState variant='no-data' />;
	}

	if (isGenerating) {
		return (
			<div
				className={`ResultsDocumentContentGenerating print-content print-document border-light-gray force-white-bg border ${className || ''}`}
			>
				<div className='ResultsDocumentContentGeneratingText text-light-gray flex min-h-64 w-full items-center justify-center p-8 text-center font-mono sm:min-h-96 sm:text-base'>
					Generating {title}…
				</div>
			</div>
		);
	}

	return null;
});
