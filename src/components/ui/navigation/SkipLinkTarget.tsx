'use client';

import { memo, useEffect, type ReactNode } from 'react';
import { useSkipLinkTarget } from '@/lib/hooks/useSkipLinkTarget';
import { registerSkipLinkTarget, unregisterSkipLinkTarget } from './SkipLink';

type SkipLinkTargetProps = {
	id: string;
	children: ReactNode;
	className?: string;
	tabIndex?: number;
	style?: React.CSSProperties;
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
			ref={targetRef}
			id={id}
			className={className}
			tabIndex={tabIndex}
			style={style}
		>
			{children}
		</div>
	);
});
