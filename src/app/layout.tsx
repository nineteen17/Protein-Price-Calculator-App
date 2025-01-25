import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { ThemeProvider } from 'next-themes';

import './globals.css';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

export const metadata: Metadata = {
    title: 'Protein Compare - Compare Protein Prices Easily',
    description:
        'Easily compare the cost of protein products per gram. Add products, adjust serving sizes, and find the best value for your money with Protein Compare.',
    keywords:
        'Protein Compare, protein cost calculator, compare protein prices, protein supplements, cost per gram, supplement comparison tool',
    openGraph: {
        title: 'Protein Compare - Compare Protein Prices Easily',
        description:
            'Discover the best protein deals by comparing prices per gram. Simplify your protein shopping with Protein Compare.',
        url: 'https://proteincompare.com',
        siteName: 'Protein Compare',
        images: [
            {
                url: 'https://proteincompare.com/images/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Protein Compare'
            }
        ],
        locale: 'en_US',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        site: '@proteincompare',
        title: 'Protein Compare - Compare Protein Prices Easily',
        description:
            'Find the best value protein supplements by comparing cost per gram. Start saving today with Protein Compare!'
    },
    viewport: 'width=device-width, initial-scale=1',
    robots: {
        index: true,
        follow: true
    }
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
        <html suppressHydrationWarning lang='en'>
            <body className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}>
                {children}
            </body>
        </html>
    );
};

export default Layout;
