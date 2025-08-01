'use client';

import { memo } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';

type ErrorProps = {
	children: ReactNode;
	componentName?: string;
	className?: string;
};

export const Error = memo(function Error({
	children,
	componentName,
	className,
}: ErrorProps) {
	return (
		<p
			className={clsx(
				componentName || 'Error',
				'text-red text-xs sm:text-sm',
				className,
			)}
		>
			{children}
		</p>
	);
});
