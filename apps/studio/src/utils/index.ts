import Chance from 'chance';

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
