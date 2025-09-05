import { describe, it, expect } from 'vitest';
import { PageBreak } from '@/lib/utils/pageBreakExtension';

describe('PageBreak Extension', () => {
	it('should be importable and have the correct name', () => {
		expect(PageBreak).toBeDefined();
		expect(PageBreak.name).toBe('pageBreak');
	});
});
