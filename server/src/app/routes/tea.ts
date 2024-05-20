import { ServerFastifyInstance } from '../fastifyTypes';
import { z } from 'zod';
import { Tea, TeaType, teaTypes } from 'domains';
import { createTeaService } from '../../core/teaService';
import { createTeaStorageJson } from 'tea-storage-json';

const TeaIdSchema = z.string();

const TeaSchema = z.object({
  id: TeaIdSchema,
  name: z.string(),
  brand: z.string(),
  description: z.string(),
  minimumBrewingTimeInMinutes: z.number(),
  maximumBrewingTimeInMinutes: z.number(),
  brewingTemperature: z.number(),
  type: z.enum<TeaType, typeof teaTypes>(teaTypes),
  imageUrl: z.any().optional(),
});

const CreateTeaSchema = TeaSchema.omit({ id: true });

export default async function (fastify: ServerFastifyInstance) {
  fastify.get(
    '/api/teas',
    {
      schema: {
        response: {
          200: z.object({
            items: z.array(TeaSchema),
          }),
        },
      },
    },
    async (req, res) => {
      const teaService = createTeaService(
        createTeaStorageJson('./storage.json'),
      );

      const allTeas = await teaService.listAllTeas();

      return {
        items: allTeas,
      };
    },
  );

  fastify.post(
    '/api/teas',
    {
      schema: {
        body: CreateTeaSchema,
        response: {
          200: TeaSchema,
        },
      },
    },
    async (req, res) => {
      const teaService = createTeaService(
        createTeaStorageJson('./storage.json'),
      );

      return teaService.createTea(req.body as Omit<Tea, 'id'>);
    },
  );

  fastify.get(
    '/api/teas/:id',
    {
      schema: {
        querystring: z.object({
          id: TeaIdSchema,
        }),
        response: {
          200: TeaSchema,
        },
      },
    },
    async (req, res) => {
      const teaService = createTeaService(
        createTeaStorageJson('./storage.json'),
      );

      return teaService.getTeaById(req.query.id);
    },
  );
}
