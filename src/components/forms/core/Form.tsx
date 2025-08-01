'use client';

import { memo } from 'react';
import type { FormEvent, ReactNode } from 'react';
import clsx from 'clsx';

import { CONSTANTS } from '@/config';

type FormProps = {
	componentName: string;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	children: ReactNode;
};

export const Form = memo(function Form({
	componentName,
	onSubmit,
	children,
}: FormProps) {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		onSubmit(e);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={clsx(
				componentName,
				CONSTANTS.CLASS_NAMES.FORM_CONTAINER,
				'flex flex-col gap-4',
			)}
		>
			{children}
		</form>
	);
});
