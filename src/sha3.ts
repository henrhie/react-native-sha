/* eslint-disable prettier/prettier */
import type { HashInterface } from './hash';

type BitVersion = '224' | '256' | '384' | '512';

declare global {
  function sha3(bitVersion?: string): HashInterface;
}

export class SHA3 implements HashInterface {
  private nativeSha3Instance: HashInterface;

  /**
   * @param bitVersion is one of 224, 256, 384 and 512 - indicates bit size of output
   * Instantiates native c++ implementation of SHA1 as host object
   * @returns reference to instantiated host object
   */

  constructor(bitVersion?: BitVersion) {
    this.nativeSha3Instance = sha3(bitVersion);
  }

  /**
   *
   * @returns the latest hex hash as string
   * @example sha3_256.getHash() //33e9b48e6afb96bc6195f02102831b37c9cebbdacf9173df1881b9a7764444ae
   */

  getHash(): string {
    return this.nativeSha3Instance.getHash();
  }

  /**
   * flushes latest hash out of memory
   * @example sha3_256.reset()
   */

  reset(): void {
    this.nativeSha3Instance.reset();
  }

  /**
   *
   * @param buf ArrayBuffer
   * @param bufSize number
   * adds abitrary number of bytes as ArrayBuffer
   * @example sha3_256.add(dataToProcess, dataToProcess.byteLength)
   */

  add(buf: ArrayBuffer, bufSize: number): void {
    this.nativeSha3Instance.add(buf, bufSize);
  }

  /**
   *
   * @param text string
   * @returns the sha3 hash of input string @param text
   *
   * @example sha3_256.computeHash('hash the world') // hash of string
   */

  computeHash(text: string): string {
    return this.nativeSha3Instance.computeHash(text);
  }
}
