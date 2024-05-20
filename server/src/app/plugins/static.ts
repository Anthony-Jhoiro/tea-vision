import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import staticPlugin from '@fastify/static';
import * as path from 'node:path';

export default fp(async function (fastify: FastifyInstance) {
  return fastify.register(staticPlugin, {
    root: path.join(__dirname, '..', '..', '..', '..', 'client-dist'),
  });
});
