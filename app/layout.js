'use client'

import "./globals.css";
import "./components/header"
import Header from "./components/header";
import Footer from "./components/footer";
import useDarkTheme from "./hooks/darktheme";


export default function RootLayout({ children }) {
  const darkTheme = useDarkTheme();
  return (
    <html lang="en" className="h-full grid grid-cols-12" data-theme={useDarkTheme ? "dracula" : "light"}>
      <body className="h-full flex flex-col col-start-2 col-end-12">
        <Header/>
        <main className="flex-1 grid grid-cols-12">
          <div className="col-start-2 col-end-12">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
