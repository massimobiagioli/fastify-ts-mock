# Fastify Typescript Test Mock

## Mock Example:

```bash
import {ImportMock} from "ts-mock-imports";
import * as DeviceLib from '../../../src/lib/devices.lib'
...

const listDevicesMock = ImportMock.mockFunction(
  DeviceLib,
  'listDevices',
  Fixtures.devices
)
  
...

t.ok(listDevicesMock.calledOnce)

ImportMock.restore();  
```

## Wrong Usage

```bash
...

// !!! NOT WORKING !!!
// (Cannot stub non-existent property listDevices)
const listDevicesMock = ImportMock.mockFunction(
  app,
  'listDevices',
  Fixtures.devices
)

...
```