'use client';

import { memo } from 'react';

import { ResultsStateManager } from '@/components/results/display';
import { usePhaseStore } from '@/lib/stores';

export const ResultsGenerator = memo(function ResultsGenerator() {
	const { currentPhase } = usePhaseStore();

	if (currentPhase !== 'results') {
		return null;
	}

	return (
		<div className='ResultsGenerator'>
			<ResultsStateManager />
		</div>
	);
});
