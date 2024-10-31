
import "../globals.css";
import "./components/header"
import Header from "./components/header";
import Footer from "./components/footer";

export default async function RootLayout({ children,
  params: {
    lng
  } }) {

  return (

    <html className="h-full grid grid-cols-12" lang={lng}>
      <link rel="icon" href="../favicon.ico" sizes="any" />
      <body className="h-full flex flex-col col-start-2 col-end-12">
        <Header />
        <main className="flex-1 grid grid-cols-12">
          <div className="col-start-2 col-end-12">
            {children}
          </div>
        </main>
        <Footer lng={lng} />
      </body>
    </html>
  );
}

