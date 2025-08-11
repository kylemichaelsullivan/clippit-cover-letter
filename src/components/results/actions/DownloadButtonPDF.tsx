'use client';

import { Button } from '@/components/ui/buttons';
import { useIsClient } from '@/lib/hooks';
import { showToast } from '@/lib/toast';
import { generatePageHeaderHTML, formatContentForPDF } from '@/lib/utils';
import { useSkillsStore } from '@/lib/stores';
import type { CandidateDetails } from '@/types';

type DownloadButtonPDFProps = {
	content: string;
	title: string;
	filename: string;
	candidateDetails: CandidateDetails;
	disabled?: boolean;
};

export function DownloadButtonPDF({
	content,
	title,
	filename,
	candidateDetails,
	disabled = false,
}: DownloadButtonPDFProps) {
	const isClient = useIsClient();
	const { includeSkillGroupNames, generatedSkillsData } = useSkillsStore();
	const hasContent = content && content.trim() !== '';
	const isDisabled = !isClient || disabled || !hasContent;

	const formatContentForPDFWithSkills = (content: string): string => {
		// Check if this is a resume and contains skills
		if (
			title.toLowerCase().includes('resume') &&
			generatedSkillsData.length > 0
		) {
			// Replace skills content based on includeSkillGroupNames setting
			if (!includeSkillGroupNames) {
				// Show all skills sorted alphabetically without group names
				const allSkills = generatedSkillsData
					.flatMap((group) => group.skills)
					.sort();

				// Replace grouped skills format with ungrouped format
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
					printWindow.document.documentElement.innerHTML = `
						<head>
							<title>${filename}</title>
							<style>
								@page {
									size: letter;
									margin: 1in;
								}
								body { 
									font-family: Arial, sans-serif; 
									line-height: 1.6; 
									margin: 0;
									font-size: 12pt;
									width: 8.5in;
									height: 11in;
									background-color: #f3f4f6;
									padding: 20px;
									box-sizing: border-box;
								}
								@media print {
									body { 
										margin: 0;
										size: letter;
										background-color: white;
										padding: 0;
									}
								}
								.print-content {
									white-space: pre-wrap;
								}
								.print-content h1 {
									font-size: 1.5rem;
									font-weight: bold;
									margin: 0.5rem 0 0;
									color: #1f2937;
								}
								.print-content h2 {
									font-size: 1.25rem;
									font-weight: bold;
									margin: 0.25rem 0 0;
									color: #1f2937;
								}
								.print-content h3 {
									font-size: 1.125rem;
									font-weight: bold;
									margin: 0.25rem 0 0;
									color: #374151;
								}
								.print-content strong {
									font-weight: bold;
								}
								.print-content em {
									font-style: italic;
								}
								.print-content ul {
									margin: 0;
									padding-left: 1rem;
								}
								.print-content li {
									margin: 0;
								}
								.page-header {
									text-align: center;
									margin-bottom: 2rem;
								}
								.page-header-name {
									font-size: 1.5rem;
									font-weight: bold;
									margin: 0 0 0.5rem 0;
								}
								.page-header-contact {
									font-size: 0.875rem;
									color: #64748b;
									margin: 0;
								}
							</style>
						</head>
						<body>
							<div style="background-color: white; width: 8.5in; height: 11in; margin: 0 auto;">
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
