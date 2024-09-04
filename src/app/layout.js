import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "To-Do Kis Richárd 13.D",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hu">
      <head>
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

       </head>
      <body className={inter.className}>{children}</body>

    </html>
  );
}
