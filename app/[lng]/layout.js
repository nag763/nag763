
import "../globals.css";
import "./components/header"
import Header from "./components/header";
import Footer from "./components/footer";
import { Raleway } from 'next/font/google'

const raleway = Raleway({ subsets: ['latin'] })

export default async function RootLayout({ children,
  params: {
    lng
  } }) {

  return (

    <html className="h-full" lang={lng}>
      <link rel="icon" href="../favicon.ico" sizes="any" />
      <body className="flex flex-col w-full overflow-y-auto scroll-smooth h-dvh">
        <Header className="flex-1  "/>
        <main id="main" className={`snap-y max-h-full max-w-full overflow-y-auto space-y-12 xl:space-y-32 px-[10%] ${raleway.className}`}>
          {children}
        </main>
        <Footer className="flex-1" lng={lng} />
      </body>
    </html>
  );
}

