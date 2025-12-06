'use client';

import { memo } from 'react';

import { usePhaseStore } from '@/lib/stores';
import {
	DevelopmentStatusCard,
	FeaturesAvailableCard,
	FeaturesComingSoonCard,
	WelcomeDescription,
	WelcomeFooter,
	WelcomeHeader,
} from './index';

export const WelcomeForm = memo(function WelcomeForm() {
	const { currentPhase } = usePhaseStore();

	if (currentPhase !== 'welcome') {
		return null;
	}

	return (
		<div className='WelcomeForm flex flex-col gap-6'>
			<div className='flex flex-col gap-6'>
				<div className='bg-light-gray rounded-lg border border-black p-6 shadow-sm'>
					<WelcomeHeader />

					<div className='flex flex-col gap-4 text-black'>
						<WelcomeDescription />
						<DevelopmentStatusCard />
						<FeaturesAvailableCard />
						<FeaturesComingSoonCard />
						<WelcomeFooter />
					</div>
				</div>
			</div>
		</div>
	);
});
