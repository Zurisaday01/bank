import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create bank account',
	description: 'Account creation form',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`bg-gradient-to-r from-gray-700 to-black ${inter.className} p-4`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
