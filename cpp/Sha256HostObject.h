#include <jsi/jsi.h>
#include <vector>

#include "./sha/sha256.h"

using namespace facebook;

class JSI_EXPORT Sha256HostObject: public jsi::HostObject {
  public:
    jsi::Value get(jsi::Runtime&rt, const jsi::PropNameID& name) override;
    std::vector<jsi::PropNameID> getPropertyNames(jsi::Runtime& rt) override;

  private:
    SHA256 sha256;
};