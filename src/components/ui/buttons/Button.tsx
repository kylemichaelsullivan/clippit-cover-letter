'use client';

import { memo } from 'react';
import clsx from 'clsx';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonColor } from '@/types';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'flex';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	color?: ButtonColor | 'mustache';
	size?: ButtonSize;
	componentName?: string;
	children: ReactNode;
	tabIndex?: number;
	positioned?: boolean;
};

export const Button = memo(function Button({
	color = 'primary',
	size = 'md',
	componentName,
	children,
	positioned = false,
	className,
	...props
}: ButtonProps) {
	return (
		<button
			className={clsx(
				componentName || 'Button',
				'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-10',
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
					'h-6 p-1 text-xs': size === 'xs',
					'h-8 px-3 text-sm': size === 'sm',
					'h-10 px-4 py-2': size === 'md',
					'h-12 px-6 text-lg': size === 'lg',
					'h-8 flex-1 px-3 text-sm': size === 'flex',
					// Positioning
					'absolute top-1 right-0 w-16 p-0': positioned,
				},
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
});
