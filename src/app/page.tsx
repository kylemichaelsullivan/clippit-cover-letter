'use client';

import { memo } from 'react';

import {
	CandidateForm,
	JobForm,
	LetterForm,
	ResumeForm,
	SkillsForm,
	WelcomeForm,
} from '@/components/forms';
import { ResultContent } from '@/components/results/display';
import {
	useAppStore,
	useCandidateStore,
	useJobStore,
	usePhaseStore,
	useSkillsStore,
	useTemplatesStore,
} from '@/lib/stores';
import type { CandidateDetails, Job, Skills } from '@/types';

import { PreviewContent } from '@/components/features/PreviewContent';

export default memo(function Page() {
	const { currentPhase } = usePhaseStore();
	const { setCandidateDetails } = useCandidateStore();
	const { setSkills } = useSkillsStore();
	const { setIncludeCoverLetter, setIncludeResume } = useAppStore();
	const { setJobDetails } = useJobStore();
	const { setCoverLetterTemplate } = useTemplatesStore();

	const handleCandidateSubmit = (details: CandidateDetails) => {
		setCandidateDetails(details);
	};

	const handleSkillsSubmit = (skillsData: Skills) => {
		setSkills(skillsData);
	};

	const handleResumeSubmit = (includeResume: boolean) => {
		setIncludeResume(includeResume);
	};

	const handleLetterSubmit = (
		includeCoverLetter: boolean,
		coverLetterTemplate: string
	) => {
		setIncludeCoverLetter(includeCoverLetter);
		setCoverLetterTemplate(coverLetterTemplate);
	};

	const handleJobSubmit = async (details: Job) => {
		setJobDetails(details);
	};

	const renderPhaseContent = () => {
		switch (currentPhase) {
			case 'welcome':
				return <WelcomeForm />;
			case 'candidate':
				return <CandidateForm onSubmit={handleCandidateSubmit} />;
			case 'skills':
				return <SkillsForm onSubmit={handleSkillsSubmit} />;
			case 'resume':
				return <ResumeForm onSubmit={handleResumeSubmit} />;
			case 'letter':
				return <LetterForm onSubmit={handleLetterSubmit} />;
			case 'job':
				return <JobForm onSubmit={handleJobSubmit} />;
			case 'preview':
				return <PreviewContent />;
			case 'results':
				return <ResultContent />;
			default:
				return <WelcomeForm />;
		}
	};

	return renderPhaseContent();
});
