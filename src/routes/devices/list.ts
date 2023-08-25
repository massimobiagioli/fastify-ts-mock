import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import {DeviceDtoCollectionType} from "@type/devices.type";

export default async function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
): Promise<void> {
  fastify.get<{ Reply: DeviceDtoCollectionType }>(
    '/',
    async (request, reply) => {
      try {
        const devices = await fastify.listDevices()
        return reply.send(devices)
      } catch (error) {
        request.log.error(error)
        return reply.code(500).send()
      }
    },
  )
}
