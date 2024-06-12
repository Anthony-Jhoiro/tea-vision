import { Tea } from 'domains';
import { DBSchema, IDBPDatabase, openDB } from 'idb';

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

interface TeaDb extends DBSchema {
  teas: {
    value: Tea;
    key: Tea['id'];
  };
}
async function getDb(): Promise<IDBPDatabase<TeaDb>> {
  return await openDB<TeaDb>('teas', 1, {
    upgrade(db) {
      db.createObjectStore('teas', { keyPath: 'id' });
    },
  });
}

export const createTea = async (body: Omit<Tea, 'id'>): Promise<Tea> => {
  const db = await getDb();

  // const transaction = db.transaction(['teas'], 'readwrite');

  const id = generateTeaId(body);

  const newTea: Tea = {
    ...body,
    id,
  };

  // await transaction.objectStore('teas').put(newTea);
  await db.put('teas', newTea);
  return newTea;
};

export const getTeaById = async (id: Tea['id']): Promise<Tea | null> => {
  const db = await getDb();
  return (await db.get('teas', id)) ?? null;
};

export const listTeas = async (): Promise<Tea[]> => {
  const db = await getDb();
  return await db.getAll('teas');
};
