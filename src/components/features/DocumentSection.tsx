'use client';

import type { ReactNode } from 'react';

import { DocumentContent } from '@/components/results/panels';
import { GenerateButton } from './GenerateButton';

type DocumentSectionProps = {
	title: string;
	componentName: string;
	content: string;
	generateTitle: string;
	fallbackMessage: ReactNode;
	isEditable: boolean;
	isGenerating: boolean;
	onGenerate: () => void;
	onContentChange?: (content: string) => void;
	headerElement?: ReactNode;
	disabled?: boolean;
};

export const DocumentSection = function DocumentSection({
	title,
	content,
	isEditable,
	onContentChange,
	isGenerating,
	onGenerate,
	componentName,
	generateTitle,
	fallbackMessage,
	disabled = false,
	headerElement,
}: DocumentSectionProps) {
	const hasContent = !!content && content.trim() !== '';

	return (
		<div className='flex flex-col gap-2'>
			{hasContent ? (
				<>
					<DocumentContent
						title={title}
						headerElement={headerElement}
						content={content}
						isEditable={isEditable}
						isGenerating={isGenerating}
						onContentChange={onContentChange}
					/>

					<GenerateButton
						componentName={componentName}
						title={generateTitle}
						isGenerating={isGenerating}
						onClick={onGenerate}
						disabled={disabled}
					/>
				</>
			) : (
				<div className='flex flex-col gap-4'>
					{fallbackMessage}
					<GenerateButton
						componentName={componentName}
						title={generateTitle}
						isGenerating={isGenerating}
						onClick={onGenerate}
						disabled={disabled}
					/>
				</div>
			)}
		</div>
	);
};
