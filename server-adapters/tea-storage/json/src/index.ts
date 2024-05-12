import { TeaStoragePort } from 'tea-storage-port';
import { Tea } from 'domains';
import * as fs from 'node:fs';

type JSONStorageContent = {
  teas: Record<string, Tea>;
};

const JSONFileEncoding = 'utf8';

export const createTeaStorageJson = (fileName: string): TeaStoragePort => {
  function readFile(): JSONStorageContent {
    let fileContent: string;
    try {
      fileContent = fs.readFileSync(fileName, JSONFileEncoding);
      return JSON.parse(fileContent) as JSONStorageContent;
    } catch (err) {
      console.warn(
        'No storage found, will try to create one at next insertion',
      );
      return { teas: {} };
    }
  }

  async function saveTea(tea: Tea): Promise<void> {
    const contentAsJson = readFile();

    contentAsJson.teas[tea.id] = tea;

    fs.writeFileSync(fileName, JSON.stringify(contentAsJson), {
      encoding: JSONFileEncoding,
    });
  }

  async function getTeaById(id: string): Promise<Tea | null> {
    const contentAsJson = readFile();
    return contentAsJson.teas[id] ?? null;
  }

  async function listTeas(): Promise<Tea[]> {
    const contentAsJson = readFile();
    return Object.values(contentAsJson.teas);
  }

  return {
    saveTea,
    getTeaById,
    listTeas,
  };
};
