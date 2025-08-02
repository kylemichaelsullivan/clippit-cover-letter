'use client';

import { memo } from 'react';
import clsx from 'clsx';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'mustache';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'flex';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	color?: ButtonColor;
	size?: ButtonSize;
	componentName?: string;
	children: ReactNode;
	tabIndex?: number;
};

export const Button = memo(function Button({
	color = 'primary',
	size = 'md',
	componentName,
	children,
	...props
}: ButtonProps) {
	return (
		<button
			className={clsx(
				componentName || 'Button',
				'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
				{
					// Colors
					'bg-blue hover:bg-light-blue text-white': color === 'primary',
					'bg-light-gray hover:bg-gray border text-black hover:text-white':
						color === 'secondary',
					'bg-green text-white': color === 'success',
					'bg-red text-white': color === 'danger',
					'hover:bg-blue text-blue text-2xs bg-white font-mono hover:text-white':
						color === 'mustache',
					// Sizes
					'h-6 p-1 font-mono': size === 'xs',
					'h-8 px-3 text-sm': size === 'sm',
					'h-10 px-4 py-2': size === 'md',
					'h-12 px-6 text-lg': size === 'lg',
					'h-8 flex-1 px-3 text-sm': size === 'flex',
				},
			)}
			{...props}
		>
			{children}
		</button>
	);
});
