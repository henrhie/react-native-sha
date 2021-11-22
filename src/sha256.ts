/* eslint-disable prettier/prettier */
import type { HashInterface } from './hash';

declare global {
  function sha256(): HashInterface;
}

export class SHA256 implements HashInterface {
  private nativeSha256Instance: HashInterface;

  /**
   * Instantiates native c++ implementation of SHA256 as host object
   * @returns reference to instantiated host object
   */

  constructor() {
    this.nativeSha256Instance = sha256();
  }

  /**
   *
   * @returns the latest hex hash as string
   * @example sha256.getHash() //33e9b48e6afb96bc6195f02102831b37c9cebbdacf9173df1881b9a7764444ae
   */

  getHash(): string {
    return this.nativeSha256Instance.getHash();
  }

  /**
   * flushes latest hash out of memory
   * @example sha256.reset()
   */

  reset(): void {
    this.nativeSha256Instance.reset();
  }

  /**
   *
   * @param buf ArrayBuffer
   * @param bufSize number
   * adds abitrary number of bytes as ArrayBuffer
   * @example sha1.add(dataToProcess, dataToProcess.byteLength)
   */

  add(buf: ArrayBuffer, bufSize: number): void {
    this.nativeSha256Instance.add(buf, bufSize);
  }

  /**
   *
   * @param text string
   * @returns the sha1 hash of input string @param text
   *
   * @example sha1.computeHash('hash the world') // hash of string
   */

  computeHash(text: string): string {
    return this.nativeSha256Instance.computeHash(text);
  }
}
