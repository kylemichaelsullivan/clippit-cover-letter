'use client';

import { Button } from '@/components/ui/buttons';
import { generatePageHeaderHTML, formatContentForPDF } from '@/lib/utils';
import { generatePageFooterHTML } from '@/lib/utils/pageHeader';
import { PDF_STYLES } from '@/config';
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
		if (isClient && hasContent) {
			try {
				const printWindow = window.open('', '_blank');
				if (printWindow) {
					const isCoverLetter = !title.toLowerCase().includes('resume');
					const pageHeader = await generatePageHeaderHTML(candidateDetails);
					const pageFooter = await generatePageFooterHTML(
						candidateDetails,
						isCoverLetter,
					);
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
							<div style="position: relative; background-color: white; width: 8.5in; min-height: 11in; margin: 0 auto;">
								${pageHeader}
								<div class="print-content print-document-content">
									${formattedContent}
								</div>
								${pageFooter}
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
