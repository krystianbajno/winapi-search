import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "../app/components/layout/client-layout";

export const metadata: Metadata = {
  title: "WinAPI Search",
  description: "WinAPI Search helps you find functions in WinAPI DLLs. You can search by DLL name, function name, return type, and parameters, with results showing matches for all your search terms.",
  openGraph: {
    images: 'https://winapi-search.vercel.app/images/windows.jpg',
  },
  keywords: ['WinAPI', 'search', 'index', 'functions'],
  authors: [
    { name: 'Krystian Bajno', url: 'https://github.com/krystianbajno' }, 
    { name: "Artideusz", url: "https://github.com/Artideusz" }
  ],
  metadataBase: new URL('https://github.com/krystianbajno/winapi-search'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
