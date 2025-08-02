'use client';

import type { ReactNode } from 'react';

import { DocumentContent } from '@/components/results/panels';
import { GenerateButton } from './GenerateButton';

type DocumentSectionProps = {
	title: string;
	content: string;
	isEditable: boolean;
	onContentChange?: (content: string) => void;
	isGenerating: boolean;
	onGenerate: () => void;
	componentName: string;
	generateTitle: string;
	fallbackMessage: ReactNode;
	hasContent: boolean;
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
	hasContent,
}: DocumentSectionProps) {
	return (
		<div className='flex flex-col gap-2'>
			{hasContent ? (
				<>
					<DocumentContent
						title={title}
						content={content}
						isEditable={isEditable}
						onContentChange={onContentChange}
						isGenerating={isGenerating}
					/>

					<GenerateButton
						isGenerating={isGenerating}
						onClick={onGenerate}
						componentName={componentName}
						title={generateTitle}
					/>
				</>
			) : (
				<div className='flex flex-col gap-4'>
					{fallbackMessage}
					<GenerateButton
						isGenerating={isGenerating}
						onClick={onGenerate}
						componentName={componentName}
						title={generateTitle}
					/>
				</div>
			)}
		</div>
	);
};
