import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async function (_, reply) {
    return reply.sendFile('index.html');
  });
}
