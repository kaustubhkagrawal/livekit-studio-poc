/**
 * Assuming pure url without query params.
 * @param url
 * @param keepSlash
 * @returns
 */
export function cleanTrailingSlash(url = '', keepSlash = false): string {
  const hasSlash = url.charAt(url.length - 1) === '/';

  if (!hasSlash && keepSlash) {
    return url + '/';
  }

  if (hasSlash && !keepSlash) {
    return url.slice(0, -1); // Remove the trailing slash
  }

  return url; // No action needed, return the original URL
}
