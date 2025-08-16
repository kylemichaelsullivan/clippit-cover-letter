'use client';

import { memo, useEffect } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useSkipLinkTarget } from '@/lib/hooks/useSkipLinkTarget';
import { registerSkipLinkTarget, unregisterSkipLinkTarget } from './SkipLink';

type SkipLinkTargetProps = {
	id: string;
	children: ReactNode;
	className?: string;
	tabIndex?: number;
	style?: CSSProperties;
};

export const SkipLinkTarget = memo(function SkipLinkTarget({
	id,
	children,
	className,
	tabIndex = -1,
	style,
}: SkipLinkTargetProps) {
	const { targetRef } = useSkipLinkTarget();

	useEffect(() => {
		if (targetRef.current) {
			registerSkipLinkTarget(id, targetRef.current);
		}

		return () => {
			unregisterSkipLinkTarget(id);
		};
	}, [id, targetRef]);

	return (
		<div
			className={className}
			tabIndex={tabIndex}
			ref={targetRef}
			id={id}
			style={style}
		>
			{children}
		</div>
	);
});
