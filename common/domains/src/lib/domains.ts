import { number } from 'zod';

export const teaTypes = [
  'black_tea',
  'white_tea',
  'green_tea',
  'rooibos',
  'herbal tea',
] as const;

export type TeaType = (typeof teaTypes)[number];

export type Tea = {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  brand: string;
  minimumBrewingTimeInMinutes: number;
  maximumBrewingTimeInMinutes: number;
  brewingTemperatureInCelsius: number;
  type: TeaType;
};
