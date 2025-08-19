import { useAppStore } from './useAppStore';
import { useCandidateStore } from './useCandidateStore';
import { useJobStore } from './useJobStore';
import { useResumeStore } from './useResumeStore';
import { useSkillsStore } from './useSkillsStore';
import { useTemplatesStore } from './useTemplatesStore';
import { DEFAULTS } from '@/config';

export function clearAllPersistentData() {
	try {
		// Clear localStorage keys for all persistent stores
		const storeKeys = [
			'app-store',
			'candidate-store',
			'job-store',
			'resume-store',
			'skills-store',
			'templates-store',
		];

		storeKeys.forEach((key) => {
			localStorage.removeItem(key);
		});

		// Reset all stores to initial state
		const appStore = useAppStore.getState();
		const candidateStore = useCandidateStore.getState();
		const jobStore = useJobStore.getState();
		const resumeStore = useResumeStore.getState();
		const skillsStore = useSkillsStore.getState();
		const templatesStore = useTemplatesStore.getState();

		// Reset app store
		appStore.setIncludeCoverLetter(DEFAULTS.FORM_DEFAULTS.INCLUDE_COVER_LETTER);
		appStore.setIncludeResume(DEFAULTS.FORM_DEFAULTS.INCLUDE_RESUME);
		appStore.setSkillsInstructions(
			DEFAULTS.INITIAL_STATES.DOCUMENT_INSTRUCTIONS.skillsInstructions,
		);
		appStore.setCoverLetterInstructions(
			DEFAULTS.INITIAL_STATES.DOCUMENT_INSTRUCTIONS.coverLetterInstructions,
		);
		appStore.setResumeInstructions(
			DEFAULTS.INITIAL_STATES.DOCUMENT_INSTRUCTIONS.resumeInstructions,
		);

		// Reset candidate store
		candidateStore.setCandidateDetails(
			DEFAULTS.INITIAL_STATES.CANDIDATE_DETAILS,
		);

		// Reset job store
		jobStore.setJobDetails(DEFAULTS.INITIAL_STATES.JOB_DETAILS);

		// Reset resume store
		resumeStore.clearResume();

		// Reset skills store
		skillsStore.setSkills({
			...DEFAULTS.INITIAL_STATES.SKILLS,
			groups: [
				{
					id: `group-${Date.now()}`,
					name: '',
					skills: [],
				},
			],
		});
		skillsStore.setIncludeSkills(DEFAULTS.FORM_DEFAULTS.INCLUDE_SKILLS);
		skillsStore.setIncludeSkillGroupNames(
			DEFAULTS.FORM_DEFAULTS.INCLUDE_SKILL_GROUP_NAMES,
		);
		skillsStore.setGeneratedSkills(
			DEFAULTS.INITIAL_STATES.GENERATION.generatedSkills,
		);

		// Reset templates store
		templatesStore.setCoverLetterTemplate(
			DEFAULTS.INITIAL_STATES.TEMPLATES.coverLetter,
		);
		templatesStore.setResumeTemplate(DEFAULTS.INITIAL_STATES.TEMPLATES.resume);
		templatesStore.setGeneratedCoverLetter(
			DEFAULTS.INITIAL_STATES.GENERATION.generatedCoverLetter,
		);
		templatesStore.setGeneratedResume(
			DEFAULTS.INITIAL_STATES.GENERATION.generatedResume,
		);

		console.log('All persistent data cleared successfully');
	} catch (error) {
		console.error('Error clearing persistent data:', error);
		throw error;
	}
}
