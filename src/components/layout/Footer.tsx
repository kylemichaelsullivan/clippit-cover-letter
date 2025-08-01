'use client';

import { memo } from 'react';

import { CONSTANTS } from '@/config';
import { Copyright } from '@/components/utils/Copyright';
import { usePhaseStore } from '@/lib/stores';
import { BackButton, ForwardButton } from './';

export const Footer = memo(function Footer() {
	const { currentPhase, onPhaseChange } = usePhaseStore();
	const phases = CONSTANTS.PHASES;

	const getCurrentPhaseIndex = () => {
		return phases.findIndex((phase) => phase.id === currentPhase);
	};

	const handleBack = () => {
		const currentIndex = getCurrentPhaseIndex();
		if (currentIndex > 0) {
			const previousPhase = phases[currentIndex - 1];
			onPhaseChange(previousPhase.id);
		}
	};

	const handleForward = () => {
		const currentIndex = getCurrentPhaseIndex();
		if (currentIndex < phases.length - 1) {
			const nextPhase = phases[currentIndex + 1];
			onPhaseChange(nextPhase.id);
		}
	};

	const currentIndex = getCurrentPhaseIndex();
	const isFirstPhase = currentIndex === 0;
	const isLastPhase = currentIndex === phases.length - 1;

	const getPreviousPhaseName = () => {
		if (isFirstPhase) return 'Already at first phase';
		const previousPhase = phases[currentIndex - 1];
		return `Go to ${previousPhase.name}`;
	};

	const getNextPhaseName = () => {
		if (isLastPhase) return 'Already at last phase';
		const nextPhase = phases[currentIndex + 1];
		return `Go to ${nextPhase.name}`;
	};

	return (
		<footer className='Footer border-light-gray flex w-full items-center justify-between border-t bg-white px-4 py-4 sm:px-6 lg:px-8'>
			<BackButton
				onClick={handleBack}
				disabled={isFirstPhase}
				title={getPreviousPhaseName()}
			/>

			<Copyright />

			<ForwardButton
				onClick={handleForward}
				disabled={isLastPhase}
				title={getNextPhaseName()}
			/>
		</footer>
	);
});
