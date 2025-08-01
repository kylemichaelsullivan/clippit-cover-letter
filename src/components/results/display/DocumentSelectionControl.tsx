import { CONSTANTS } from '@/config';

type DocumentSelectionControlProps = {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label: string;
};

export function DocumentSelectionControl({
	checked,
	onChange,
	label,
}: DocumentSelectionControlProps) {
	const id = `include-${label.toLowerCase().replace(/\s+/g, '-')}`;

	return (
		<div className='DocumentSelectionControl flex items-center gap-2'>
			<input
				type='checkbox'
				className={CONSTANTS.CLASS_NAMES.CHECKBOX}
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				id={id}
			/>
			<label
				htmlFor={id}
				className='text-sm font-medium'
				title={`Toggle ${label}`}
			>
				{label}
			</label>
		</div>
	);
}
