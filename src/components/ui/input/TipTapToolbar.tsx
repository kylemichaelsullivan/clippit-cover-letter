'use client';

import { type Editor } from '@tiptap/react';
import {
	faBold,
	faFont,
	faItalic,
	faHeading,
	faListOl,
	faListUl,
	faMinus,
	faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { TipTapButton } from './TipTapButton';

function TipTapDivider() {
	return <div className='bg-light-gray h-6 w-px' />;
}

type TipTapToolbarProps = {
	editor: Editor | null;
	className?: string;
};

export function TipTapToolbar({ editor, className }: TipTapToolbarProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted || !editor) {
		return null;
	}

	const toggleBold = () => editor.chain().focus().toggleBold().run();
	const toggleItalic = () => editor.chain().focus().toggleItalic().run();
	const toggleTextShadow = () =>
		editor.chain().focus().toggleMark('textShadow').run();
	const toggleBulletList = () =>
		editor.chain().focus().toggleBulletList().run();
	const toggleOrderedList = () =>
		editor.chain().focus().toggleOrderedList().run();
	const toggleBlockquote = () =>
		editor.chain().focus().toggleBlockquote().run();
	const insertPageBreak = () =>
		editor.chain().focus().insertContent({ type: 'pageBreak' }).run();

	const setHeading = (level: 1 | 2 | 3) =>
		editor.chain().focus().toggleHeading({ level }).run();

	return (
		<div
			className={clsx(
				'TipTapToolbar border-light-gray bg-gray flex flex-wrap items-center gap-1 border-b p-2',
				className,
			)}
		>
			<TipTapButton onClick={toggleBold} icon={faBold} label='Bold' />

			<TipTapButton onClick={toggleItalic} icon={faItalic} label='Italic' />

			<TipTapButton
				onClick={toggleTextShadow}
				icon={faFont}
				label='Text Shadow'
				showShadow={true}
			/>

			<TipTapDivider />

			<TipTapButton
				onClick={() => setHeading(1)}
				icon={faHeading}
				label='Heading 1'
				number={1}
			/>

			<TipTapButton
				onClick={() => setHeading(2)}
				icon={faHeading}
				label='Heading 2'
				number={2}
			/>

			<TipTapButton
				onClick={() => setHeading(3)}
				icon={faHeading}
				label='Heading 3'
				number={3}
			/>

			<TipTapDivider />

			<TipTapButton
				onClick={toggleBulletList}
				icon={faListUl}
				label='Bullet List'
			/>

			<TipTapButton
				onClick={toggleOrderedList}
				icon={faListOl}
				label='Numbered List'
			/>

			<TipTapButton
				onClick={toggleBlockquote}
				icon={faQuoteLeft}
				label='Quote'
			/>

			<TipTapDivider />

			<TipTapButton
				onClick={insertPageBreak}
				icon={faMinus}
				label='Page Break'
			/>
		</div>
	);
}
