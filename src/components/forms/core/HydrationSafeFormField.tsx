'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { FormField, type FormFieldProps } from './FormField';

type HydrationSafeFormFieldProps = FormFieldProps & {
	fallback?: ReactNode;
};

export function HydrationSafeFormField({
	fallback,
	...props
}: HydrationSafeFormFieldProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return fallback ? <>{fallback}</> : null;
	}

	return <FormField {...props} />;
}
