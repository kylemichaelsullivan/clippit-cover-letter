'use client';

import clsx from 'clsx';
import { type ReactNode, memo } from 'react';

type FormFieldContainerProps = {
	children: ReactNode;
	className?: string;
	suppressHydrationWarning?: boolean;
};

export const FormFieldContainer = memo(function FormFieldContainer({
	children,
	className,
	suppressHydrationWarning,
}: FormFieldContainerProps) {
	return (
		<div
			className={clsx('FormFieldContainer flex flex-col', className)}
			suppressHydrationWarning={suppressHydrationWarning}
		>
			{children}
		</div>
	);
});
