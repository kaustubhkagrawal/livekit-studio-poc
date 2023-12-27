import Chance from 'chance';

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

export function randomRoomName(maxLength = 20) {
  const chance = new Chance();

  const a: string[] = [];
  a.push(chance.twitter().slice(1));
  a.push(chance.animal());
  a.push(chance.syllable());
  // a.push(chance.name().split(' ')[1]);
  a.push(chance.last({ nationality: 'en' }));
  a.push(chance.city());
  a.push(chance.country());
  a.push(chance.company());

  const b = a.filter((str) => str);

  const c = (chance.pickset(b, 3).join('-') + '-' + chance.millisecond())
    .replace(/[ \s,]/g, '-')
    .replace(/['.]/g, '')
    .toLowerCase()
    .slice(0, 20);

  if (c.charAt(c.length - 1) === '-') {
    return c.slice(0, -1);
  }

  return c;
}
