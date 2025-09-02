'use client';

import { memo } from 'react';

export const FeaturesAvailableCard = memo(function FeaturesAvailableCard() {
	return (
		<div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
			<div className='flex flex-col gap-2'>
				<h3 className='font-medium text-blue-800'>
					✨ What&apos;s Available Now
				</h3>
				<ul className='space-y-1 text-blue-700'>
					<li>
						• Template-based document generation with
						&#123;&#123;mustache&#125;&#125; placeholders
					</li>
					<li>• Professional cover letter and resume templates</li>
					<li>• Skills organization and management</li>
					<li>• Export to PDF, Markdown and TXT</li>
					<li>• Modern, responsive interface</li>
				</ul>
			</div>
		</div>
	);
});
