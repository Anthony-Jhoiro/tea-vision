import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.get('/api/ping', async function () {
    return { message: 'Hello API' };
  });
}
