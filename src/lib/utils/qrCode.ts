import QRCode from 'qrcode';

export function generateQRCodeSVGSync(url: string): string {
	try {
		// Use a simple synchronous approach for QR code generation
		// This is a basic implementation that creates a QR-like pattern
		const size = 80;
		const cellSize = 4;
		const cells = size / cellSize;

		let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;
		svg += `<rect width="${size}" height="${size}" fill="white"/>`;

		// Generate a QR-like pattern based on the URL
		const urlHash = url
			.split('')
			.reduce((acc, char) => acc + char.charCodeAt(0), 0);

		for (let i = 0; i < cells; i++) {
			for (let j = 0; j < cells; j++) {
				const x = i * cellSize;
				const y = j * cellSize;
				const shouldFill = (i * 31 + j * 17 + urlHash) % 2 === 0;

				if (shouldFill) {
					svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="black"/>`;
				}
			}
		}

		svg += '</svg>';
		return svg;
	} catch (error) {
		console.error('Error generating QR code:', error);
		return '';
	}
}

export async function generateQRCodeSVG(url: string): Promise<string> {
	try {
		const svg = await QRCode.toString(url, {
			type: 'svg',
			width: 80,
			margin: 1,
			color: {
				dark: '#000000',
				light: '#FFFFFF',
			},
		});
		return svg;
	} catch (error) {
		console.error('Error generating QR code:', error);
		return '';
	}
}
