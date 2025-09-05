'use client';

import { memo } from 'react';
import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonColor } from '@/types';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'flex' | 'tiptap' | 'sort';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	componentName?: string;
	color?: ButtonColor | 'mustache';
	size?: ButtonSize;
	positioned?: boolean;
	tabIndex?: number;
};

export const Button = memo(function Button({
	children,
	componentName,
	color = 'primary',
	size = 'md',
	className,
	positioned = false,
	...props
}: ButtonProps) {
	const baseStyles =
		'flex cursor-pointer items-center justify-center gap-2 rounded-lg border font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-35';

	const colorStyles = {
		'bg-blue border-blue text-white hover:bg-light-blue hover:border-light-blue':
			color === 'primary',
		'bg-light-gray border-light-gray text-black hover:bg-gray hover:border-gray hover:text-white':
			color === 'secondary',
		'bg-green border-green text-white hover:bg-gray': color === 'success',
		'bg-red border-red text-white hover:bg-gray': color === 'danger',
		'bg-white border-white text-blue text-2xs font-mono hover:bg-blue hover:border-blue hover:text-white':
			color === 'mustache',
		'shadow hover:bg-black hover:text-white': size === 'tiptap',
	};

	const sizeStyles = {
		'h-6 p-1 text-xs': size === 'xs',
		'h-8 px-3 text-sm': size === 'sm',
		'h-10 px-4 py-2': size === 'md',
		'h-12 px-6 text-lg': size === 'lg',
		'h-8 flex-1 px-3 text-sm': size === 'flex',
		'h-8 min-w-8 px-4 text-sm': size === 'sort',
		'h-8 w-10 p-0': size === 'tiptap',
	};

	const positioningStyles = {
		relative: size === 'tiptap',
		'absolute top-1 right-0 w-16 p-0': positioned,
	};

	const buttonClassName = clsx(
		componentName || 'Button',
		baseStyles,
		colorStyles,
		sizeStyles,
		positioningStyles,
		className,
	);

	return (
		<button type='button' className={buttonClassName} {...props}>
			{children}
		</button>
	);
});
