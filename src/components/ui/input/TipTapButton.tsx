'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

type TipTapButtonProps = {
	onClick: () => void;
	icon: IconDefinition;
	label: string;
	title?: string;
	number?: number;
	iconClassName?: string;
	showShadow?: boolean;
};

export function TipTapButton({
	onClick,
	icon,
	label,
	title,
	number,
	iconClassName,
	showShadow,
}: TipTapButtonProps) {
	return (
		<button
			type='button'
			className='hover:bg-light-gray relative flex h-8 w-8 items-center justify-center rounded text-sm text-black transition-colors'
			onClick={onClick}
			aria-label={label}
			title={title || label}
		>
			{showShadow && (
				<FontAwesomeIcon
					icon={icon}
					className={clsx('absolute translate-x-0.5 opacity-25', iconClassName)}
				/>
			)}
			<FontAwesomeIcon icon={icon} className={iconClassName} />
			{number && (
				<span className='absolute right-1/6 bottom-0 text-xs font-bold'>
					{number}
				</span>
			)}
		</button>
	);
}
