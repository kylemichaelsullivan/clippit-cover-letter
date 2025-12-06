import { Button } from '@/components/ui/buttons';
import { CONSTANTS } from '@/config/constants';
import { faRefresh, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type EmptyStateVariant =
	| 'cover-letter-not-provided'
	| 'empty-education'
	| 'empty-experience'
	| 'empty-skills'
	| 'error'
	| 'loading'
	| 'missing-templates'
	| 'no-data'
	| 'no-documents-selected'
	| 'no-results'
	| 'no-skills-in-group'
	| 'resume-not-provided'
	| 'skills-not-configured';

type MissingTemplatesConfig = {
	includeSkills: boolean;
	includeCoverLetter: boolean;
	generatedSkills: string;
	coverLetter: string;
	onGenerate?: () => void;
};

type EmptyStateProps = {
	variant: EmptyStateVariant;
	missingTemplatesConfig?: MissingTemplatesConfig;
};

export function EmptyState({
	variant,
	missingTemplatesConfig,
}: EmptyStateProps) {
	const getContent = () => {
		switch (variant) {
			case 'cover-letter-not-provided':
				return {
					title: 'Cover Letter Template Missing',
					description: CONSTANTS.MESSAGES.COVER_LETTER_NOT_PROVIDED,
					className: 'EmptyState text-gray text-center',
				};
			case 'empty-education':
				return {
					title: 'No Education Configured',
					description:
						'Add your educational background to include in your resume.',
					className:
						'EmptyState text-gray py-4 text-center text-sm sm:py-6 sm:text-base',
				};
			case 'empty-experience':
				return {
					title: 'No Experience Configured',
					description: 'Add your work experience to include in your resume.',
					className:
						'EmptyState text-gray py-4 text-center text-sm sm:py-6 sm:text-base',
				};
			case 'empty-skills':
				return {
					title: 'No Skills Configured',
					description: CONSTANTS.MESSAGES.EMPTY_SKILLS,
					className:
						'EmptyState text-black py-4 text-center text-sm sm:py-6 sm:text-base',
				};
			case 'error':
				return {
					title: 'Generation Error',
					description: CONSTANTS.MESSAGES.ERROR_GENERATING,
					className:
						'EmptyState bg-light-gray border border-red rounded-lg p-8 text-center shadow-sm',
				};
			case 'loading':
				return {
					title: 'Generating Documents',
					description: CONSTANTS.MESSAGES.LOADING_DOCUMENTS,
					className:
						'EmptyState bg-light-gray rounded-lg p-8 text-center shadow-sm',
					isLoading: true,
				};
			case 'missing-templates':
				if (!missingTemplatesConfig) {
					throw new Error(
						'MissingTemplatesConfig is required for missing-templates variant'
					);
				}
				return {
					title: 'Documents are ready to be generated.',
					description: '',
					className:
						'EmptyState bg-light-gray flex flex-col gap-2 rounded-lg p-6 text-center shadow-sm',
					isMissingTemplates: true,
				};
			case 'no-data':
				return {
					title: 'No Data Available',
					description:
						'Please complete the previous steps to see a preview of your documents.',
					className: 'EmptyState py-8 text-center',
				};
			case 'no-documents-selected':
				return {
					title: 'No Documents Selected',
					description: 'Please select at least one document type to generate.',
					className: 'EmptyState py-8 text-center',
				};
			case 'no-results':
				return {
					title: 'No Document Types Checked',
					description:
						'Please select at least one checkbox (Skills, Cover Letter, Resume) to generate your documents.',
					className:
						'EmptyState bg-light-gray flex flex-col items-center gap-4 rounded-lg border border-black p-8 text-center shadow-sm',
				};
			case 'no-skills-in-group':
				return {
					title: 'No Skills',
					description: CONSTANTS.MESSAGES.NO_SKILLS_IN_GROUP,
					className: 'EmptyState text-black text-center text-sm',
				};
			case 'resume-not-provided':
				return {
					title: 'Resume Template Missing',
					description: CONSTANTS.MESSAGES.RESUME_NOT_PROVIDED,
					className: 'EmptyState text-gray text-center',
				};
			case 'skills-not-configured':
				return {
					title: 'Skills Not Generated',
					description: CONSTANTS.MESSAGES.SKILLS_NOT_GENERATED,
					className: 'EmptyState text-black text-center max-w-md self-center',
				};
			default:
				return {
					title: 'No Content Available',
					description: 'Please check your configuration and try again.',
					className: 'EmptyState py-8 text-center',
				};
		}
	};

	const content = getContent();

	if (content.isLoading) {
		return (
			<div className={content.className}>
				<div className='flex flex-col items-center gap-4'>
					<FontAwesomeIcon
						icon={faSpinner}
						className='animate-spin'
						aria-hidden='true'
					/>
					<div className='flex flex-col gap-2'>
						<h3 className='text-lg font-semibold text-black'>
							{content.title}
						</h3>
						<p className='text-gray text-sm'>{content.description}</p>
					</div>
				</div>
			</div>
		);
	}

	if (variant === 'missing-templates' && missingTemplatesConfig) {
		const {
			includeSkills,
			includeCoverLetter,
			generatedSkills,
			coverLetter,
			onGenerate,
		} = missingTemplatesConfig;
		const hasMissingTemplates =
			(includeSkills && !generatedSkills) ||
			(includeCoverLetter && !coverLetter);

		return (
			<div className={content.className}>
				<p className='text-gray'>{content.title}</p>

				<p
					className={
						includeSkills && !generatedSkills ? 'text-gray text-sm' : 'hidden'
					}
				>
					⚠️ {CONSTANTS.MESSAGES.MISSING_SKILLS}
				</p>

				<p
					className={
						includeCoverLetter && !coverLetter ? 'text-gray text-sm' : 'hidden'
					}
				>
					⚠️ {CONSTANTS.MESSAGES.MISSING_COVER_LETTER_TEMPLATE}
				</p>

				{onGenerate && (
					<Button
						onClick={onGenerate}
						disabled={hasMissingTemplates}
						className='flex items-center justify-center gap-2 px-4 py-2'
						title='Generate'
						componentName='EmptyStateGenerateButton'
					>
						Generate
						<FontAwesomeIcon icon={faRefresh} aria-hidden='true' />
					</Button>
				)}
			</div>
		);
	}

	return (
		<div className={content.className}>
			<div className='flex flex-col gap-2'>
				<h3 className='text-lg font-semibold text-black'>{content.title}</h3>
				<p className='text-gray'>{content.description}</p>
			</div>
		</div>
	);
}

export function NoDataMessage() {
	return <EmptyState variant='no-data' />;
}

export function NoDocumentsSelectedMessage() {
	return <EmptyState variant='no-documents-selected' />;
}

export function NoResultsMessage() {
	return <EmptyState variant='no-results' />;
}

export function MissingTemplatesMessage(props: MissingTemplatesConfig) {
	return (
		<EmptyState variant='missing-templates' missingTemplatesConfig={props} />
	);
}

export function EmptyEducationMessage() {
	return <EmptyState variant='empty-education' />;
}

export function EmptyExperienceMessage() {
	return <EmptyState variant='empty-experience' />;
}

export function EmptySkillsMessage() {
	return <EmptyState variant='empty-skills' />;
}

export function ErrorMessage() {
	return <EmptyState variant='error' />;
}

export function LoadingMessage() {
	return <EmptyState variant='loading' />;
}

export function NoSkillsInGroupMessage() {
	return <EmptyState variant='no-skills-in-group' />;
}

export function ResumeNotProvidedMessage() {
	return <EmptyState variant='resume-not-provided' />;
}

export function SkillsNotConfiguredMessage() {
	return <EmptyState variant='skills-not-configured' />;
}

export function CoverLetterNotProvidedMessage() {
	return <EmptyState variant='cover-letter-not-provided' />;
}
