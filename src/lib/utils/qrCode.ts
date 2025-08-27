import QRCode from 'qrcode';

export async function generateQRCodeSVG(url: string): Promise<string> {
	try {
		const svg = await QRCode.toString(url, {
			type: 'svg',
			width: 32,
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
