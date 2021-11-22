package com.reactnativesha;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = ShaModule.NAME)
public class ShaModule extends ReactContextBaseJavaModule {
    public static final String NAME = "Sha";

    public ShaModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    static {
        try {
            // Used to load the 'native-lib' library on application startup.
            System.loadLibrary("cpp");
        } catch (Exception ignored) {
        }
    }

    public static native void nativeInstall(long jsiPtr);

    public static void install(JavaScriptContextHolder jsContext) {
        if(jsContext.get() != 0) {
            ShaModule.nativeInstall(jsContext.get());
        }
    }
}
