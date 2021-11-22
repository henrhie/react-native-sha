#include "Sha256HostObject.h"
#include "Sha1HostObject.h"
#include "Sha3HostObject.h"

using namespace facebook;

void installHostObjects(jsi::Runtime& rt) {
  auto sha256 = jsi::Function::createFromHostFunction(
    rt,
    jsi::PropNameID::forAscii(rt, "sha256"),
    0,
    [](jsi::Runtime& runtime, const jsi::Value& thisValue, const jsi::Value* args, size_t count) -> jsi::Value {
      auto sha256Instance = std::make_shared<Sha256HostObject>();
      return jsi::Object::createFromHostObject(runtime, sha256Instance);
    }
  );
  //set sha256 on global object
  rt.global().setProperty(rt, "sha256", std::move(sha256));


  auto sha1 = jsi::Function::createFromHostFunction(
    rt,
    jsi::PropNameID::forAscii(rt, "sha1"),
    0,
    [](jsi::Runtime& runtime, const jsi::Value& thisValue, const jsi::Value* args, size_t count) -> jsi::Value {
      auto sha1Instance = std::make_shared<Sha1HostObject>();
      return jsi::Object::createFromHostObject(runtime, sha1Instance);
    }
  );
  //set sha1 on global object
  rt.global().setProperty(rt, "sha1", std::move(sha1));


  auto sha3 = jsi::Function::createFromHostFunction(
    rt,
    jsi::PropNameID::forAscii(rt, "sha3"),
    1,
    [](jsi::Runtime& runtime, const jsi::Value& thisValue, const jsi::Value* args, size_t count) -> jsi::Value {
      if(!args[0].isString() || count > 1) {
        throw jsi::JSError(runtime, "sha3 / invalid params");
      }
      std::string bitVersion = args[0].asString(runtime).utf8(runtime);
      auto sha3Instance = std::make_shared<Sha3HostObject>(bitVersion);
      return jsi::Object::createFromHostObject(runtime, sha3Instance);
    }
  );
  //set sha3 on global object
  rt.global().setProperty(rt, "sha3", std::move(sha3));
}