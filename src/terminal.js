import { fromJS } from 'immutable';
import _shuffle from 'lodash/shuffle';
import words from './words';

const ROW_COUNT = 40;
const ROW_LENGTH = 15;
// Pick a random password array
const PASSWORDS = words[Math.floor(Math.random() * words.length)]

function generateMemoryAddresses () {
  // 5000-9000 will always return 4digit hexes
  let base = Math.trunc((Math.random() * (9 - 5) + 5) * 1000);
  let addresses = [];

  for (let i = 0; i < ROW_COUNT; i++) {
    // Convert to hexademical
    addresses.push(`0x${base.toString(16).toUpperCase()}`);

    base += Math.floor(Math.random() * (15 - 5) + 5);
  }

  return addresses;
}

function generateMemoryContent () {
  // The amount of passwords in the terminal
  const passwordCount = PASSWORDS.length;
  // The amount of dud removals, must be less than the password amount
  const dudRmCount = Math.floor(Math.random() * ((passwordCount - 1) - 2) + 2);
  // The rest of the content (rows without dud removals or passwords)
  const commonCount = ROW_COUNT - passwordCount - dudRmCount;

  const dudRms = generateDudRm(dudRmCount);
  const passwords = generatePasswordContent(passwordCount);

  return {
    data: _shuffle([
      ...generateCommonCodes(commonCount),
      ...dudRms.data,
      ...passwords.data
    ]),
    dudRms: dudRms.list,
    passwords: passwords.list
  };
}

// Generate strings without dud removals or words
function generateCommonCodes (count) {
  return Array.from({length: count}).map(() => {
    let codes;

    do {
      codes = generateRandomStringArray(ROW_LENGTH);
    } while (hasDudRm(codes.join('')));

    return {
      type: 'common',
      codes
    };
  });
}

function generateDudRm (count) {
  let dudRmsList = [];

  const dudRms = Array.from({length: count}).map(() => {
    let dudRm;
    let dud;

    do {
      dudRm = generateRandomStringArray(ROW_LENGTH);

      dud = hasDudRm(dudRm.join(''), true);
    } while (!dud);

    const dudIndex = dudRm.join('').indexOf(dud);
    const dudLength = dud.join('').length;

    dudRmsList.push(dud[0]);

    return {
      type: 'dudRm',
      codes: [
        ...dudRm.slice(0, dudIndex),
        dud[0],
        ...dudRm.slice(dudIndex + dudLength)
      ]
    };
  });

  return {
    data: dudRms,
    list: dudRmsList
  };
}

function generatePasswordContent (count) {
  let passwordsList = [];

  const passwords = PASSWORDS.map(word => {
    let codes;

    do {
      codes = _shuffle([
        ...generateRandomStringArray(ROW_LENGTH - word.length),
        word.toUpperCase()
      ]);
    } while (hasDudRm(codes.join('')));

    passwordsList.push(word.toUpperCase());

    return {
      type: 'password',
      codes
    };
  });

  return {
    data: passwords,
    list: passwordsList
  };
}

function hasDudRm (str, withDudRm) {
  const dudRegex = new RegExp(/((\(.*\))|(\[.*\])|({.*})|(<.*>))/, 'g');

  let match = str.match(dudRegex);

  if (match) {
    if (withDudRm) {
      return match.length === 1 ? match : false;
    }

    return true;
  }

  return false;
}

function generateRandomStringArray (length) {
  const chars = '!@#$%^*()-_=[]{}|;:\'",.<>\\';

  return Array.from({length}).map(() => {
    return chars[Math.floor(Math.random() * chars.length)];
  });
}

export function initTerminal () {
  const memoryAddr = generateMemoryAddresses();
  const memoryContent = generateMemoryContent();

  const data = memoryAddr.map((mem, idx) => {
    return {
      address: mem,
      content: memoryContent.data[idx]
    };
  });

  // Pick a random password
  const validPassword = memoryContent.passwords[Math.floor(Math.random() * memoryContent.passwords.length)];
  // Remove the valid password from the array
  const passwords = memoryContent.passwords.filter(pass => pass !== validPassword);

  return fromJS({
    data,
    dudRms: memoryContent.dudRms,
    passwords,
    validPassword
  });
}

export function getLikeness (validPass, currentPass) {
  return validPass.split('').reduce((matches, char, index) => {
    return char === currentPass.charAt(index) ? matches + 1 : matches;
  }, 0);
}

// Convert passowords to ... and dud removals to (..), etc
export function removeCode (word, isPassword) {
  if (isPassword) {
    return '.'.repeat(word.length);
  }

  return word.charAt(0) + '.'.repeat(word.length - 2) + word.charAt(word.length - 1);
}
