'use client';

import { memo, useState, type ChangeEvent } from 'react';
import ReactSlider from 'react-slider';
import { DEFAULTS } from '@/config/defaults';
import { RangeInputGroup } from './RangeInputGroup';

type SkillsRangeSliderProps = {
	minSkills: number;
	maxSkills: number;
	onRangeChange: (min: number, max: number) => void;
};

export const SkillsRangeSlider = memo(function SkillsRangeSlider({
	minSkills,
	maxSkills,
	onRangeChange,
}: SkillsRangeSliderProps) {
	const [minInputValue, setMinInputValue] = useState(minSkills.toString());
	const [maxInputValue, setMaxInputValue] = useState(maxSkills.toString());

	const handleChange = (value: number | number[]) => {
		if (Array.isArray(value) && value.length === 2) {
			onRangeChange(value[0], value[1]);
			setMinInputValue(value[0].toString());
			setMaxInputValue(value[1].toString());
		}
	};

	const handleMinInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMinInputValue(e.target.value);
	};

	const handleMaxInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMaxInputValue(e.target.value);
	};

	const handleMinInputBlur = () => {
		const inputValue =
			parseInt(minInputValue) || DEFAULTS.FORM_DEFAULTS.SKILLS_RANGE.MIN;
		const newMin = Math.max(
			DEFAULTS.FORM_DEFAULTS.SKILLS_RANGE.MIN,
			Math.min(inputValue, DEFAULTS.FORM_DEFAULTS.SKILLS_RANGE.MAX),
		);
		const newMax = Math.max(newMin, maxSkills);
		onRangeChange(newMin, newMax);
		setMinInputValue(newMin.toString());
		setMaxInputValue(newMax.toString());
	};

	const handleMaxInputBlur = () => {
		const inputValue =
			parseInt(maxInputValue) || DEFAULTS.FORM_DEFAULTS.SKILLS_RANGE.MIN;
		const newMax = Math.max(
			minSkills,
			Math.min(inputValue, DEFAULTS.FORM_DEFAULTS.SKILLS_RANGE.MAX),
		);
		onRangeChange(minSkills, newMax);
		setMinInputValue(minSkills.toString());
		setMaxInputValue(newMax.toString());
	};

	return (
		<div className='SkillsRangeSlider bg-light-gray flex flex-col gap-3 rounded-lg p-4 shadow-md'>
			<div className='flex items-center justify-between'>
				<label
					className='flex items-center justify-start gap-1 text-base font-medium text-black sm:text-lg'
					title='Skills'
					aria-label='Skills'
				>
					<span>Skills</span>
					<span className='xs:block hidden'>to Use</span>
				</label>
				<RangeInputGroup
					minValue={minInputValue}
					maxValue={maxInputValue}
					onMinChange={handleMinInputChange}
					onMaxChange={handleMaxInputChange}
					onMinBlur={handleMinInputBlur}
					onMaxBlur={handleMaxInputBlur}
					min={DEFAULTS.FORM_DEFAULTS.SKILLS_RANGE.MIN}
					max={DEFAULTS.FORM_DEFAULTS.SKILLS_RANGE.MAX}
					minAriaLabel='Minimum skills'
					maxAriaLabel='Maximum skills'
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<ReactSlider
					className='bg-light-gray h-2 w-full rounded-full'
					thumbClassName='h-5 w-5 rounded-full bg-blue border border-gray shadow-md cursor-pointer -top-1.5 focus:outline-none hover:scale-110 transition-transform'
					trackClassName='h-2 rounded-full bg-blue'
					value={[minSkills, maxSkills]}
					onChange={handleChange}
					min={DEFAULTS.FORM_DEFAULTS.SKILLS_RANGE.MIN}
					max={DEFAULTS.FORM_DEFAULTS.SKILLS_RANGE.MAX}
					step={1}
					ariaLabel={['Minimum skills', 'Maximum skills']}
					ariaValuetext={(state) => `${state.valueNow} skills`}
				/>

				<div className='flex justify-between text-xs text-black'>
					<span>{DEFAULTS.FORM_DEFAULTS.SKILLS_RANGE.MIN}</span>
					<span>{DEFAULTS.FORM_DEFAULTS.SKILLS_RANGE.MAX}</span>
				</div>
			</div>
		</div>
	);
});
