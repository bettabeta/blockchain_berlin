import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blockchain Berlin',
  description: 'Personal website for Blockchain Berlin',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

