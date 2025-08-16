'use client';

import { memo, type ReactNode } from 'react';
import clsx from 'clsx';

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
