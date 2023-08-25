import fp from 'fastify-plugin'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import * as DeviceLib from '@lib/devices.lib'
import {DeviceDtoCollectionType} from "@type/devices.types";

declare module 'fastify' {
  interface FastifyInstance {
    listDevices: () => Promise<DeviceDtoCollectionType>
  }
}

async function listDevicesPlugin(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  const listDevices = async (): Promise<DeviceDtoCollectionType> => DeviceLib.listDevices()

  fastify.decorate('listDevices', listDevices)
}

export default fp(listDevicesPlugin)
