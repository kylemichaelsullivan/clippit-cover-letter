'use client';

import { Button } from '@/components/ui/buttons';
import { useIsClient } from '@/lib/hooks';
import { showToast } from '@/lib/toast';

type CopyButtonProps = {
	text: string;
	disabled?: boolean;
};

export function CopyButton({ text, disabled = false }: CopyButtonProps) {
	const isClient = useIsClient();
	const hasContent = text && text.trim() !== '';
	const isDisabled = !isClient || disabled || !hasContent;

	const handleCopy = async () => {
		if (isClient && navigator.clipboard && hasContent) {
			try {
				await navigator.clipboard.writeText(text);
				showToast.success('Copied to clipboard');
			} catch {
				showToast.error('Failed to copy to clipboard');
			}
		}
	};

	return (
		<Button
			componentName='CopyButton'
			color='primary'
			size='flex'
			title='Copy'
			onClick={handleCopy}
			disabled={isDisabled}
		>
			Copy
		</Button>
	);
}
