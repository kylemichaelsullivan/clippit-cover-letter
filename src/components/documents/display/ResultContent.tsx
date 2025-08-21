'use client';

import { memo } from 'react';

import { ResultsStateManager } from '@/components/results/display';
import { TabTitle } from '@/components/ui';

export const ResultContent = memo(function ResultContent() {
	return (
		<div className='ResultContent flex flex-col gap-6 overflow-y-auto'>
			<TabTitle title='Results' componentName='ResultsContentTitle' />
			<ResultsStateManager />
		</div>
	);
});
