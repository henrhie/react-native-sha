#include "Sha256HostObject.h"

#include "utils.h"

std::vector<jsi::PropNameID> Sha256HostObject::getPropertyNames(jsi::Runtime& rt) {
  std::vector<jsi::PropNameID> props;
  props.push_back(jsi::PropNameID::forUtf8(rt, std::string("add")));
  props.push_back(jsi::PropNameID::forUtf8(rt, std::string("getHash")));
  props.push_back(jsi::PropNameID::forUtf8(rt, std::string("reset")));
  props.push_back(jsi::PropNameID::forUtf8(rt, std::string("computeHash")));
  return props;
}

jsi::Value Sha256HostObject::get(jsi::Runtime& rt, const jsi::PropNameID& name) {
  auto _propName = name.utf8(rt);
  auto funcName = "SHA256."+_propName;

  if(_propName == "add") {
    return jsi::Function::createFromHostFunction(
      rt,
      jsi::PropNameID::forAscii(rt, funcName),
      2, //buffer, buffer size
      [this](jsi::Runtime& runtime, const jsi::Value& thisValue, const jsi::Value* args, size_t count) -> jsi::Value {
        uint8_t* data;
        if(!ValueToUint8_t(runtime, args[0], data) || !args[1].isNumber()) {
          throw jsi::JSError(runtime, "sha256 / invalid params");
        }
        auto bufSize = (size_t)args[1].asNumber();
        sha256.add(data, bufSize);
        return jsi::Value::undefined();
      }
    );
  }


  if(_propName == "getHash") {
    return jsi::Function::createFromHostFunction(
      rt,
      jsi::PropNameID::forAscii(rt, funcName),
      0,
      [this](jsi::Runtime& runtime, const jsi::Value& thisValue, const jsi::Value* args, size_t count) -> jsi::Value {
        std::string hashString = sha256.getHash();
        return jsi::Value(jsi::String::createFromUtf8(runtime, hashString));
      }
    );
  }


  if(_propName == "reset") {
    return jsi::Function::createFromHostFunction(
      rt,
      jsi::PropNameID::forAscii(rt, funcName),
      0,
      [this](jsi::Runtime& runtime, const jsi::Value& thisValue, const jsi::Value* args, size_t count) -> jsi::Value {
        sha256.reset();
        return jsi::Value::undefined();
      }
    );
  }

  if(_propName == "computeHash") {
    return jsi::Function::createFromHostFunction(
      rt,
      jsi::PropNameID::forAscii(rt, funcName),
      1,
      [this](jsi::Runtime& runtime, const jsi::Value& thisValue, const jsi::Value* args, size_t count) -> jsi::Value {
        std::string text;
        if(!valueToString(runtime, args[0], &text)) {
          throw jsi::JSError(runtime, "sha256 / invalid params");
        }

        std::string hashString = sha256(text);
        return jsi::Value(jsi::String::createFromUtf8(runtime, hashString));
      }
    );
  }

  return jsi::Value::undefined();
}