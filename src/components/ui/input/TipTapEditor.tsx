'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { PageBreak } from '@/lib/utils/pageBreakExtension';
import { TextShadow } from '@/lib/utils/textShadowExtension';
import Typography from '@tiptap/extension-typography';

import { TipTapToolbar } from './TipTapToolbar';

const TipTapEditorContent = dynamic(() => Promise.resolve(EditorContent), {
	ssr: false,
});

const TipTapToolbarComponent = dynamic(() => Promise.resolve(TipTapToolbar), {
	ssr: false,
});

type TipTapEditorProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	componentName?: string;
	isDocument?: boolean;
	className?: string;
	readOnly?: boolean;
	id?: string;
	'aria-label'?: string;
};

export function TipTapEditor({
	value,
	onChange,
	placeholder = 'Start typing…',
	componentName,
	isDocument = false,
	className = '',
	readOnly = false,
	id,
	'aria-label': ariaLabel,
}: TipTapEditorProps) {
	const [isMounted, setIsMounted] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const isUpdatingRef = useRef(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const throttledOnChange = useCallback(
		(newValue: string) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = setTimeout(() => {
				isUpdatingRef.current = false;
				onChange(newValue);
			}, 150);
		},
		[onChange],
	);

	const editor = useEditor({
		extensions: [
			StarterKit,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			TextShadow,
			PageBreak,
			Typography,
		],
		content: value,
		editable: !readOnly,
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			if (isUpdatingRef.current) return;
			const html = editor.getHTML();
			throttledOnChange(html);
		},
		editorProps: {
			attributes: {
				...(id && { id }),
				...(ariaLabel && { 'aria-label': ariaLabel }),
			},
		},
	});

	useEffect(() => {
		if (editor && !isUpdatingRef.current) {
			const currentHtml = editor.getHTML();
			if (currentHtml !== value && value !== '<p></p>' && value !== '') {
				isUpdatingRef.current = true;
				editor.commands.setContent(value);
				// Reset the flag after a short delay to allow the update to complete
				setTimeout(() => {
					isUpdatingRef.current = false;
				}, 50);
			}
		}
	}, [editor, value]);

	useEffect(() => {
		if (editor) {
			editor.setEditable(!readOnly);
		}
	}, [editor, readOnly]);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	if (!isMounted || !editor) {
		return (
			<div
				className={clsx(
					componentName || 'TipTapEditor',
					'border-light-gray rounded-lg border bg-white',
					isDocument &&
						'min-h-64 max-w-none overflow-y-auto p-4 text-sm leading-relaxed sm:min-h-96 sm:text-base',
					className,
				)}
			>
				<div
					className={clsx(
						isDocument
							? 'w-full max-w-none overflow-y-auto text-sm text-black sm:text-base'
							: 'w-full max-w-none overflow-y-auto p-4 text-sm text-black sm:text-base',
					)}
				>
					{value || placeholder}
				</div>
			</div>
		);
	}

	return (
		<div
			className={clsx(
				componentName || 'TipTapEditor',
				'border-light-gray rounded-lg border bg-white',
				isDocument &&
					'min-h-64 max-w-none overflow-y-auto p-4 text-sm leading-relaxed sm:min-h-96 sm:text-base',
				className,
			)}
		>
			{!readOnly && <TipTapToolbarComponent editor={editor} />}
			<TipTapEditorContent
				editor={editor}
				className={clsx(
					'TipTapEditorContent',
					isDocument
						? 'focus:outline-none'
						: 'w-full max-w-none overflow-y-auto p-4 text-sm focus:outline-none sm:text-base',
				)}
				data-placeholder={placeholder}
			/>
		</div>
	);
}
