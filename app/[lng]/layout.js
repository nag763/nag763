
import "../globals.css";
import "./components/header"
import Header from "./components/header";
import Footer from "./components/footer";
import Intro from "./components/intro";

export default async function RootLayout({ children,
  params: {
    lng
  } }) {

  return (

    <html className="h-full grid grid-cols-12" lang={lng}>
      <link rel="icon" href="../favicon.ico" sizes="any" />
      <body className="flex flex-col col-start-2 col-end-12 overflow-y-auto">
        <Header />
        <main className="snap-y  overflow-y-auto">
        {children}
        </main>
        <Footer lng={lng} />
      </body>
    </html>
  );
}

