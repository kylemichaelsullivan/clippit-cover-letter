'use client';

import { Button } from '@/components/ui/buttons';

type TemplateVariableItemProps = {
	name: string;
	description: string;
	syntax: 'mustache' | 'erb';
	onCopy?: (name: string, syntax: 'mustache' | 'erb') => void;
	className?: string;
};

export const TemplateVariableItem = function TemplateVariableItem({
	name,
	description,
	syntax,
	onCopy,
	className = '',
}: TemplateVariableItemProps) {
	const displayText = syntax === 'mustache' ? `{{${name}}}` : `<%= ${name} %>`;
	const isClickable = syntax === 'mustache' && onCopy;

	return (
		<div
			className={`border-light-gray bg-light-gray flex flex-col items-center justify-start gap-2 rounded-md border px-1 py-2 sm:flex-row sm:gap-4 ${className}`}
		>
			{isClickable ? (
				<Button
					componentName='TemplateVariableButton'
					color='mustache'
					size='xs'
					className='px-3'
					title={`Copy ${displayText} to Clipboard`}
					aria-label={`Copy ${displayText} to Clipboard`}
					onClick={() => onCopy(name, syntax)}
				>
					{displayText}
				</Button>
			) : (
				<span className='text-blue bg-black px-1 py-0.5 font-mono text-sm font-bold'>
					{displayText}
				</span>
			)}
			<span className='text-gray xs:text-sm text-center text-xs sm:text-sm'>
				{description}
			</span>
		</div>
	);
};
