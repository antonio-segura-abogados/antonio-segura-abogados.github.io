const publicOrigin = 'https://antonio-segura-abogados.github.io';

/** Conserva los destinos externos y adapta los enlaces de la demo al servidor local. */
export function presentationLink(url: string, currentUrl = window.location.href): string {
  const destination = new URL(url);
  const current = new URL(currentUrl);
  const isLocal = ['localhost', '127.0.0.1', '[::1]'].includes(current.hostname);
  if (destination.origin !== publicOrigin || !isLocal) return url;
  return `${current.origin}${destination.pathname}${destination.search}${destination.hash}`;
}
