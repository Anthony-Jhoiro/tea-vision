import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { TeaType, teaTypes } from 'domains';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';

const OpenAITeaSchema = z.object({
  name: z.string(),
  brand: z.string(),
  description: z.string(),
  minimumBrewingTimeInMinutes: z.number(),
  maximumBrewingTimeInMinutes: z.number(),
  brewingTemperature: z.number(),
  type: z.enum<TeaType, typeof teaTypes>(teaTypes),
});

export default async function (fastify: FastifyInstance) {
  fastify.post('/readImage', async function (request, reply) {
    const file = await request.file();

    const chat = new ChatOpenAI({
      model: 'gpt-4-vision-preview',
      maxTokens: 1024,
    }).withStructuredOutput(OpenAITeaSchema);

    const fileBuffer = await file.toBuffer();

    const userMessage = new HumanMessage({
      content: [
        {
          type: 'text',
          text: 'What infos can you find in this image',
        },
        {
          type: 'image_url',
          image_url: {
            url: `data:image/jpeg;base64,${fileBuffer.toString('base64')}`,
          },
        },
      ],
    });

    return await chat.invoke([userMessage]);
  });
}
