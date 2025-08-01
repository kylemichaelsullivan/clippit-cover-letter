'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CONSTANTS } from '@/config';
import { Button } from '@/components/ui/buttons';

type ForwardButtonProps = {
	onClick?: () => void;
	title?: string;
	disabled?: boolean;
};

export function ForwardButton({
	onClick,
	title,
	disabled = false,
}: ForwardButtonProps) {
	return (
		<Button
			onClick={onClick}
			disabled={disabled}
			color='secondary'
			size='md'
			aria-label={CONSTANTS.ARIA_LABELS.NAVIGATION.FORWARD}
			title={title}
			componentName='ForwardButton'
		>
			<FontAwesomeIcon icon={faChevronRight} aria-hidden='true' />
		</Button>
	);
}
