'use client';

import { memo } from 'react';

export const WelcomeFooter = memo(function WelcomeFooter() {
	return (
		<p className='text-gray text-sm'>
			Ready to get started? Click &quot;Next&quot; to begin entering your
			information.
		</p>
	);
});
