'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/buttons';
import { downloadPDF, generatePDF } from '@/lib/utils';
import { formatContentForPDFWithSkills } from '@/lib/utils';
import { showToast } from '@/lib/toast';
import { useIsClient } from '@/lib/hooks';
import { useSkillsStore } from '@/lib/stores';
import type { CandidateDetails } from '@/types';

type DownloadButtonPDFProps = {
	content: string;
	title: string;
	filename: string;
	candidateDetails: CandidateDetails;
	documentType?: string;
	fontSize?: number;
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
			try {
				const contentWithSkills = formatContentForPDFWithSkills(
					content,
					title,
					generatedSkillsData,
					includeSkillGroupNames,
				);
				const customFontSize = fontSize || 11;

				const displayDocumentType = documentType || 'PDF';
				const loadingToast = showToast.loading(
					`Generating ${displayDocumentType} PDF…`,
				);

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
			{isGenerating ? 'Generating…' : title}
		</Button>
	);
}
