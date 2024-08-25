/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */

"use client";

// import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
