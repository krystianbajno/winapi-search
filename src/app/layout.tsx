import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "../app/components/layout/client-layout";

export const metadata: Metadata = {
  title: "WinAPI Search",
  description: "WinAPI search straight out of da hood.",
  openGraph: {
    images: '',
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
