import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import type { ReactNode } from 'react';

import { CONSTANTS } from '@/config/constants';

import {
	ThemeProvider,
	ConfirmationProvider,
	StyleProvider,
	DndProvider,
} from '@/components';
import { ClientLayoutContent } from '@/components/layout';

import '@/lib/fontawesome';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: CONSTANTS.APP_NAME,
	description:
		'Generate tailored resumes and cover letters using AI assistance',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning
			>
				<ThemeProvider>
					<ConfirmationProvider>
						<StyleProvider>
							<DndProvider>
								<ClientLayoutContent>{children}</ClientLayoutContent>
							</DndProvider>
						</StyleProvider>
					</ConfirmationProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
