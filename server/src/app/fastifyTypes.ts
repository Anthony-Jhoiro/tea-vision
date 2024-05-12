import { FastifyInstance } from 'fastify';
import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify/types/utils';
import { FastifyBaseLogger } from 'fastify/types/logger';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export type ServerFastifyInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  ZodTypeProvider
>;
