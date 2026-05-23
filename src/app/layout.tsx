import ReduxProvider from "@/lib/providers";
import Provider from "@/providers/Mantine.provider";
import { WebSocketProvider } from "@/providers/WebSocketContext";
import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Anon Whisper - Anonymous Complaint Platform",
  description: "A secure platform for submitting complaints while keeping your identity protected.",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: "#3563E9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${dmSans.variable} font-sans antialiased`}>
        <PrimeReactProvider>
          <ReduxProvider>
            <Provider>
              <WebSocketProvider>{children}</WebSocketProvider>
            </Provider>
          </ReduxProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
