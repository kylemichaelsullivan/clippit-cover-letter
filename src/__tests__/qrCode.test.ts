import { generateQRCodeSVG } from '@/lib/utils/qrCode';
import { describe, it, expect } from 'vitest';

describe('QR Code Generation', () => {
	it('should generate async QR code SVG', async () => {
		const testUrl = 'https://example.com';
		const result = await generateQRCodeSVG(testUrl);

		expect(result).toBeTruthy();
		expect(result).toContain('<svg');
		expect(result).toContain('xmlns="http://www.w3.org/2000/svg"');
		expect(result).toContain('width="32"');
		expect(result).toContain('height="32"');
	});

	it('should handle empty URL gracefully', async () => {
		const result = await generateQRCodeSVG('');
		expect(result).toBe('');
	});
});
