'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/buttons';
import { useIsClient } from '@/lib/hooks';
import { showToast } from '@/lib/toast';

type DownloadButtonMDProps = {
	content: string;
	title: string;
	filename: string;
	disabled?: boolean;
	showIcon?: boolean;
	color?: 'primary' | 'secondary' | 'success' | 'danger';
	size?: 'sm' | 'flex';
};

export function DownloadButtonMD({
	content,
	title,
	filename,
	disabled = false,
	showIcon = false,
	color = 'primary',
	size = 'sm',
}: DownloadButtonMDProps) {
	const isClient = useIsClient();
	const hasContent = content && content.trim() !== '';
	const isDisabled = !isClient || disabled || !hasContent;

	const handleDownloadMD = () => {
		if (isClient && hasContent) {
			try {
				const blob = new Blob([content], { type: 'text/markdown' });
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
		>
			{showIcon && (
				<FontAwesomeIcon icon={faSave} className='h-4 w-4' aria-hidden='true' />
			)}
			{title}
		</Button>
	);
}
