import type {Metadata} from "next";
import {GeistSans} from "geist/font/sans";
import {GeistMono} from "geist/font/mono";
import "./globals.css";

import {profile, rssPath, siteUrl} from "@/data/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {ThemeProvider} from "@/components/theme-provider";

const role = "AI Tech Leader & Senior Engineer";
const socialTitle = `${profile.name} - ${role}`;
const summary = "AI Tech Leader with 7+ years of experience in Large Language Models (LLMs), AI Agents, and full-stack development";
const description = `${summary}. Leading a team of 20+ engineers from top global universities.`;
const socialImage = "/images/ghibli_selfie.png";

export const metadata: Metadata = {
    title: {
        default: profile.name,
        template: `%s | ${profile.name}`
    },
    description: description,
    keywords: [
        profile.name,
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
    authors: [{name: profile.name}],
    creator: profile.name,
    publisher: profile.name,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
        canonical: '/',
        types: {
            'application/rss+xml': rssPath,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        title: socialTitle,
        description,
        siteName: `${profile.name} Portfolio`,
        images: [
            {
                url: socialImage,
                width: 1200,
                height: 630,
                alt: `${profile.name} - AI Tech Leader`,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: socialTitle,
        description: `${summary}.`,
        images: [socialImage],
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
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-scroll-behavior="smooth" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
        <head>
            <link rel="manifest" href="/manifest.json"/>
            <meta name="theme-color" content="#F8F2E8" media="(prefers-color-scheme: light)"/>
            <meta name="theme-color" content="#11131A" media="(prefers-color-scheme: dark)"/>

            {/* Structured Data for Person */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": profile.name,
                        "alternateName": "Cyborgoat",
                        "jobTitle": role,
                        "description": summary,
                        "url": siteUrl,
                        "image": `${siteUrl}${socialImage}`,
                        "sameAs": [profile.github, profile.linkedin],
                        "alumniOf": profile.education.map(({institution, degree}) => ({
                            "@type": "CollegeOrUniversity",
                            "name": institution,
                            "description": degree,
                        })),
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
        <ThemeProvider>
            <Header/>
            <main id="main-content" tabIndex={-1} className="flex-1">
                {children}
            </main>
            <Footer/>
        </ThemeProvider>
        </body>
        </html>
    );
}
