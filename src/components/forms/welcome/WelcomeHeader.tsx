'use client';

import { memo } from 'react';

import { TabTitle } from '@/components/ui';

export const WelcomeHeader = memo(function WelcomeHeader() {
	return (
		<>
			<TabTitle title='Welcome to Clippit' componentName='WelcomeFormTitle' />
			<h2 className='text-xl font-semibold text-black'>
				AI-Powered Cover Letter & Resume Generation
			</h2>
		</>
	);
});
