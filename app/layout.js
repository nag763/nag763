'use client'
import "./globals.css";
import "./components/header"
import Header from "./components/header";
import Footer from "./components/footer";
import useDarkTheme from "./hooks/darktheme";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "legal": "© 2024 Loïc LABEYE. All rights reserved."
        }
      },
      fr: {
        translation: {
          "legal": "© 2024 Loïc LABEYE. Tous droits réservés."
        }
      }
    },
    lng: ["en", "fr"],
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default function RootLayout({ children }) {
  const darkTheme = useDarkTheme();

  return (

    <html className="h-full grid grid-cols-12" data-theme={useDarkTheme ? "dracula" : "light"}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className="h-full flex flex-col col-start-2 col-end-12">
        <Header />
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

