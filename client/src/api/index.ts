import {
  createMutation,
  type CreateMutationOptions,
  createQuery,
} from '@tanstack/svelte-query';
import { NewTeaFormSchema } from 'client-content-forms';
import { Tea } from 'domains';

export const API_ENDPOINT = 'http://localhost:3001/api';

const keysQueryKey = 'teas';

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

export const useListTeas = () =>
  createQuery<void, Error, Tea[]>({
    queryKey: [keysQueryKey],
    queryFn: async () => {
      const r = await fetch(API_ENDPOINT + '/teas');
      return await r.json();
    },
  });

export const useGetTeaById = (id: Tea['id']) =>
  createQuery<void, Error, Tea>({
    queryKey: [keysQueryKey],
    queryFn: async () => {
      const r = await fetch(API_ENDPOINT + '/teas/' + id);
      return await r.json();
    },
  });

export const useCreateTea = (
  opts?: CreateMutationOptions<Tea, Error, Omit<Tea, 'id'>>,
) =>
  createMutation<Tea, Error, Omit<Tea, 'id'>>({
    ...opts,
    mutationKey: [keysQueryKey],
    mutationFn: async (body) => {
      const r = await fetch(API_ENDPOINT + '/teas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const responseBody = await r.json();

      if (!r.ok) {
        throw new Error(responseBody.message);
      }
      return await responseBody;
    },
  });
