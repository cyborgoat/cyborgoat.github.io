import type {Metadata} from "next";
import {GeistSans} from "geist/font/sans";
import {GeistMono} from "geist/font/mono";
import "./globals.css";
import {cn} from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {ThemeProvider} from "@/components/theme-provider";

export const metadata: Metadata = {
    title: {
        default: "Junxiao Guo - AI Tech Leader & Senior Engineer",
        template: "%s | Junxiao Guo"
    },
    description: "AI Tech Leader with 7+ years of experience in Large Language Models (LLMs), AI Agents, and full-stack development. Leading a team of 20+ engineers from top global universities.",
    keywords: [
        "Junxiao Guo",
        "AI Tech Leader",
        "Large Language Models",
        "LLM",
        "AI Agents",
        "Machine Learning",
        "Full Stack Development",
        "Python",
        "React",
        "Next.js",
        "TypeScript",
        "Carnegie Mellon University",
        "AI Engineer",
        "Tech Leadership"
    ],
    authors: [{name: "Junxiao Guo"}],
    creator: "Junxiao Guo",
    publisher: "Junxiao Guo",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://cyborgoat.github.io'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://cyborgoat.github.io',
        title: 'Junxiao Guo - AI Tech Leader & Senior Engineer',
        description: 'AI Tech Leader with 7+ years of experience in Large Language Models (LLMs), AI Agents, and full-stack development. Leading a team of 20+ engineers from top global universities.',
        siteName: 'Junxiao Guo Portfolio',
        images: [
            {
                url: '/images/ghibli_selfie.png',
                width: 1200,
                height: 630,
                alt: 'Junxiao Guo - AI Tech Leader',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Junxiao Guo - AI Tech Leader & Senior Engineer',
        description: 'AI Tech Leader with 7+ years of experience in Large Language Models (LLMs), AI Agents, and full-stack development.',
        images: ['/images/ghibli_selfie.png'],
        creator: '@cyborgoat',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code', // Replace with actual verification code
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)} suppressHydrationWarning>
        <head>
            <script async src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
            <link rel="manifest" href="/manifest.json"/>
            <meta name="theme-color" content="#000000"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>

            {/* Structured Data for Person */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Junxiao Guo",
                        "alternateName": "Cyborgoat",
                        "jobTitle": "AI Tech Leader & Senior Engineer",
                        "description": "AI Tech Leader with 7+ years of experience in Large Language Models (LLMs), AI Agents, and full-stack development",
                        "url": "https://cyborgoat.github.io",
                        "image": "https://cyborgoat.github.io/images/ghibli_selfie.png",
                        "sameAs": [
                            "https://github.com/cyborgoat",
                            "https://linkedin.com/in/junxiaog"
                        ],
                        "alumniOf": [
                            {
                                "@type": "CollegeOrUniversity",
                                "name": "Carnegie Mellon University",
                                "description": "Master of Science in Electrical & Computer Engineering"
                            },
                            {
                                "@type": "CollegeOrUniversity",
                                "name": "Drexel University",
                                "description": "Bachelor of Science in Physics"
                            }
                        ],
                        "knowsAbout": [
                            "Artificial Intelligence",
                            "Large Language Models",
                            "Machine Learning",
                            "Full Stack Development",
                            "Python",
                            "React",
                            "Next.js",
                            "TypeScript"
                        ]
                    })
                }}
            />
        </head>
        <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            forcedTheme="dark"
            disableTransitionOnChange
        >
            <Header/>
            <div className="flex-1">
                {children}
            </div>
            <Footer/>
        </ThemeProvider>
        </body>
        </html>
    );
}