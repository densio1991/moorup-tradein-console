/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";

export function createActionTypes(baseType: string) {
  return {
    baseType,
    SUCCESS: `${baseType}_SUCCESS`,
    FAILED: `${baseType}_FAILED`,
  };
}

export const amountFormatter = (amount: any, currency = "PHP") => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "code",
  });

  return formattedAmount.format(Number(amount || 0))
    .replace(currency, "")
    .trim();
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const validateExpiry = (date: any) => {
  if (date && date !== "") {
    const currentTime = Date.now() / 1000; // Convert to seconds
    return date >= currentTime;
  }
  return false;
};

// 53-bit hash
export function cyrb53(str: string, seed = 0) {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;

  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

interface TokenPayload {
    id: string;
    exp: number;
    iat: number;
    iss: string;
    email: string;
}

export const decodeJWT = (token: string): TokenPayload | null => {
    try {
        return jwtDecode<TokenPayload>(token);
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
};

export function getInitials(text: string) {
  const words = text.trim().split(' ');

  if (words.length === 0) {
    return '';
  }

  const firstInitial = words[0].charAt(0).toUpperCase();
  const lastInitial = words[words.length - 1].charAt(0).toUpperCase();

  return `${firstInitial}${lastInitial}`;
}

export function sortByKey(array: any[], key: string | number) {
  return array.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
}

export function sortArray<T>(array: T[], key: string, direction: string): T[] {
  const compare = (a: T, b: T) => {
    const aValue = (a as any)[key].toLowerCase();
    const bValue = (b as any)[key].toLowerCase();

    if (direction === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  };

  return array.slice().sort(compare);
}