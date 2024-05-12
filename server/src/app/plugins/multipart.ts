import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import multipart from '@fastify/multipart';

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp(async function (fastify: FastifyInstance) {
  return fastify.register(multipart, {
    limits: {
      fileSize: 16 * 1024 * 1024, // Max file size = 16Mo
      files: 1,
    },
  });
});
