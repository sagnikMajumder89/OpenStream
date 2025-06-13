import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "OpenStream",
  description: "OpenStream is a platform for streaming content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <NavBar />
        {children}
        <Footer />
        {/* script for theme persisting */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  `,
          }}
        />
      </body>
    </html>
  );
}
