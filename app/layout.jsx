import "./globals.css";
import { Playfair_Display } from "next/font/google";

import Navigation from "../components/Navigation/Navigation";
import { Footer } from "../components/Footer/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata = {
  title: "Bookie",
  description: "Your personal reading companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playfair.variable}>
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <Navigation />

        {children}
        <Footer />
      </body>
    </html>
  );
}
