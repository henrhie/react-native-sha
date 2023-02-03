project("react native hash")
cmake_minimum_required(VERSION 3.4.1)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 11)

add_library(cpp
            SHARED
            ../../react-native/ReactCommon/jsi/jsi/jsi.cpp
            ../cpp/sha/sha1.cpp
            ../cpp/sha/sha256.cpp
            ../cpp/sha/sha3.cpp
            ../cpp/Sha256HostObject.cpp
            ../cpp/Sha1HostObject.cpp
            ../cpp/Sha3HostObject.cpp
            ../cpp/installHostObjects.cpp
            ../cpp/utils.cpp
            cpp-adapter.cpp
)

# Specifies a path to native header files.
include_directories(
            ../cpp
            ../../react-native/React
            ../../react-native/React/Base
            ../../react-native/ReactCommon/jsi
)

target_link_libraries(cpp android log)
