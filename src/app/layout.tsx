import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "MotionLab",
    template: "%s · MotionLab",
  },
  description: "A React animation bench for comparing Motion, GSAP, React Spring, Lottie, and AutoAnimate.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full">
        <ThemeProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-signal focus:px-3 focus:py-2 focus:text-ink"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="content">{children}</main>
          <footer className="mx-auto max-w-[1200px] px-6 py-10 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            MotionLab · an animation bench for React engineers
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
