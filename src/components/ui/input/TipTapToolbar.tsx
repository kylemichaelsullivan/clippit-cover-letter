'use client';

import {
	faBold,
	faFont,
	faHeading,
	faItalic,
	faListOl,
	faListUl,
	faMinus,
	faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons';
import type { Editor } from '@tiptap/react';
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
				'TipTapToolbar border-light-gray bg-gray z-10 m-0 flex flex-wrap items-center gap-1 rounded-t-lg border-b p-3',
				className
			)}
		>
			<TipTapButton
				icon={faBold}
				label='Bold'
				isActive={editor.isActive('bold')}
				onClick={toggleBold}
			/>

			<TipTapButton
				icon={faItalic}
				label='Italic'
				isActive={editor.isActive('italic')}
				onClick={toggleItalic}
			/>

			<TipTapButton
				icon={faFont}
				label='Text Shadow'
				showShadow={true}
				isActive={editor.isActive('textShadow')}
				onClick={toggleTextShadow}
			/>

			<TipTapDivider />

			<TipTapButton
				icon={faHeading}
				label='Heading 1'
				number={1}
				isActive={editor.isActive('heading', { level: 1 })}
				onClick={() => setHeading(1)}
			/>

			<TipTapButton
				icon={faHeading}
				label='Heading 2'
				number={2}
				isActive={editor.isActive('heading', { level: 2 })}
				onClick={() => setHeading(2)}
			/>

			<TipTapButton
				icon={faHeading}
				label='Heading 3'
				number={3}
				isActive={editor.isActive('heading', { level: 3 })}
				onClick={() => setHeading(3)}
			/>

			<TipTapDivider />

			<TipTapButton
				icon={faListUl}
				label='Bullet List'
				isActive={editor.isActive('bulletList')}
				onClick={toggleBulletList}
			/>

			<TipTapButton
				icon={faListOl}
				label='Numbered List'
				isActive={editor.isActive('orderedList')}
				onClick={toggleOrderedList}
			/>

			<TipTapButton
				icon={faQuoteLeft}
				label='Quote'
				isActive={editor.isActive('blockquote')}
				onClick={toggleBlockquote}
			/>

			<TipTapDivider />

			<TipTapButton
				icon={faMinus}
				label='Page Break'
				onClick={insertPageBreak}
			/>
		</div>
	);
}
