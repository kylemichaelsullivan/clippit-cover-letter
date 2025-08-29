'use client';

import { memo } from 'react';

import { DocumentRenderer } from '@/components/shared';

type ResultsStateManagerProps = {
	className?: string;
};

export const ResultsStateManager = memo(function ResultsStateManager({
	className,
}: ResultsStateManagerProps) {
	return (
		<DocumentRenderer
			className={className}
			showActions={true}
			showFontSizeControl={true}
			emptyStateVariant='no-results'
		/>
	);
});
