//
// Created by henry on 11/17/2021.
//
#include <jsi/jsi.h>
#include <vector>

#include "./sha/sha3.h"

#ifndef EXAMPLE_SHA3HOSTOBJECT_H
#define EXAMPLE_SHA3HOSTOBJECT_H

using namespace facebook;

class JSI_EXPORT Sha3HostObject: public jsi::HostObject{
public:
    Sha3HostObject();
    Sha3HostObject(std::string bitVersion);
    jsi::Value get(jsi::Runtime& rt, const jsi::PropNameID& name) override;
    std::vector<jsi::PropNameID> getPropertyNames(jsi::Runtime& rt) override;

private:
    SHA3 sha3;
};

#endif //EXAMPLE_SHA3HOSTOBJECT_H
