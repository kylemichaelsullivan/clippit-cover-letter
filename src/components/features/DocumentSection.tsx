'use client';

import type { ReactNode } from 'react';

import { DocumentContent } from '@/components/results/panels';
import { GenerateButton } from './GenerateButton';
import type { DocumentType } from '@/types';

type DocumentSectionProps = {
	title: string;
	componentName: string;
	content: string;
	generateTitle: string;
	fallbackMessage: ReactNode;
	isEditable: boolean;
	isGenerating: boolean;
	documentType?: DocumentType;
	headerElement?: ReactNode;
	templateContent?: string; // Raw template content with placeholders for editing
	disabled?: boolean;
	onGenerate: () => void;
	onContentChange?: (content: string) => void;
};

export const DocumentSection = function DocumentSection({
	title,
	componentName,
	content,
	generateTitle,
	fallbackMessage,
	isEditable,
	isGenerating,
	documentType,
	headerElement,
	templateContent,
	disabled = false,
	onGenerate,
	onContentChange,
}: DocumentSectionProps) {
	const hasContent = !!content && content.trim() !== '';

	return (
		<div className='flex flex-col gap-2'>
			{hasContent ? (
				<>
					<DocumentContent
						title={title}
						documentType={documentType}
						headerElement={headerElement}
						content={content}
						templateContent={templateContent}
						isEditable={isEditable}
						isGenerating={isGenerating}
						onContentChange={onContentChange}
					/>

					<GenerateButton
						componentName={componentName}
						title={generateTitle}
						isGenerating={isGenerating}
						disabled={disabled}
						onClick={onGenerate}
					/>
				</>
			) : (
				<div className='flex flex-col gap-4'>
					{fallbackMessage}
					<GenerateButton
						componentName={componentName}
						title={generateTitle}
						isGenerating={isGenerating}
						disabled={disabled}
						onClick={onGenerate}
					/>
				</div>
			)}
		</div>
	);
};
