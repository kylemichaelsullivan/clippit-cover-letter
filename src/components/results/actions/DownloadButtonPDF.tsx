'use client';

import { Button } from '@/components/ui/buttons';
import { useIsClient } from '@/lib/hooks';
import { showToast } from '@/lib/toast';

type DownloadButtonPDFProps = {
	content: string;
	title: string;
	filename: string;
	disabled?: boolean;
};

export function DownloadButtonPDF({
	content,
	title,
	filename,
	disabled = false,
}: DownloadButtonPDFProps) {
	const isClient = useIsClient();
	const hasContent = content && content.trim() !== '';
	const isDisabled = !isClient || disabled || !hasContent;

	const handleDownloadPDF = () => {
		if (isClient && hasContent) {
			try {
				const printWindow = window.open('', '_blank');
				if (printWindow) {
					printWindow.document.documentElement.innerHTML = `
						<head>
							<title>${filename}</title>
							<style>
								body { 
									font-family: Arial, sans-serif; 
									line-height: 1.6; 
									margin: 2cm;
									font-size: 12pt;
								}
								@media print {
									body { margin: 0; }
								}
								.print-content {
									white-space: pre-wrap;
								}
							</style>
						</head>
						<body>
							<div class="print-content">${content}</div>
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
