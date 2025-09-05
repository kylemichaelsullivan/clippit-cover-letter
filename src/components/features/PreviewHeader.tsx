'use client';

import { memo } from 'react';

import { DocumentSelectionControls } from '@/components/results/display';
import { TabTitle } from '@/components/ui';

export const PreviewHeader = memo(function PreviewHeader() {
	return (
		<div className='flex items-center justify-between'>
			<TabTitle componentName='PreviewContentTitle' title='Preview' />
			<DocumentSelectionControls />
		</div>
	);
});
