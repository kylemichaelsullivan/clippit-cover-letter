'use client';

import { memo } from 'react';

import {
	CandidateForm,
	JobForm,
	SkillsForm,
	TemplatesForm,
} from '@/components/forms';
import { ResultContent } from '@/components/results/display';
import {
	usePhaseStore,
	useCandidateStore,
	useSkillsStore,
	useAppStore,
	useJobStore,
	useTemplatesStore,
} from '@/lib/stores';
import type { CandidateDetails, Skills, Job } from '@/types';

import { PreviewContent } from '@/components/features/PreviewContent';

export default memo(function Page() {
	const { currentPhase } = usePhaseStore();
	const { setCandidateDetails } = useCandidateStore();
	const { setSkills, includeSkills, setIncludeSkills } = useSkillsStore();
	const { setIncludeCoverLetter, setIncludeResume } = useAppStore();
	const { setJobDetails } = useJobStore();
	const { setCoverLetterTemplate, setResumeTemplate } = useTemplatesStore();

	const handleCandidateSubmit = (details: CandidateDetails) => {
		setCandidateDetails(details);
	};

	const handleSkillsSubmit = (skillsData: Skills) => {
		setSkills(skillsData);
	};

	const handleTemplatesSubmit = (
		includeCoverLetter: boolean,
		includeResume: boolean,
		coverLetterTemplate: string,
		resumeTemplate: string,
	) => {
		setIncludeCoverLetter(includeCoverLetter);
		setIncludeResume(includeResume);
		setCoverLetterTemplate(coverLetterTemplate);
		setResumeTemplate(resumeTemplate);
	};

	const handleJobSubmit = async (details: Job) => {
		setJobDetails(details);
	};

	const renderPhaseContent = () => {
		switch (currentPhase) {
			case 'candidate':
				return <CandidateForm onSubmit={handleCandidateSubmit} />;
			case 'skills':
				return (
					<SkillsForm
						onSubmit={handleSkillsSubmit}
						includeSkills={includeSkills}
						onIncludeSkillsChange={setIncludeSkills}
					/>
				);
			case 'templates':
				return <TemplatesForm onSubmit={handleTemplatesSubmit} />;
			case 'job':
				return <JobForm onSubmit={handleJobSubmit} />;
			case 'preview':
				return <PreviewContent />;
			case 'results':
				return <ResultContent />;
			default:
				return <CandidateForm onSubmit={handleCandidateSubmit} />;
		}
	};

	return renderPhaseContent();
});
