'use client';

import { memo } from 'react';

export const DevelopmentStatusCard = memo(function DevelopmentStatusCard() {
	return (
		<div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
			<div className='flex flex-col gap-2'>
				<h3 className='font-medium text-yellow-800'>🚧 Development Status</h3>
				<p className='text-yellow-700'>
					<strong>Note:</strong> AI features are currently in development and
					not yet available. The application is fully functional for
					template-based document generation, but AI-powered enhancements will
					be added in future updates.
				</p>
			</div>
		</div>
	);
});
