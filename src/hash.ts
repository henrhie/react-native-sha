/* eslint-disable prettier/prettier */

/**
 * All SHA classes implement this interface
 */
export interface HashInterface {
  reset: () => void;
  getHash: () => string;
  add: (buf: ArrayBuffer, bufSize: number) => void;
  computeHash: (text: string) => string;
}
