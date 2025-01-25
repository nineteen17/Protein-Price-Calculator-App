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
    title: 'Protein Price Calculator - Compare and Save',
    description: 'Easily calculate and compare the cost of protein products per gram. Add your products, adjust serving sizes, and find the best value.',
    keywords: 'Protein Price Calculator, protein comparison, cost per gram, supplement calculator, protein supplements, price comparison tool',
    openGraph: {
        title: 'Protein Price Calculator - Compare and Save',
        description: 'Discover the best value protein supplements by calculating cost per gram. Optimize your purchases with our easy-to-use tool.',
        url: 'https://yourwebsite.com',
        siteName: 'Protein Price Calculator',
        images: [
            {
                url: 'https://yourwebsite.com/images/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Protein Price Calculator',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: '@yourtwitterhandle',
        title: 'Protein Price Calculator - Compare and Save',
        description: 'Discover the best value protein supplements by calculating cost per gram. Optimize your purchases with our easy-to-use tool.',
    },
    viewport: 'width=device-width, initial-scale=1',
    robots: {
        index: true,
        follow: true,
    },
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
