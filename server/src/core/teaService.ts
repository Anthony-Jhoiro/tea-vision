import { TeaStoragePort } from 'tea-storage-port';
import { Tea } from 'domains';

/**
 * Simplify the given string:
 * - remove accents
 * - lowercase
 * - transform all non-alphanumeric characters into dashes
 *
 * @param baseString the string to transform
 */
function simplifyString(baseString: string): string {
  // This removes accents
  const withoutAccents = baseString
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return withoutAccents.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

function generateTeaId(tea: Pick<Tea, 'brand' | 'name'>): string {
  return `${simplifyString(tea.brand)}_${simplifyString(tea.name)}`;
}

export const createTeaService = (teaStorage: TeaStoragePort) => {
  async function createTea(teaWithoutId: Omit<Tea, 'id'>) {
    const tea: Tea = {
      ...teaWithoutId,
      id: generateTeaId(teaWithoutId),
    };

    await teaStorage.saveTea(tea);
    return tea;
  }

  async function getTeaById(id: string): Promise<Tea | null> {
    return teaStorage.getTeaById(id);
  }

  async function listAllTeas(): Promise<Tea[]> {
    return teaStorage.listTeas();
  }

  return {
    createTea,
    getTeaById,
    listAllTeas,
  };
};
