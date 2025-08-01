import { CONSTANTS } from '../../config/constants';
import { ThemeToggle } from '@/components/ui/buttons/ThemeToggle';

export function Title() {
	return (
		<div className='Title flex w-full items-center justify-between gap-4 bg-white p-4 shadow-sm sm:px-6 lg:px-8'>
			<h1 className='text-xl font-semibold text-black'>{CONSTANTS.APP_NAME}</h1>
			<ThemeToggle />
		</div>
	);
}
