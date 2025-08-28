'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/buttons';
import { generatePDF, downloadPDF } from '@/lib/utils/pdfGenerator';
import { showToast } from '@/lib/toast';
import { useIsClient } from '@/lib/hooks';
import { useSkillsStore } from '@/lib/stores';
import type { CandidateDetails } from '@/types';

type DownloadButtonPDFProps = {
	content: string;
	title: string;
	filename: string;
	candidateDetails: CandidateDetails;
	disabled?: boolean;
	fontSize?: number;
};

export function DownloadButtonPDF({
	content,
	title,
	filename,
	candidateDetails,
	disabled = false,
	fontSize,
}: DownloadButtonPDFProps) {
	const isClient = useIsClient();
	const { includeSkillGroupNames, generatedSkillsData } = useSkillsStore();
	const [isGenerating, setIsGenerating] = useState(false);
	const hasContent = content && content.trim() !== '';
	const isDisabled = !isClient || disabled || !hasContent || isGenerating;

	const formatContentForPDFWithSkills = (content: string): string => {
		if (
			title.toLowerCase().includes('resume') &&
			generatedSkillsData.length > 0
		) {
			if (!includeSkillGroupNames) {
				const allSkills = generatedSkillsData
					.flatMap((group) => group.skills)
					.sort();

				// This handles both the original markdown and the HTML that might be in the content
				return content
					.replace(
						/\*\*([^:]+):\*\* ([^<]+)/g,
						'**Skills:** ' + allSkills.join(', '),
					)
					.replace(
						/<ul>[\s\S]*?<li><strong>([^<]+):<\/strong> ([^<]+)<\/li>[\s\S]*?<\/ul>/g,
						'<p><strong>Skills:</strong> ' + allSkills.join(', ') + '</p>',
					)
					.replace(
						/<strong>([^<]+):<\/strong> ([^<]+)/g,
						'<strong>Skills:</strong> ' + allSkills.join(', '),
					);
			}
		}
		return content;
	};

	const handleDownloadPDF = async () => {
		if (isClient && hasContent && !isGenerating) {
			setIsGenerating(true);
			try {
				const contentWithSkills = formatContentForPDFWithSkills(content);
				const customFontSize = fontSize || 11;

				const loadingToast = showToast.loading('Generating PDF...');

				const pdfBlob = await generatePDF({
					content: contentWithSkills,
					filename,
					candidateDetails,
					fontSize: customFontSize,
				});

				showToast.dismiss(loadingToast);
				downloadPDF(pdfBlob, filename);
				showToast.success('PDF downloaded successfully');
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
			color='primary'
			size='flex'
			onClick={handleDownloadPDF}
			disabled={isDisabled}
			componentName='DownloadButtonPDF'
			title={`Download ${title}`}
			aria-label={`Download ${title} as PDF`}
		>
			{isGenerating ? 'Generating...' : title}
		</Button>
	);
}
