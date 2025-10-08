'use client';

import { memo, type ReactNode } from 'react';

import { EmptyState } from '@/components/ui/feedback';

type PreviewStateManagerProps = {
	hasData: boolean;
	hasSelectedDocuments: boolean;
	isProcessing: boolean;
	children: ReactNode;
};

export const PreviewStateManager = memo(function PreviewStateManager({
	hasData,
	hasSelectedDocuments,
	isProcessing,
	children,
}: PreviewStateManagerProps) {
	if (isProcessing) {
		return <EmptyState variant='loading' />;
	}

	if (!hasData) {
		return <EmptyState variant='no-data' />;
	}

	if (!hasSelectedDocuments) {
		return <EmptyState variant='no-documents-selected' />;
	}

	return <div className='flex flex-col gap-8'>{children}</div>;
});
