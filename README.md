# React Native SHA library⚡⚡⚡

React-native-sha is a blazing fast⚡ solution for performing Secure Hashing
Algorithm in React Native. Main reason this library is incredibly fast is
because it provides bindings to a C++ implementation of the hashing algorithm
through the Javascript Interface (JSI).

⚠️⚠️⚠️ This library currently has support for android only. IOS
developers (mainly ObjC) needed to add support for IOS.

## Features

- Support for **_SHA-1, SHA-256, SHA3-224, SHA3-256, SHA3-384, SHA3-512_**
- Direct bindings to C++ library, hence ⚡⚡⚡
- **_Synchronous_** function calls
- **_160x faster_** than current popular solutions
- Supports compounded hashing of byte chunks

```typescript
SHA256 sha256 = new SHA256();
while(data is available) {
  sha256.add(chunk, chunk size)
}

sha256.gethash(); //sha-256 of entire data
```

## Benchmarks

![alt text](https://github.com/henrhie/react-native-sha/img/matter/SHA-1.png?raw=true)

## Installation

Installing react-native-sha with npm

```bash
  npm install react-native-sha
```

JSI is still in an experimental stage and hence a little workaround
is required to link the library to your project. The facebook team is working
on a feature, Turbo modules which will autolink your JSI modules.

```java
import com.facebook.react.bridge.JSIModulePackage;
import com.reactnativesha.ShaJsiPackage;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {

        ///....

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }


        // Add this method to your MainApplication

        @Nullable
        @Override
        protected JSIModulePackage getJSIModulePackage() {
          return new ShaJsiPackage();
        }
      };
```

## API Reference

#### All classes implement the Hash interface.

```typescript
interface HashInterface {
  getHash: () => string;
  add: (buf: ArrayBuffer, bufSize: number) => void;
  reset: () => void;
  computeHash: (text: string) => string;
}
```

| Function        | Parameters                         | Description                                                                             |
| :-------------- | :--------------------------------- | :-------------------------------------------------------------------------------------- |
| `getHash()`     | `none`                             | Returns the latest hash as string                                                       |
| `add()`         | `buf: ArrayBuffer bufSize: number` | adds abitrary number of bytes as ArrayBuffer. Support for more byte formats coming soon |
| `reset()`       | `none`                             | flushes added bytes out of memory                                                       |
| `computeHash()` | `text: string`                     | Accepts a string and returns its hash as a string                                       |

## Examples

```typescript
import { SHA256 } from 'react-native-sha';
import { Buffer } from 'buffer'; //needs to be installed in RN environment
import { data } from './test.json';

const sha256 = new SHA256();
sha256.computeHash('hash the world'); //33e9b48e6afb96bc6195f02102831b37c9cebbdacf9173df1881b9a7764444ae

const dataToProcess = Buffer.from(data, 'base64').buffer; //ArrayBuffer
sha256.add(dataToProcess, dataToProcess.byteLength);
sha256.getHash(); // hash of data

sha256.reset(); //flushes hash out of memory
```

#### SHA-3 with different variants

```typescript
const sha3_256 = new SHA3('256');
sha3_256.computeHash('hash the world'); //623734226db189364e8a996cf05936b1b42cd8cfc9247040fd61d571

// same api as rest of the classes
```

## Credits

- C++ implementation is based on [**Stephan Brumme's portable C++ library**](https://github.com/stbrumme/hash-library)
- Several references were made from [**mrousavy's react native mmkv library**](https://github.com/mrousavy/react-native-mmkv)

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

## License

[MIT](https://choosealicense.com/licenses/mit/)
