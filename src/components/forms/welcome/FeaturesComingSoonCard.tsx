'use client';

import { memo } from 'react';

export const FeaturesComingSoonCard = memo(function FeaturesComingSoonCard() {
	return (
		<div className='rounded-lg border border-green-200 bg-green-50 p-4'>
			<div className='flex flex-col gap-2'>
				<h3 className='font-medium text-green-800'>🔮 Coming Soon</h3>
				<ul className='space-y-1 text-green-700'>
					<li>• Job fit score estimate</li>
					<li>• Intelligent skill selection</li>
					<li>• Cover letter generation</li>
					<li>• Resume tailoring</li>
				</ul>
			</div>
		</div>
	);
});
