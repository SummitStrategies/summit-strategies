import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://summitstrategies.au"),
  title: {
    default: "Summit Strategies — AI Marketing & Growth Systems",
    template: "%s | Summit Strategies",
  },
  description:
    "Summit Strategies is an award-winning AI marketing agency helping businesses book more qualified quotes automatically. Paid ads, AI agents, CRM systems, and SEO — all done for you.",
  keywords: [
    "AI marketing agency",
    "marketing agency Melbourne",
    "marketing agency Australia",
    "AI receptionist",
    "lead generation",
    "Google Ads",
    "Facebook Ads",
    "Instagram Ads",
    "CRM automation",
    "SEO Australia",
    "Summit Strategies",
  ],
  authors: [{ name: "Summit Strategies" }],
  creator: "Summit Strategies",
  publisher: "Summit Strategies",

  // Favicon configuration — Next.js will pick these up automatically
  // but we also list them explicitly for maximum compatibility
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },

  // Open Graph (what shows on social shares like Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://summitstrategies.au",
    siteName: "Summit Strategies",
    title: "Summit Strategies — AI Marketing & Growth Systems",
    description:
      "We combine paid ads, AI automation, and CRM systems to bring you consistent, high-quality enquiries — then book them automatically.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Summit Strategies — AI Marketing & Growth Systems",
      },
    ],
  },

  // Twitter card (what shows on Twitter/X shares)
  twitter: {
    card: "summary_large_image",
    title: "Summit Strategies — AI Marketing & Growth Systems",
    description:
      "We combine paid ads, AI automation, and CRM systems to bring you consistent, high-quality enquiries — then book them automatically.",
    images: ["/og-image.png"],
  },

  // SEO controls
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical URL
  alternates: {
    canonical: "https://summitstrategies.au",
  },
  verification: {
    google: "mrLuXyohwqliwFSNNQdhpaFpqKd3H7NE5q_Fxdlq_Zw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Theme color for mobile browser chrome */}
        <meta name="theme-color" content="#4f46e5" />

        {/* JSON-LD structured data for Google — helps you show up in rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Summit Strategies",
              description:
                "AI-powered marketing agency specialising in paid ads, AI automation, CRM systems, and SEO for businesses in Australia.",
              url: "https://summitstrategies.au",
              logo: "https://summitstrategies.au/icon-512.png",
              image: "https://summitstrategies.au/og-image.png",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressCountry: "AU",
                addressRegion: "Victoria",
                addressLocality: "Melbourne",
              },
              areaServed: {
                "@type": "Country",
                name: "Australia",
              },
              serviceType: [
                "Digital Marketing",
                "AI Marketing Automation",
                "Paid Advertising",
                "Google Ads Management",
                "Facebook Ads Management",
                "SEO Services",
                "CRM Implementation",
              ],
              sameAs: [],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
