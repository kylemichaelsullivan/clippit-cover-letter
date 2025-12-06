import { showToast } from '@/lib/toast';
import { useEffect } from 'react';

type UseGenerationTimeoutProps = {
	isGenerating: boolean;
	setIsGenerating: (isGenerating: boolean) => void;
	timeoutMessage: string;
	timeoutMs?: number;
};

export const useGenerationTimeout = ({
	isGenerating,
	setIsGenerating,
	timeoutMessage,
	timeoutMs = 60000,
}: UseGenerationTimeoutProps) => {
	useEffect(() => {
		if (isGenerating) {
			const timeout = setTimeout(() => {
				setIsGenerating(false);
				showToast.error(timeoutMessage);
			}, timeoutMs);

			return () => clearTimeout(timeout);
		}
	}, [isGenerating, setIsGenerating, timeoutMessage, timeoutMs]);
};
