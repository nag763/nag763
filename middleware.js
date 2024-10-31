import { NextResponse } from 'next/server'
import acceptLanguageParser from 'accept-language-parser'
import { fallbackLng, languages, cookieName } from './app/i18n/settings'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)'],
}

export function middleware(req) {
  let lng

  // Obtenir la langue depuis le cookie si disponible
  if (req.cookies.has(cookieName)) {
    lng = req.cookies.get(cookieName).value
  }

  // Obtenir la langue à partir de l'en-tête 'Accept-Language' si pas de cookie
  if (!lng) {
    const acceptLanguageHeader = req.headers.get('Accept-Language')
    if (acceptLanguageHeader) {
      const parsed = acceptLanguageParser.pick(languages, acceptLanguageHeader, { loose: true })
      lng = parsed || fallbackLng
    }
  }

  // Utiliser la langue de repli si aucune langue n'est trouvée
  if (!lng) lng = fallbackLng

  // Redirection si la langue n'est pas dans l'URL
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
  }

  // Gestion de la langue depuis le référent
  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer'))
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next()
}
