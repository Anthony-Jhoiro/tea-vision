import {
  createMutation,
  type CreateMutationOptions,
} from '@tanstack/svelte-query';
import { NewTeaFormSchema } from 'client-content-forms';
import { Tea } from 'domains';
//@ts-expect-error vite based env variable are somehow not recognized
export const API_ENDPOINT = import.meta.env.DEV
  ? 'http://localhost:3001/api'
  : '/api';

export const useReadFile = (
  opts?: CreateMutationOptions<NewTeaFormSchema, Error, File>,
) =>
  createMutation<NewTeaFormSchema, Error, File>({
    ...opts,
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      const r = await fetch(API_ENDPOINT + '/readImage', {
        method: 'POST',
        body: formData,
      });
      return await r.json();
    },
  });

export const listTeas = (): Promise<Tea[]> =>
  fetch(API_ENDPOINT + '/teas').then((r) => r.json());
export const getTeaById = (id: Tea['id']): Promise<Tea> =>
  fetch(API_ENDPOINT + '/teas/' + id).then((r) => r.json());
export const createTea = (body: Omit<Tea, 'id'>): Promise<Tea> =>
  fetch(API_ENDPOINT + '/teas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((r) => r.json());
