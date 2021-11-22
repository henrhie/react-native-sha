//
// Created by henry on 11/20/2021.
//

#include <jsi/jsi.h>

#ifndef EXAMPLE_UTILS_H
#define EXAMPLE_UTILS_H

using namespace facebook;

bool ValueToUint8_t(jsi::Runtime& rt, const jsi::Value& value, uint8_t*& data);

bool valueToString(jsi::Runtime& rt, const jsi::Value& value, std::string* str);

#endif //EXAMPLE_UTILS_H
