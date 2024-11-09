import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from './app/i18n/settings'
import { v4 as uuidv4 } from 'uuid';

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!_next/static|_next/image|assets|favicon.ico|sw.js|public|site.webmanifest).*)']
}

export function middleware(req) {

  if (req.nextUrl.pathname.includes("api")) {
    if (process.env.API_ENABLED !== 'true') {
      let uuid = uuidv4();
      return NextResponse.json({ message: "API Services are disabled", uuid }, { status: 503 });
    } else {
      return NextResponse.next();
    }
  } else {
    let lng
    if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value)
    if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
    if (!lng) lng = fallbackLng

    if (
      !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
      !req.nextUrl.pathname.startsWith('/_next')
    ) {
      return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
    }

    if (req.headers.has('referer')) {
      const refererUrl = new URL(req.headers.get('referer'))
      const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
      const response = NextResponse.next()
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
      return response
    }

    return NextResponse.next()
  }

}