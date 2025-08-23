import { memo, type ReactNode } from 'react';
import clsx from 'clsx';

type FormFieldLabelProps = {
	children: ReactNode;
	htmlFor?: string;
	title?: string;
	'aria-label'?: string;
	componentName?: string;
	spaced?: boolean;
	labelContent?: ReactNode;
};

export const FormFieldLabel = memo(function FormFieldLabel({
	htmlFor,
	title,
	'aria-label': ariaLabel,
	children,
	componentName,
	spaced = false,
	labelContent,
}: FormFieldLabelProps) {
	return (
		<label
			htmlFor={htmlFor}
			className={clsx(
				componentName || 'FormFieldLabel',
				'text-base font-medium text-black',
				{
					'pb-1': !spaced,
					'py-3': spaced,
					'flex items-center justify-between': labelContent,
				},
			)}
			title={title}
			aria-label={ariaLabel}
		>
			<span>{children}</span>
			{labelContent}
		</label>
	);
});
