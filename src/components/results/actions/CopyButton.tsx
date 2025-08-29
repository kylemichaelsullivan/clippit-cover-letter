'use client';

import { Button } from '@/components/ui/buttons';
import { cleanPlaintext, htmlToPlaintextWithSignature } from '@/lib/utils';
import { showToast } from '@/lib/toast';
import { useIsClient } from '@/lib/hooks';
import type { CandidateDetails } from '@/types';

type CopyButtonProps = {
	text: string;
	documentType?: string;
	candidateDetails?: CandidateDetails;
	disabled?: boolean;
};

export function CopyButton({
	text,
	documentType,
	candidateDetails,
	disabled = false,
}: CopyButtonProps) {
	const isClient = useIsClient();
	const hasContent = text && text.trim() !== '';
	const isDisabled = !isClient || disabled || !hasContent;

	const handleCopy = async () => {
		if (isClient && navigator.clipboard && hasContent) {
			try {
				const plaintextContent = cleanPlaintext(
					htmlToPlaintextWithSignature(text, candidateDetails),
				);
				await navigator.clipboard.writeText(plaintextContent);
				const message = documentType
					? `${documentType} Copied to Clipboard`
					: 'Copied to clipboard';
				showToast.success(message);
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
			disabled={isDisabled}
			aria-label='Copy'
			title='Copy'
			onClick={handleCopy}
		>
			Copy
		</Button>
	);
}
