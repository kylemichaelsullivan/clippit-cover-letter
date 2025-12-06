import { PageBreak } from '@/lib/utils/pageBreakExtension';
import { describe, expect, it } from 'vitest';

describe('PageBreak Extension', () => {
	it('should be importable and have the correct name', () => {
		expect(PageBreak).toBeDefined();
		expect(PageBreak.name).toBe('pageBreak');
	});
});
