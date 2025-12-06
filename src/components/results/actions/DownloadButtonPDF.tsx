'use client';

import { Button } from '@/components/ui/buttons';
import { DEFAULTS } from '@/config';
import { useIsClient } from '@/lib/hooks';
import { useSkillsStore } from '@/lib/stores';
import { showToast } from '@/lib/toast';
import { downloadPDF, generatePDF } from '@/lib/utils';
import { formatContentForPDFWithSkills } from '@/lib/utils';
import type { CandidateDetails, DocumentType } from '@/types';
import { useState } from 'react';

type DownloadButtonPDFProps = {
	content: string;
	title: string;
	filename: string;
	candidateDetails: CandidateDetails;
	documentType?: DocumentType;
	fontSize?: string;
	disabled?: boolean;
};

export function DownloadButtonPDF({
	content,
	title,
	filename,
	documentType,
	candidateDetails,
	fontSize,
	disabled = false,
}: DownloadButtonPDFProps) {
	const isClient = useIsClient();
	const { includeSkillGroupNames, generatedSkillsData } = useSkillsStore();
	const [isGenerating, setIsGenerating] = useState(false);
	const hasContent = content && content.trim() !== '';
	const isDisabled = !isClient || disabled || !hasContent || isGenerating;

	const handleDownloadPDF = async () => {
		if (isClient && hasContent && !isGenerating) {
			setIsGenerating(true);
			const displayDocumentType = documentType || 'PDF';
			const loadingToast = showToast.loading(
				`Generating ${displayDocumentType} PDF…`
			);

			try {
				const contentWithSkills = formatContentForPDFWithSkills(
					content,
					title,
					generatedSkillsData,
					includeSkillGroupNames
				);
				const customFontSize = fontSize || '11pt';

				const pdfBlob = await generatePDF({
					content: contentWithSkills,
					filename,
					candidateDetails,
					fontSize: customFontSize,
				});

				showToast.dismiss(loadingToast);
				downloadPDF(pdfBlob, filename, documentType);
			} catch (error) {
				console.error('PDF generation error:', error);
				showToast.dismiss(loadingToast);
				showToast.error('Failed to generate PDF. Please try again.');
			} finally {
				setIsGenerating(false);
			}
		}
	};

	return (
		<Button
			componentName='DownloadButtonPDF'
			color='primary'
			size='flex'
			disabled={isDisabled}
			title={`Download ${title}`}
			aria-label={`Download ${title} as PDF`}
			onClick={handleDownloadPDF}
		>
			{isGenerating ? DEFAULTS.GENERATING_TEXT : title}
		</Button>
	);
}
