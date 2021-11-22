#include <jni.h>
#include <jsi/jsi.h>
// #include "react-native-sha.h"
#include "installHostObjects.h"

extern "C"
JNIEXPORT void JNICALL
Java_com_reactnativesha_ShaModule_nativeInstall(JNIEnv *env, jclass type, jlong jsiPtr) {
    auto runtime = reinterpret_cast<facebook::jsi::Runtime*>(jsiPtr);

    if(runtime) {
        installHostObjects(*runtime);
    }
}
