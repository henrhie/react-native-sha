//
// Created by henry on 11/17/2021.
//
#include "utils.h"

using namespace facebook;

bool ValueToUint8_t(jsi::Runtime& rt, const jsi::Value& value, uint8_t*& data) {
    if(value.isObject()) {
        auto obj = value.asObject(rt);
        if(!obj.isArrayBuffer(rt)) {
            return false;
        }

        auto buf = obj.getArrayBuffer(rt);
        data = buf.data(rt);
        return true;
    }
    return false;
}

bool valueToString(jsi::Runtime& rt, const jsi::Value& value, std::string* str) {
    if(value.isString()) {
        *str =value.asString(rt).utf8(rt);
        return true;
    }

    if(value.isObject()) {
        auto obj = value.asObject(rt);
        if(!obj.isArrayBuffer(rt))  {
            return false;
        }
        auto buf = obj.getArrayBuffer(rt);
        *str = std::string((char*)buf.data(rt), buf.size(rt));
        return true;
    }
    return false;
}

