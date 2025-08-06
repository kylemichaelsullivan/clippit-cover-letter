'use client';

import clsx from 'clsx';

import { CONSTANTS } from '@/config';
import { useSkillsStore } from '@/lib/stores';

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

	const formatContent = (markdown: string): string => {
		if (isSkills) {
			return markdown;
		}

		return (
			markdown
				.replace(/<strong>(.*?)<\/strong>/g, '$1')
				.replace(/<b>(.*?)<\/b>/g, '$1')
				.replace(/<em>(.*?)<\/em>/g, '$1')
				.replace(/<i>(.*?)<\/i>/g, '$1')
				.replace(/<br\s*\/?>/g, '\n')
				.replace(/<p>(.*?)<\/p>/g, '$1\n\n')
				.replace(/<h[1-6]>(.*?)<\/h[1-6]>/g, '$1\n\n')
				.replace(/<ul>(.*?)<\/ul>/g, (match, content) => {
					return content.replace(/<li>(.*?)<\/li>/g, '• $1\n');
				})
				.replace(/<ol>(.*?)<\/ol>/g, (match, content) => {
					let counter = 1;
					return content.replace(
						/<li>(.*?)<\/li>/g,
						() => `${counter++}. $1\n`,
					);
				})
				// Remove markdown headers but keep the text
				.replace(/^#{1,6}\s+/gm, '')
				// Convert bold text to plain text
				.replace(/\*\*(.*?)\*\*/g, '$1')
				.replace(/__(.*?)__/g, '$1')
				// Convert italic text to plain text
				.replace(/\*(.*?)\*/g, '$1')
				.replace(/_(.*?)_/g, '$1')
				// Convert inline code to plain text
				.replace(/`(.*?)`/g, '$1')
				// Convert code blocks to plain text with proper spacing
				.replace(/```[\s\S]*?```/g, (match) => {
					const content = match
						.replace(/```[\s\S]*?\n/, '')
						.replace(/```$/, '');
					return `\n${content}\n`;
				})
				// Convert blockquotes to plain text with proper spacing
				.replace(/^>\s+/gm, '')
				// Convert lists to plain text with proper spacing
				.replace(/^[\s]*[-*+]\s+/gm, '• ')
				.replace(/^[\s]*\d+\.\s+/gm, (match) => {
					const number = match.match(/\d+/)?.[0] || '1';
					return `${number}. `;
				})
				// Convert links to plain text
				.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
				// Remove horizontal rules
				.replace(/^---$/gm, '')
				// Clean up excessive whitespace
				.replace(/\n\s*\n\s*\n/g, '\n\n')
				.trim()
		);
	};

	const renderSkillsContent = () => {
		if (isGenerating) {
			return <div className='text-light-gray'>Generating Skills...</div>;
		}

		if (!includeSkillGroupNames) {
			// Show all skills sorted alphabetically without group names
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

		const formattedContent = formatContent(content);
		return formattedContent;
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
