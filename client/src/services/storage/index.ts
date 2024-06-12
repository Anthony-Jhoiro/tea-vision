import {
  createMutation,
  CreateMutationOptions,
  createQuery,
} from '@tanstack/svelte-query';
import { Tea } from 'domains';
import { createTea, getTeaById, listTeas } from './indexdb/teaIndexDbStorage';

const keysQueryKey = 'teas';

export const useListTeas = () =>
  createQuery<Tea[], Error, Tea[]>({
    queryKey: [keysQueryKey],
    queryFn: listTeas,
  });

export const useGetTeaById = (id: Tea['id']) =>
  createQuery<Tea | null, Error, Tea | null>({
    queryKey: [keysQueryKey, id],
    queryFn: () => getTeaById(id),
  });

export const useCreateTea = (
  opts?: CreateMutationOptions<Tea, Error, Omit<Tea, 'id'>>,
) =>
  createMutation<Tea, Error, Omit<Tea, 'id'>>({
    ...opts,
    mutationKey: [keysQueryKey],
    mutationFn: createTea,
  });
