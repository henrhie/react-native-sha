/* eslint-disable prettier/prettier */
import type { HashInterface } from './hash';

declare global {
  function sha1(): HashInterface;
}

export class SHA1 implements HashInterface {
  private nativeSha1Instance: HashInterface;

  /**
   * Instantiates native c++ implementation of SHA1 as host object
   * @returns reference to instantiated host object
   */

  constructor() {
    this.nativeSha1Instance = sha1();
  }
  /**
   *
   * @returns the latest hex hash as string
   * @example sha1.getHash() //33e9b48e6afb96bc6195f02102831b37c9cebbdacf9173df1881b9a7764444ae
   */

  getHash(): string {
    return this.nativeSha1Instance.getHash();
  }

  /**
   * flushes latest hash out of memory
   * @example sha1.reset()
   */

  reset(): void {
    this.nativeSha1Instance.reset();
  }

  /**
   *
   * @param buf ArrayBuffer
   * @param bufSize number
   * adds abitrary number of bytes as ArrayBuffer
   * @example sha1.add(dataToProcess, dataToProcess.byteLength)
   */

  add(buf: ArrayBuffer, bufSize: number): void {
    this.nativeSha1Instance.add(buf, bufSize);
  }

  /**
   *
   * @param text string
   * @returns the sha1 hash of input string @param text
   *
   * @example sha1.computeHash('hash the world') // hash of string
   */

  computeHash(text: string): string {
    return this.nativeSha1Instance.computeHash(text);
  }
}
