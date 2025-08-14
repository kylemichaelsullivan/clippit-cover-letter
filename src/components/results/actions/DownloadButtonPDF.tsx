'use client';

import { Button } from '@/components/ui/buttons';
import { useIsClient } from '@/lib/hooks';
import { showToast } from '@/lib/toast';
import { generatePageHeaderHTML, formatContentForPDF } from '@/lib/utils';
import { useSkillsStore } from '@/lib/stores';
import { PDF_STYLES } from '@/config';
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
	const hasContent = content && content.trim() !== '';
	const isDisabled = !isClient || disabled || !hasContent;

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
				return (
					content
						// Replace grouped skills in markdown format
						.replace(
							/\*\*([^:]+):\*\* ([^<]+)/g,
							'**Skills:** ' + allSkills.join(', '),
						)
						// Replace grouped skills in HTML format
						.replace(
							/<strong>([^<]+):<\/strong> ([^<]+)/g,
							'<strong>Skills:</strong> ' + allSkills.join(', '),
						)
				);
			}
		}
		return content;
	};

	const handleDownloadPDF = () => {
		if (isClient && hasContent) {
			try {
				const printWindow = window.open('', '_blank');
				if (printWindow) {
					const pageHeader = generatePageHeaderHTML(candidateDetails);
					const contentWithSkills = formatContentForPDFWithSkills(content);
					const formattedContent = formatContentForPDF(contentWithSkills);
					const customFontSize = fontSize || 11;
					const pdfStyles = PDF_STYLES.replace(
						'font-size: 11pt;',
						`font-size: ${customFontSize}pt;`,
					);

					printWindow.document.documentElement.innerHTML = `
						<head>
							<title>${filename}</title>
							<style>
								${pdfStyles}
							</style>
						</head>
						<body>
							<div style="background-color: white; width: 8.5in; min-height: 11in; margin: 0 auto;">
								${pageHeader}
								<div class="print-content">${formattedContent}</div>
							</div>
						</body>
					`;
					printWindow.print();
					showToast.success('PDF download initiated');
				} else {
					showToast.error('Failed to open print window');
				}
			} catch {
				showToast.error('Failed to download PDF');
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
			{title}
		</Button>
	);
}
