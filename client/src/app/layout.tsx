import { Geist } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vinear - Gọi video làm quen",
  description: "Kết nối người dùng theo khu vực qua gọi video ngẫu nhiên",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${geistSans.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
