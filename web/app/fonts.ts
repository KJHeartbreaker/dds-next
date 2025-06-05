import { EB_Garamond, Oswald } from 'next/font/google';

export const ebGaramond = EB_Garamond({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400'],
	variable: '--font-eb-garamond',
});

export const oswald = Oswald({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '700'],
	variable: '--font-oswald',
});
