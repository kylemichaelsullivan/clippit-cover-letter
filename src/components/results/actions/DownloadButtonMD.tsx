'use client';

import { Button } from '@/components/ui/buttons';
import { downloadMD } from '@/lib/utils';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIsClient } from '@/lib/hooks';
import type { ButtonColor } from '@/types';

type DownloadButtonMDProps = {
	content: string;
	title: string;
	filename: string;
	documentType?: string;
	color?: ButtonColor;
	size?: 'sm' | 'flex';
	showIcon?: boolean;
	disabled?: boolean;
	tabIndex?: number;
};

export function DownloadButtonMD({
	content,
	title,
	filename,
	documentType,
	color = 'primary',
	size = 'sm',
	showIcon = false,
	disabled = false,
	tabIndex,
}: DownloadButtonMDProps) {
	const isClient = useIsClient();
	const hasContent = content && content.trim() !== '';
	const isDisabled = !isClient || disabled || !hasContent;

	const handleDownloadMD = () => {
		if (isClient && hasContent) {
			downloadMD(content, filename, documentType);
		}
	};

	return (
		<Button
			componentName='DownloadButtonMD'
			color={color}
			size={size}
			disabled={isDisabled}
			title={`Download ${title}`}
			aria-label={`${title} as Markdown file`}
			tabIndex={tabIndex}
			onClick={handleDownloadMD}
		>
			{showIcon && <FontAwesomeIcon icon={faSave} aria-hidden='true' />}
			{title}
		</Button>
	);
}
