'use client';

import { memo, type ReactNode } from 'react';
import clsx from 'clsx';

type FormFieldContainerProps = {
	children: ReactNode;
	className?: string;
};

export const FormFieldContainer = memo(function FormFieldContainer({
	children,
	className,
}: FormFieldContainerProps) {
	return (
		<div className={clsx('FormFieldContainer flex flex-col', className)}>
			{children}
		</div>
	);
});
