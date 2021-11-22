//
// Created by henry on 11/17/2021.
//
#include <jsi/jsi.h>
#include <vector>

#include "./sha/sha1.h"

#ifndef EXAMPLE_SHA1HOSTOBJECT_H
#define EXAMPLE_SHA1HOSTOBJECT_H

using namespace facebook;

class JSI_EXPORT Sha1HostObject: public jsi::HostObject{
public:
    jsi::Value get(jsi::Runtime& rt, const jsi::PropNameID& name) override;
    std::vector<jsi::PropNameID> getPropertyNames(jsi::Runtime& rt) override;

private:
    SHA1 sha1;
};

#endif //EXAMPLE_SHA1HOSTOBJECT_H
