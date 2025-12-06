'use client';

import { memo, useEffect } from 'react';

import { ERB_INSTRUCTIONS, MUSTACHE_REPLACEMENTS } from '@/config';
import { useModalClose } from '@/lib/hooks/useModalClose';
import { showToast } from '@/lib/toast';
import { CustomPlaceholderNote } from './CustomPlaceholderNote';
import { ModalBackdrop } from './ModalBackdrop';
import { ModalHeader } from './ModalHeader';
import { TemplateVariablesSection } from './TemplateVariablesSection';

type MustacheReplacementModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export const MustacheReplacementModal = memo(function MustacheReplacementModal({
	isOpen,
	onClose,
}: MustacheReplacementModalProps) {
	const modalRef = useModalClose({ onClose, isOpen });

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	const handleCopyToClipboard = async (
		templateName: string,
		syntax: 'mustache' | 'erb'
	) => {
		const templateText =
			syntax === 'mustache' ? `{{${templateName}}}` : `<%=${templateName}%>`;
		try {
			await navigator.clipboard.writeText(templateText);
			showToast.success(`${templateText} copied to clipboard`);
		} catch (error) {
			console.error('Failed to copy to clipboard:', error);
			showToast.error('Failed to copy to clipboard');
		}
	};

	if (!isOpen) return null;

	return (
		<ModalBackdrop ref={modalRef} className='MustacheReplacementModal'>
			<ModalHeader title='Template Variables' onClose={onClose} />

			<div className='flex max-h-96 flex-col gap-6 overflow-y-auto'>
				<TemplateVariablesSection
					title='Mustache Variables: &#123;&#123;variable&#125;&#125;'
					variables={MUSTACHE_REPLACEMENTS}
					syntax='mustache'
					onCopy={handleCopyToClipboard}
					showInstructions={true}
				/>

				<TemplateVariablesSection
					title='Inline Instructions: &#60;%= instruction %&#62;'
					variables={ERB_INSTRUCTIONS}
					syntax='erb'
				/>

				<CustomPlaceholderNote />
			</div>
		</ModalBackdrop>
	);
});
