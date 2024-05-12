import { z } from 'zod';
import { teaTypes } from 'domains';

export const newTeaFormSchema = z.object({
  imageUrl: z.any(),
  name: z.string().min(1),
  description: z.string(),
  brand: z.string().min(1),
  minimumBrewingTimeInMinutes: z.preprocess(
    (n) => parseInt(n as string),
    z.coerce.number().min(0).int(),
  ),
  maximumBrewingTimeInMinutes: z.preprocess(
    (n) => parseInt(n as string),
    z.coerce.number().min(0).int(),
  ),
  brewingTemperature: z.number().min(0).max(100).int(),
  type: z.enum(teaTypes),
});

export type NewTeaFormSchema = z.infer<typeof newTeaFormSchema>;

export type InProgressNewTeaForm = {
  [key in keyof NewTeaFormSchema]: NewTeaFormSchema[key] | null;
};

export const defaultNewTeaFormValues: InProgressNewTeaForm = {
  name: '',
  brand: '',
  description: '',
  minimumBrewingTimeInMinutes: 4,
  maximumBrewingTimeInMinutes: 4,
  brewingTemperature: 90,
  type: null,
  imageUrl: null,
};
