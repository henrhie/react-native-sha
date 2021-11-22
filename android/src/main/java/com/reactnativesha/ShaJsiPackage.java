package com.reactnativesha;

import com.facebook.react.bridge.JSIModulePackage;
import com.facebook.react.bridge.JSIModuleSpec;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.JavaScriptContextHolder;
import java.util.Collections;
import java.util.List;

public class ShaJsiPackage implements JSIModulePackage {

  @Override
  public List<JSIModuleSpec> getJSIModules(
    final ReactApplicationContext rtcContext,
    final JavaScriptContextHolder jsContext
  ) {
    ShaModule.install(jsContext);
    return Collections.emptyList();
  }
}
