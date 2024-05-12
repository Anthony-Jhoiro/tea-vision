import { Tea } from 'domains';

export interface TeaStoragePort {
  saveTea(tea: Tea): Promise<void>;
  listTeas(): Promise<Tea[]>;
  getTeaById(id: Tea['id']): Promise<Tea | null>;
}
