# mobileMotion

## Introduction
A simple cordova application to send accelerometer and gyroscope data of your android device to MQTT broker.

## Installation

### Dependency Installation
``` bash
# npm
npm install
// OR
# yarn
yarn install
```

``` bash
corodva platform add android
```

### Configuration
User can configure different MQTT settings in the file ./www/config.js
```
const config = {
  mqttServer: 'localhost',
  port: 1883,
  clientId: '2fb0b94a-6521-4a4c-8d36-4e70600bb56c',
  accelerometerTopic: '/i5/mobileMotion/accelerometer',
  gyroscopeTopic: '/i5/mobileMotion/gyroscope',
};
```

## Running

``` bash
corodva run android --device
```
Copyright (c) 2018-present, ACIS RWTH Aachen.
