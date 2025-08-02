'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { CONSTANTS } from '@/config';
import { Button } from '@/components/ui/buttons';

type BackButtonProps = {
	onClick: () => void;
	title?: string;
	disabled?: boolean;
};

export function BackButton({
	onClick,
	title,
	disabled = false,
}: BackButtonProps) {
	return (
		<Button
			componentName='BackButton'
			color='secondary'
			size='md'
			aria-label={CONSTANTS.ARIA_LABELS.NAVIGATION.BACK}
			title={title}
			onClick={onClick}
			tabIndex={0}
			disabled={disabled}
		>
			<FontAwesomeIcon icon={faChevronLeft} aria-hidden='true' />
		</Button>
	);
}
