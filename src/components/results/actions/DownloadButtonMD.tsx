'use client';

import { Button } from '@/components/ui/buttons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { htmlToMarkdown, cleanMarkdown } from '@/lib/utils/htmlToMarkdown';
import { showToast } from '@/lib/toast';
import { useIsClient } from '@/lib/hooks';
import type { ButtonColor } from '@/types';

type DownloadButtonMDProps = {
	content: string;
	title: string;
	filename: string;
	disabled?: boolean;
	showIcon?: boolean;
	color?: ButtonColor;
	size?: 'sm' | 'flex';
	tabIndex?: number;
};

export function DownloadButtonMD({
	content,
	title,
	filename,
	disabled = false,
	showIcon = false,
	color = 'primary',
	size = 'sm',
	tabIndex,
}: DownloadButtonMDProps) {
	const isClient = useIsClient();
	const hasContent = content && content.trim() !== '';
	const isDisabled = !isClient || disabled || !hasContent;

	const handleDownloadMD = () => {
		if (isClient && hasContent) {
			try {
				// Convert HTML content to Markdown
				const markdownContent = cleanMarkdown(htmlToMarkdown(content));
				const blob = new Blob([markdownContent], { type: 'text/markdown' });
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `${filename}.md`;
				a.click();
				URL.revokeObjectURL(url);
				showToast.success('Markdown file downloaded');
			} catch {
				showToast.error('Failed to download Markdown file');
			}
		}
	};

	return (
		<Button
			color={color}
			size={size}
			onClick={handleDownloadMD}
			disabled={isDisabled}
			componentName='DownloadButtonMD'
			title={`Download ${title}`}
			aria-label={`${title} as Markdown file`}
			tabIndex={tabIndex}
		>
			{showIcon && <FontAwesomeIcon icon={faSave} aria-hidden='true' />}
			{title}
		</Button>
	);
}
