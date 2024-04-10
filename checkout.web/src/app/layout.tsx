import type { Metadata } from "next";
import { Providers } from '../services/providers';


export const metadata: Metadata = {
  title: "Checkout App",
  description: "checkout simulation app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers >{children}</ Providers>
      </body>
    </html>
  );
}
