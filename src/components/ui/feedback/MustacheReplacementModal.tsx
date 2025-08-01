'use client';

import { memo, useEffect, type MouseEvent } from 'react';

import { Button } from '@/components/ui/buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faXmark } from '@fortawesome/free-solid-svg-icons';
import { MUSTACHE_REPLACEMENTS, ERB_INSTRUCTIONS } from '@/config';
import { showToast } from '@/lib/toast';

type MustacheReplacementModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export const MustacheReplacementModal = memo(function MustacheReplacementModal({
	isOpen,
	onClose,
}: MustacheReplacementModalProps) {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	const handleBackdropClick = (event: MouseEvent) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	const handleCopyToClipboard = async (
		templateName: string,
		syntax: 'mustache' | 'erb',
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
		<div
			className='MustacheReplacementModal bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black px-4 backdrop-blur-sm'
			onClick={handleBackdropClick}
		>
			<div className='MustacheReplacementModalContent w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg'>
				<div className='MustacheReplacementModalHeader flex items-center justify-between pb-4'>
					<h3 className='MustacheReplacementModalTitle xs:text-lg text-md font-semibold text-black'>
						Template Variables
					</h3>
					<Button
						onClick={onClose}
						title='Close'
						componentName='MustacheReplacementModalCloseButton'
						color='danger'
						size='xs'
					>
						<FontAwesomeIcon
							icon={faXmark}
							className='h-4 w-4'
							aria-hidden='true'
						/>
					</Button>
				</div>

				<div className='TemplateVariables flex max-h-96 flex-col gap-6 overflow-y-auto'>
					{/* Mustache Variables Section */}
					<div className='MustacheVariables'>
						<h4 className='MustacheVariablesTitle text-gray mb-3 text-sm font-semibold tracking-wide uppercase'>
							Mustache Variables: &#123;&#123;variable&#125;&#125;
						</h4>

						<p className='MustacheReplacementModalInstructions text-gray flex gap-2 pb-4'>
							<FontAwesomeIcon
								icon={faCopy}
								className='xs:h-4 xs:w-4 h-3 w-3'
								aria-hidden='true'
							/>
							<span className='MustacheReplacementModalDescriptionText xs:text-sm text-xs italic'>
								Click a variable to copy it to the clipboard
							</span>
						</p>

						<div className='MustacheReplacementsGrid grid gap-3'>
							{MUSTACHE_REPLACEMENTS.map((replacement) => (
								<div
									className='MustacheReplacement border-light-gray bg-light-gray flex flex-col items-center justify-start gap-2 rounded-md border px-1 py-2 sm:flex-row sm:gap-4'
									key={replacement.name}
								>
									<Button
										onClick={() =>
											handleCopyToClipboard(replacement.name, 'mustache')
										}
										color='mustache'
										size='xs'
										title={`Copy {{${replacement.name}}} to Clipboard`}
										componentName='TemplateVariableButton'
									>
										{`{{${replacement.name}}}`}
									</Button>
									<span className='MustacheReplacementDescription text-gray xs:text-sm text-center text-xs sm:text-sm'>
										{replacement.description}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Inline Instructions Section */}
					<div className='InlineInstructions'>
						<h4 className='InlineInstructionsTitle text-gray mb-3 text-sm font-semibold tracking-wide uppercase'>
							Inline Instructions: &#60;%= instruction %&#62;
						</h4>
						<div className='InlineInstructionsGrid grid gap-3'>
							{ERB_INSTRUCTIONS.map((instruction) => (
								<div
									className='InlineInstruction border-light-gray bg-light-gray flex flex-col items-center justify-start gap-2 rounded-md border px-1 py-2 sm:flex-row sm:gap-4'
									key={instruction.name}
								>
									<span className='InlineInstructionSyntax text-blue bg-black px-1 py-0.5 font-mono text-sm font-bold'>
										{`<%= ${instruction.name} %>`}
									</span>
									<span className='InlineInstructionDescription text-gray xs:text-sm text-center text-xs sm:text-sm'>
										{instruction.description}
									</span>
								</div>
							))}
						</div>
					</div>

					<p className='MustacheReplacementModalPromptInstructions text-gray pb-4 text-xs'>
						<span>*Note: You can create custom placeholders like</span>
						<span className='text-blue font-mono'>
							{" <%= company's slogan in a clever way %> "}
						</span>
						<span>
							that will be processed by the AI Overlords and placed here.
						</span>
					</p>
				</div>
			</div>
		</div>
	);
});
