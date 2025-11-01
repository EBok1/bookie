import "./globals.css";

import Navigation from "../components/Navigation/Navigation";
import { Footer } from "../components/Footer/Footer";

export const metadata = {
  title: "Bookie",
  description: "Your personal reading companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
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
