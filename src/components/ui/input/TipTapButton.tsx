'use client';

import { Button } from '@/components/ui/buttons/Button';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

type TipTapButtonProps = {
	icon: IconDefinition;
	label: string;
	onClick: () => void;
	title?: string;
	number?: number;
	iconClassName?: string;
	showShadow?: boolean;
	isActive?: boolean;
};

export function TipTapButton({
	icon,
	label,
	onClick,
	title,
	number,
	iconClassName,
	showShadow,
	isActive = false,
}: TipTapButtonProps) {
	return (
		<Button
			componentName='TipTapButton'
			color={isActive ? 'primary' : 'secondary'}
			size='tiptap'
			aria-label={label}
			title={title || label}
			onClick={onClick}
		>
			{showShadow && (
				<FontAwesomeIcon
					icon={icon}
					className={clsx('absolute translate-x-0.5 opacity-25', iconClassName)}
				/>
			)}
			<FontAwesomeIcon icon={icon} className={iconClassName} />
			{number && (
				<span className='absolute right-1/12 bottom-0 text-xs font-bold'>
					{number}
				</span>
			)}
		</Button>
	);
}
