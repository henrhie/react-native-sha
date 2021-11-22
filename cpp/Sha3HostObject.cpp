//
// Created by henry on 11/17/2021.
//
#include "Sha3HostObject.h"
#include "utils.h"

std::vector<jsi::PropNameID> Sha3HostObject::getPropertyNames(jsi::Runtime& rt) {
    std::vector<jsi::PropNameID> props;
    props.push_back(jsi::PropNameID::forUtf8(rt, std::string("add")));
    props.push_back(jsi::PropNameID::forUtf8(rt, std::string("getHash")));
    props.push_back(jsi::PropNameID::forUtf8(rt, std::string("reset")));
    props.push_back(jsi::PropNameID::forUtf8(rt, std::string("computeHash")));
    return props;
}

Sha3HostObject::Sha3HostObject() {
  sha3 = SHA3(SHA3::Bits256);
}

Sha3HostObject::Sha3HostObject(std::string bitVersion) {
  SHA3::Bits bits = SHA3::Bits256;
  if(bitVersion == std::string("224")) {
    bits = SHA3::Bits224;
  }
  else if(bitVersion == std::string("384")) {
    bits = SHA3::Bits384;
  }
  else if(bitVersion == std::string("512")) {
    bits = SHA3::Bits512;
  }
  sha3 = SHA3(bits);
}

jsi::Value Sha3HostObject::get(jsi::Runtime& rt, const jsi::PropNameID& name) {
    auto _propName = name.utf8(rt);
    auto funcName = "SHA3."+_propName;

    if(_propName == "add") {
        return jsi::Function::createFromHostFunction(
                rt,
                jsi::PropNameID::forAscii(rt, funcName),
                2, //buffer, buffer size
                [this](jsi::Runtime& runtime, const jsi::Value& thisValue, const jsi::Value* args, size_t count) -> jsi::Value {
                    uint8_t* data;
                    if(!ValueToUint8_t(runtime, args[0], data) || !args[1].isNumber()) {
                        throw jsi::JSError(runtime, "sha3 / invalid params");
                    }
                    auto bufSize = (size_t)args[1].asNumber();
                    sha3.add(data, bufSize);
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
                    std::string hashString = sha3.getHash();
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
                    sha3.reset();
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
                        throw jsi::JSError(runtime, "sha3 / invalid params");
                    }

                    std::string hashString = sha3(text);
                    return jsi::Value(jsi::String::createFromUtf8(runtime, hashString));
                }
        );
    }

    return jsi::Value::undefined();
}

