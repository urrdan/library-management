import {
  checkRecordExists,
  createRecordOperation,
  deleteRecord,
  updateRecordOperation,
} from "../utils/records-operations";
import {
  readStorage,
  writeStorage,
  type StorageSchema,
} from "../utils/storage-operations";
import { messages } from "../utils/constants";
import { delay } from "../utils/delay";
import { NotFoundError, rethrowBusinessError } from "../utils/error";

type RecordOf<K extends keyof StorageSchema> = StorageSchema[K][number];
type FieldsOf<K extends keyof StorageSchema> = Omit<RecordOf<K>, "id">;

export type CrudController<Record_, Editable> = {
  getAll: () => Promise<Record_[]>;
  create: (record: Editable) => Promise<string>;
  update: (id: string, updatedFields: Partial<Editable>) => Promise<string>;
  remove: (id: string) => Promise<string>;
};

/**
 * Builds the CRUD controllers of a resource on top of the mock storage.
 * `Editable` are the fields a client may send; `systemFields` supplies the
 * remaining ones on creation, e.g. `customerSince` or a default role.
 */
export function createCrudController<
  K extends keyof StorageSchema,
  Editable = FieldsOf<K>,
>(
  storageKey: K,
  systemFields: () => Partial<FieldsOf<K>> = () => ({}),
): CrudController<RecordOf<K>, Editable> {
  const read = () => readStorage(storageKey) as RecordOf<K>[];
  const write = (records: RecordOf<K>[]) =>
    writeStorage(storageKey, records as StorageSchema[K]);

  const getAll = async () => {
    try {
      await delay();
      return read();
    } catch (error) {
      rethrowBusinessError(error, messages.getError);
    }
  };

  const create = async (record: Editable) => {
    try {
      await delay();
      const created: object = { ...record, ...systemFields() };
      const records = read() as ({ id: string } & object)[];
      write(createRecordOperation<object>(records, created) as RecordOf<K>[]);
      return messages.postSuccess;
    } catch (error) {
      rethrowBusinessError(error, messages.postError);
    }
  };

  const update = async (id: string, updatedFields: Partial<Editable>) => {
    try {
      await delay();
      const records = read();
      if (!checkRecordExists(records, id))
        throw new NotFoundError(messages.notFound);
      write(
        updateRecordOperation(
          records,
          id,
          updatedFields as Partial<Omit<RecordOf<K>, "id">>,
        ),
      );
      return messages.updateSuccess;
    } catch (error) {
      rethrowBusinessError(error, messages.updateError);
    }
  };

  const remove = async (id: string) => {
    try {
      await delay();
      const records = read();
      if (!checkRecordExists(records, id))
        throw new NotFoundError(messages.notFound);
      write(deleteRecord(records, id));
      return messages.deleteSuccess;
    } catch (error) {
      rethrowBusinessError(error, messages.deleteError);
    }
  };

  return { getAll, create, update, remove };
}
