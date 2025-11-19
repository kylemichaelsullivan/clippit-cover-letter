'use client';

import { memo } from 'react';

import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { ButtonHTMLAttributes } from 'react';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type MenuItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	icon: IconDefinition;
	label: string;
	variant?: 'default' | 'danger';
};

export const MenuItem = memo(function MenuItem({
	icon,
	label,
	variant = 'default',
	className,
	'aria-label': ariaLabel,
	...props
}: MenuItemProps) {
	const accessibleLabel = ariaLabel || label;
	return (
		<button
			type='button'
			className={clsx(
				'hover:bg-light-gray flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-left text-sm',
				variant === 'danger' ? 'text-red' : 'text-black',
				className,
			)}
			role='menuitem'
			title={accessibleLabel}
			aria-label={accessibleLabel}
			{...props}
		>
			<FontAwesomeIcon icon={icon} aria-hidden='true' />
			{label}
		</button>
	);
});
