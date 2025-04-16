import localFont from "next/font/local";
import "./globals.css";

const atmospheric = localFont({
  src: "./assets/Ui/atmospheric-font/Atmospheric.woff",
  variable: "--font-atmospheric",
  weight: "100 900",
});

const siteUrl = "https://www.arviek.games"; // Define your site URL
const siteName = "Arvie K Games";
const siteDescription = "Play Free To Play Browser Games By Arvie K. Explore a collection of unique indie games, fan games, and more.";
const siteKeywords = "Arvie K, Arvie K Games, free games, online games, browser games, indie games, fan games, play games online";
const siteImage = `${siteUrl}/ArvieKGamesLogoFull.png`; // Replace with your actual default OG image URL

export const metadata = {
  metadataBase: new URL(siteUrl), // Important for resolving relative image paths
  title: {
    default: siteName, // Default title
    template: `%s - ${siteName}`, // Template for page-specific titles
  },
  description: siteDescription,
  keywords: siteKeywords,
  openGraph: {
    title: {
        default: siteName,
        template: `%s - ${siteName}`,
    },
    description: siteDescription,
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: siteImage, // Must be an absolute URL
        width: 1200, // Example width
        height: 630, // Example height
        alt: `${siteName} Logo`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
        default: siteName,
        template: `%s - ${siteName}`,
    },
    description: siteDescription,
    // siteId: 'YourTwitterSiteID', // Optional
    // creator: '@YourTwitterHandle', // Optional
    // creatorId: 'YourTwitterCreatorID', // Optional
    images: [siteImage], // Must be an absolute URL
  },
  // Add other default metadata like icons, robots, etc. if needed
  // icons: {
  //   icon: '/favicon.ico',
  //   apple: '/apple-touch-icon.png',
  // },
  // robots: { // Example robots configuration
  //   index: true,
  //   follow: true,
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${atmospheric.variable}`}>
        {children}
      </body>
    </html>
  );
}
