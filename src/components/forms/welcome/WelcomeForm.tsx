'use client';

import { memo } from 'react';

import { TabTitle } from '@/components/ui';
import { usePhaseStore } from '@/lib/stores';

export const WelcomeForm = memo(function WelcomeForm() {
	const { currentPhase } = usePhaseStore();

	if (currentPhase !== 'welcome') {
		return null;
	}

	return (
		<div className='WelcomeForm flex flex-col gap-6'>
			<TabTitle title='Welcome to Clippit' componentName='WelcomeFormTitle' />

			<div className='flex flex-col gap-6'>
				<div className='bg-light-gray rounded-lg border border-black p-6 shadow-sm'>
					<h2 className='text-xl font-semibold text-black'>
						AI-Powered Cover Letter & Resume Generation
					</h2>

					<div className='flex flex-col gap-4 text-black'>
						<p>
							Clippit helps you create personalized cover letters and resumes
							using advanced AI technology. Our platform analyzes job
							requirements and your experience to generate tailored documents
							that stand out to employers.
						</p>

						<div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
							<div className='flex flex-col gap-2'>
								<h3 className='font-medium text-yellow-800'>
									🚧 Development Status
								</h3>
								<p className='text-yellow-700'>
									<strong>Note:</strong> AI features are currently in
									development and not yet available. The application is fully
									functional for template-based document generation, but
									AI-powered enhancements will be added in future updates.
								</p>
							</div>
						</div>

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
									<li>• Professional resume and cover letter templates</li>
									<li>• Skills organization and management</li>
									<li>• PDF export functionality</li>
									<li>• Modern, responsive interface</li>
								</ul>
							</div>
						</div>

						<div className='rounded-lg border border-green-200 bg-green-50 p-4'>
							<div className='flex flex-col gap-2'>
								<h3 className='font-medium text-green-800'>🔮 Coming Soon</h3>
								<ul className='space-y-1 text-green-700'>
									<li>• Job fit estimate</li>
									<li>• Intelligent skill selection</li>
									<li>• Cover letter generation</li>
									<li>• Resume tailoring</li>
								</ul>
							</div>
						</div>

						<p className='text-gray text-sm'>
							Ready to get started? Click &quot;Next&quot; to begin entering
							your information.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
});
