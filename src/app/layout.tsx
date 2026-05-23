import Provider from "@/providers/Mantine.provider";
import type { Metadata, Viewport } from "next";
import ReduxProvider from "@/lib/providers";
import { PrimeReactProvider } from "primereact/api";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { WebSocketProvider } from "@/providers/WebSocketContext";

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
