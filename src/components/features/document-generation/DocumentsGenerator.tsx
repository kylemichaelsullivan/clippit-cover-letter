'use client';

import { memo } from 'react';

import { DocumentsStateManager } from '@/components/documents/display';
import { usePhaseStore } from '@/lib/stores';

export const DocumentsGenerator = memo(function DocumentsGenerator() {
	const { currentPhase } = usePhaseStore();

	if (currentPhase !== 'documents') {
		return null;
	}

	return (
		<div className='DocumentsGenerator'>
			<DocumentsStateManager />
		</div>
	);
});
