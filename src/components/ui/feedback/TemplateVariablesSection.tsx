'use client';

import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TemplateVariableItem } from './TemplateVariableItem';

type TemplateVariable = {
	name: string;
	description: string;
};

type TemplateVariablesSectionProps = {
	title: string;
	variables: TemplateVariable[];
	syntax: 'mustache' | 'erb';
	className?: string;
	showInstructions?: boolean;
	onCopy?: (name: string, syntax: 'mustache' | 'erb') => void;
};

export const TemplateVariablesSection = function TemplateVariablesSection({
	title,
	variables,
	syntax,
	className = '',
	showInstructions = false,
	onCopy,
}: TemplateVariablesSectionProps) {
	return (
		<div className={className}>
			<h4 className='text-gray pb-3 text-sm font-semibold tracking-wide uppercase'>
				{title}
			</h4>

			{showInstructions && (
				<p className='text-gray flex gap-2 pb-4'>
					<FontAwesomeIcon icon={faCopy} aria-hidden='true' />
					<span className='xs:text-sm text-xs italic'>
						Click a variable to copy it to the clipboard
					</span>
				</p>
			)}

			<div className='grid gap-3'>
				{variables.map((variable) => (
					<TemplateVariableItem
						name={variable.name}
						syntax={syntax}
						description={variable.description}
						onCopy={onCopy}
						key={variable.name}
					/>
				))}
			</div>
		</div>
	);
};
