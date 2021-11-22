/* eslint-disable react-native/no-inline-styles */
//!!!!!!!!Running benchmark may take some time to display results

import React, {useState} from 'react';
import {Button, Text, View, ScrollView} from 'react-native';

import {Buffer} from 'buffer';

import now from 'performance-now';

import {SHA1, SHA256, SHA3} from 'react-native-sha';
import jsSHA from 'jssha';

import {data} from './test.json';

const MetricSection = ({
  jsMetric,
  jsiMetric,
  jsTime = 0,
  jsiTime = 0,
  type,
}) => {
  const performanceRatio = Math.round(jsTime / jsiTime);
  return (
    <View style={{marginVertical: 15}}>
      <Text style={{fontSize: 20}}>{type} metrics</Text>
      <Text style={{fontSize: 18, backgroundColor: 'tomato'}}>
        jsi: {jsiMetric}
      </Text>
      <Text style={{fontSize: 18, backgroundColor: 'pink'}}>
        js: {jsMetric}
      </Text>
      <Text style={{fontSize: 18, backgroundColor: 'orange'}}>
        jsi-time: {jsiTime} ms
      </Text>
      <Text style={{fontSize: 18, backgroundColor: 'green'}}>
        js: {jsTime} ms
      </Text>
      <View style={{marginVertical: 2}} />
      <Text style={{fontSize: 18}}>
        c++ implementation is {performanceRatio} times faster than js
        implementation
      </Text>
    </View>
  );
};

const App = () => {
  const dataToProcess = Buffer.from(data, 'base64').buffer;
  // const [input, setInput] = useState('');
  const [sha1_res, setSha1Res] = useState('');
  const [sha256_res, setSha256Res] = useState('');
  const [sha3_224_res, setSha3_224_res] = useState('');
  const [sha3_256_res, setSha3_256_res] = useState('');
  const [sha3_384_res, setSha3_384_res] = useState('');
  const [sha3_512_res, setSha3_512_res] = useState('');

  const [sha1_res_js, setSha1Res_js] = useState('');
  const [sha256_res_js, setSha256Res_js] = useState('');
  const [sha3_224_res_js, setSha3_224_res_js] = useState('');
  const [sha3_256_res_js, setSha3_256_res_js] = useState('');
  const [sha3_384_res_js, setSha3_384_res_js] = useState('');
  const [sha3_512_res_js, setSha3_512_res_js] = useState('');

  const [sha1JsiTime, setSha1JsiTime] = useState(0);
  const [sha256JsiTime, setSha256JsiTime] = useState(0);
  const [sha3_224_JsiTime, setSha3_224_JsiTime] = useState(0);
  const [sha3_256_JsiTime, setSha3_256_JsiTime] = useState(0);
  const [sha3_384_JsiTime, setSha3_384_JsiTime] = useState(0);
  const [sha3_512_JsiTime, setSha3_512_JsiTime] = useState(0);

  const [sha1JsTime, setSha1JsTime] = useState(0);
  const [sha256JsTime, setSha256JsTime] = useState(0);
  const [sha3_224_JsTime, setSha3_224_JsTime] = useState(0);
  const [sha3_256_JsTime, setSha3_256_JsTime] = useState(0);
  const [sha3_384_JsTime, setSha3_384_JsTime] = useState(0);
  const [sha3_512_JsTime, setSha3_512_JsTime] = useState(0);

  //hashing with c++ bindings
  const sha1 = new SHA1();
  const sha256 = new SHA256();
  const sha3_224 = new SHA3('224');
  const sha3_256 = new SHA3('256');
  const sha3_384 = new SHA3('384');
  const sha3_512 = new SHA3('512');

  //js hashing
  const sha1_ = new jsSHA('SHA-1', 'ARRAYBUFFER', {encoding: 'UTF8'});
  const sha256_ = new jsSHA('SHA-256', 'ARRAYBUFFER', {encoding: 'UTF8'});
  const sha3_224_ = new jsSHA('SHA3-224', 'ARRAYBUFFER', {encoding: 'UTF8'});
  const sha3_256_ = new jsSHA('SHA3-256', 'ARRAYBUFFER', {encoding: 'UTF8'});
  const sha3_384_ = new jsSHA('SHA3-384', 'ARRAYBUFFER', {encoding: 'UTF8'});
  const sha3_512_ = new jsSHA('SHA3-512', 'ARRAYBUFFER', {encoding: 'UTF8'});

  const runBenchmarks = () => {
    let t0;
    let t1;

    //c++ hashing
    t0 = now();
    sha1.add(dataToProcess, dataToProcess.byteLength);
    setSha1Res(sha1.getHash());
    t1 = now();
    setSha1JsiTime(t1 - t0);

    t0 = now();
    sha256.add(dataToProcess, dataToProcess.byteLength);
    setSha256Res(sha256.getHash());
    t1 = now();
    setSha256JsiTime(t1 - t0);

    t0 = now();
    sha3_224.add(dataToProcess, dataToProcess.byteLength);
    setSha3_224_res(sha3_224.getHash());
    t1 = now();
    setSha3_224_JsiTime(t1 - t0);

    t0 = now();
    sha3_256.add(dataToProcess, dataToProcess.byteLength);
    setSha3_256_res(sha3_256.getHash());
    t1 = now();
    setSha3_256_JsiTime(t1 - t0);

    t0 = now();
    sha3_384.add(dataToProcess, dataToProcess.byteLength);
    setSha3_384_res(sha3_384.getHash());
    t1 = now();
    setSha3_384_JsiTime(t1 - t0);

    t0 = now();
    sha3_512.add(dataToProcess, dataToProcess.byteLength);
    setSha3_512_res(sha3_512.getHash());
    t1 = now();
    setSha3_512_JsiTime(t1 - t0);

    //js hashing
    t0 = now();
    sha1_.update(dataToProcess);
    setSha1Res_js(sha1_.getHash('HEX'));
    t1 = now();
    setSha1JsTime(t1 - t0);

    t0 = now();
    sha256_.update(dataToProcess);
    setSha256Res_js(sha256_.getHash('HEX'));
    t1 = now();
    setSha256JsTime(t1 - t0);

    t0 = now();
    sha3_224_.update(dataToProcess);
    setSha3_224_res_js(sha3_224_.getHash('HEX'));
    t1 = now();
    setSha3_224_JsTime(t1 - t0);

    t0 = now();
    sha3_256_.update(dataToProcess);
    setSha3_256_res_js(sha3_256_.getHash('HEX'));
    t1 = now();
    setSha3_256_JsTime(t1 - t0);

    t0 = now();
    sha3_384_.update(dataToProcess);
    setSha3_384_res_js(sha3_384_.getHash('HEX'));
    t1 = now();
    setSha3_384_JsTime(t1 - t0);

    t0 = now();
    sha3_512_.update(dataToProcess);
    setSha3_512_res_js(sha3_512_.getHash('HEX'));
    t1 = now();
    setSha3_512_JsTime(t1 - t0);
  };

  return (
    <ScrollView horizontal={false}>
      <Button title="run benchmarks" onPress={runBenchmarks} />

      <MetricSection
        type="SHA1"
        jsMetric={sha1_res_js}
        jsiMetric={sha1_res}
        jsiTime={sha1JsiTime}
        jsTime={sha1JsTime}
      />
      <MetricSection
        type="SHA256"
        jsMetric={sha256_res_js}
        jsiMetric={sha256_res}
        jsiTime={sha256JsiTime}
        jsTime={sha256JsTime}
      />
      <MetricSection
        type="SHA3-224"
        jsMetric={sha3_224_res_js}
        jsiMetric={sha3_224_res}
        jsiTime={sha3_224_JsiTime}
        jsTime={sha3_224_JsTime}
      />
      <MetricSection
        type="SHA3-256"
        jsMetric={sha3_256_res_js}
        jsiMetric={sha3_256_res}
        jsiTime={sha3_256_JsiTime}
        jsTime={sha3_256_JsTime}
      />
      <MetricSection
        type="SHA3-384"
        jsMetric={sha3_384_res_js}
        jsiMetric={sha3_384_res}
        jsiTime={sha3_384_JsiTime}
        jsTime={sha3_384_JsTime}
      />
      <MetricSection
        type="SHA3-512"
        jsMetric={sha3_512_res_js}
        jsiMetric={sha3_512_res}
        jsiTime={sha3_512_JsiTime}
        jsTime={sha3_512_JsTime}
      />
    </ScrollView>
  );
};

export default App;
