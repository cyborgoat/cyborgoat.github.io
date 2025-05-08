import type {Metadata} from "next";
import {GeistSans} from "geist/font/sans";
import {GeistMono} from "geist/font/mono";
import "./globals.css";
import {cn} from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {ThemeProvider} from "@/components/theme-provider";

export const metadata: Metadata = {
    title: "Cyborgoat - Portfolio",
    description: "AI Engineer & Fullstack Enthusiast",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)} suppressHydrationWarning>
        <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
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