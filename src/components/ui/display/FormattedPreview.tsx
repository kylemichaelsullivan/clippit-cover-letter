'use client';

import clsx from 'clsx';

import { CONSTANTS } from '@/config';
import { useSkillsStore } from '@/lib/stores';
import { extractTipTapContent } from '@/lib/utils/tiptap';
import {
	convertHtmlToMarkdown,
	renderMarkdownContent,
} from '@/lib/utils/markdownComponents';
import { renderHtmlContent } from '@/lib/utils/htmlRenderer';

type FormattedPreviewProps = {
	content: string;
	componentName?: string;
	className?: string;
	isGenerating?: boolean;
	isSkills?: boolean;
	title?: string;
};

export function FormattedPreview({
	content,
	componentName,
	className = '',
	isGenerating = false,
	isSkills = false,
	title = '',
}: FormattedPreviewProps) {
	const { generatedSkillsData, includeSkillGroupNames } = useSkillsStore();

	const renderSkillsContent = () => {
		if (isGenerating) {
			return <div className='text-light-gray'>Generating Skills...</div>;
		}

		if (!includeSkillGroupNames) {
			const allSkills = generatedSkillsData
				.flatMap((group) => group.skills)
				.sort();
			return (
				<div className='flex flex-col gap-4'>
					<div className='skills-group'>{allSkills.join(', ')}</div>
				</div>
			);
		}

		return (
			<div className='flex flex-col gap-4'>
				{generatedSkillsData.map((group, index) => (
					<div key={index} className='skills-group'>
						<strong>{group.name}:</strong> {group.skills.join(', ')}
					</div>
				))}
			</div>
		);
	};

	const renderContent = () => {
		if (isGenerating) {
			let generatingText = 'Generating...';

			if (isSkills) {
				generatingText = 'Generating Skills...';
			} else if (title.toLowerCase().includes('cover letter')) {
				generatingText = 'Generating Cover Letter...';
			} else if (title.toLowerCase().includes('resume')) {
				generatingText = 'Generating Resume...';
			}

			return <div className='text-light-gray'>{generatingText}</div>;
		}

		if (isSkills) {
			const extractedContent = extractTipTapContent(content);
			const markdownContent = convertHtmlToMarkdown(extractedContent);
			return renderMarkdownContent(markdownContent);
		} else {
			return renderHtmlContent(content);
		}
	};

	return (
		<div
			className={clsx(
				componentName || 'FormattedPreview',
				CONSTANTS.CLASS_NAMES.MARKDOWN_INPUT,
				'min-h-64 max-w-none overflow-y-auto bg-white p-4 text-sm leading-relaxed sm:min-h-96 sm:text-base',
				isGenerating && 'text-light-gray flex items-center justify-center',
				!isGenerating && 'whitespace-pre-wrap',
				className,
			)}
		>
			{isSkills ? renderSkillsContent() : renderContent()}
		</div>
	);
}
