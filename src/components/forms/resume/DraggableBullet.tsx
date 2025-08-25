'use client';

import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Bullet } from './Bullet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';

type DraggableBulletProps = {
	value: string;
	onChange: (value: string) => void;
	onRemove: () => void;
	placeholder?: string;
	index: number;
	moveBullet: (dragIndex: number, hoverIndex: number) => void;
	onDoubleClick?: () => void;
};

const ITEM_TYPE = 'BULLET';

export function DraggableBullet({
	value,
	onChange,
	onRemove,
	placeholder,
	index,
	moveBullet,
	onDoubleClick,
}: DraggableBulletProps) {
	const ref = useRef<HTMLDivElement>(null);

	const [{ isDragging }, drag] = useDrag({
		type: ITEM_TYPE,
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop({
		accept: ITEM_TYPE,
		hover: (item: { index: number }, monitor) => {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			moveBullet(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	drag(drop(ref));

	return (
		<div
			ref={ref}
			className={`flex w-full items-start gap-2 transition-opacity ${
				isDragging ? 'opacity-50' : 'opacity-100'
			}`}
			onDoubleClick={onDoubleClick}
		>
			<div className='text-gray flex h-6 w-6 cursor-grab items-center justify-center active:cursor-grabbing'>
				<FontAwesomeIcon icon={faGripVertical} aria-hidden='true' />
			</div>
			<Bullet
				value={value}
				onChange={onChange}
				onRemove={onRemove}
				placeholder={placeholder}
			/>
		</div>
	);
}
