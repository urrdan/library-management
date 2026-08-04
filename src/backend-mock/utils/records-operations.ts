export function checkRecordExists<T extends { id: string }>(
  data: readonly T[],
  id: string,
) {
  return data.some((record) => record.id === id);
}

const createId = () => {
  //replace with better ID generator
  const newId = String(Date.now());
  const shortenedId = newId.slice(2, -3);
  return shortenedId;
};
export function createRecordOperation<T extends object>(
  data: (T & { id: string })[],
  record: T,
) {
  const newRecord = {
    ...record,
    id: createId(),
  };
  return [newRecord, ...data];
}

export function updateRecordOperation<T extends { id: string }>(
  data: T[],
  id: string,
  updatedFields: Partial<Omit<T, "id">>,
) {
  return data.map((record) =>
    record.id === id ? { ...record, ...updatedFields } : record,
  );
}

export function deleteRecord<T extends { id: string }>(data: T[], id: string) {
  return data.filter((record) => record.id !== id);
}
