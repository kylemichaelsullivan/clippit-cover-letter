type DocumentSelectionControlProps = {
	checked: boolean;
	label: string;
	onChange: (checked: boolean) => void;
};

export function DocumentSelectionControl({
	checked,
	label,
	onChange,
}: DocumentSelectionControlProps) {
	const id = `include-${label.toLowerCase().replace(/\s+/g, '-')}`;

	return (
		<div className='DocumentSelectionControl flex items-center gap-2'>
			<input
				type='checkbox'
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
