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
			className={clsx(
				componentName || 'FormFieldLabel',
				'text-base font-medium text-black',
				{
					'sm:py-3': !spaced,
					'py-3': spaced,
					'flex items-center justify-between': labelContent,
				},
			)}
			htmlFor={htmlFor}
			title={title}
			aria-label={ariaLabel}
		>
			<span>{children}</span>
			{labelContent}
		</label>
	);
});
