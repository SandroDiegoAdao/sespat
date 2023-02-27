const formatString = (name: string): string => {
  if (name == null) {
    return '';
  }

  const words = name.split(' ');
  const numberOfWords = words.length;
  const firstWordInitialLetter = name.charAt(0);
  const lastWordInitialLetter = numberOfWords > 1 ? words[numberOfWords - 1].charAt(0) : '';

  return String(firstWordInitialLetter + lastWordInitialLetter).toUpperCase();
};

const formatArrayOfNames = (name: string): Array<string> => {
  const format = name.replace(/\s+/gi, ' ').trim();
  return format.split(' ');
};

const isNameFormated = (name: string): boolean => {
  const arrayOfNames = formatArrayOfNames(name);

  if (arrayOfNames.length > 2) {
    return true;
  }

  return false;
};

const formatName = (name: string): string => {
  const arrayOfNames = formatArrayOfNames(name);

  if (arrayOfNames.length > 2) {
    return arrayOfNames.map((n, index) => (index !== 1 ? n : `${n[0]}.`)).join(' ');
  }

  return name;
};

export { formatString, formatName, isNameFormated };
