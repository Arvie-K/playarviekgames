import localFont from "next/font/local";
import "./globals.css";

const atmospheric = localFont({
  src: "./assets/Ui/atmospheric-font/Atmospheric.woff",
  variable: "--font-atmospheric",
  weight: "100 900",
});

export const metadata = {
  title: "Arvie K Games",
  description: "Free To Play Browser Games By Arvie K",
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
