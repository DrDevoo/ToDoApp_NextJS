import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "To-Do Kis Richárd 13.D",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hu">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
