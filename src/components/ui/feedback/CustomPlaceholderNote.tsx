'use client';

export const CustomPlaceholderNote = function CustomPlaceholderNote() {
	return (
		<p className='text-gray pb-4 text-xs'>
			<span>*Note: You can create custom placeholders like</span>
			<span className='text-blue font-mono'>
				{" <%= company's slogan in a clever way %> "}
			</span>
			<span>that will be processed by the AI Overlords and placed here.</span>
		</p>
	);
};
