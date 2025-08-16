'use client';

import { useEffect, useState, type ReactNode } from 'react';
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
