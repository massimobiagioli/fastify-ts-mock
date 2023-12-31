import {afterEach, test} from "tap"
import createApp from "@src/app";
import {ImportMock} from "ts-mock-imports";
import * as DeviceLib from '@lib/devices.lib'
import * as Fixtures from '@test/fixtures'
import {DeviceDtoCollectionType} from "@type/devices.type";

afterEach(() => {
  ImportMock.restore();
})

test('get all devices', async t => {
  const app = createApp({
    logger: false,
  })

  t.teardown(() => {
    app.close();
  })

  const listDevicesMock = ImportMock.mockFunction(
      DeviceLib,
      'listDevices',
      Fixtures.devices
  )

  // !!! NOT WORKING !!!
  // (Cannot stub non-existent property listDevices)
  // const listDevicesMock = ImportMock.mockFunction(
  //     app,
  //     'listDevices',
  //     Fixtures.devices
  // )

  const response = await app.inject({
    method: 'GET',
    url: '/api/devices',
  })

  const deviceCollection = response.json<DeviceDtoCollectionType>()

  t.equal(response.statusCode, 200)
  t.equal(deviceCollection.length, 2)

  t.ok(deviceCollection[0].id)
  t.equal(deviceCollection[0].name, 'Device 1')
  t.equal(deviceCollection[0].address, '10.0.0.1')
  t.equal(deviceCollection[0].isActive, true)

  t.ok(deviceCollection[1].id)
  t.equal(deviceCollection[1].name, 'Device 2')
  t.equal(deviceCollection[1].address, '10.0.0.2')
  t.equal(deviceCollection[1].isActive, false)

  t.ok(listDevicesMock.calledOnce)
})
