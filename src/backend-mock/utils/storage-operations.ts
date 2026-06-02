import type { Book, Rental } from "src/types/types";
import { endpoints } from "src/utils/constants";
import booksDB from "../database/booksDB";
import rentalsDB from "../database/rentalsDB";

export type StorageSchema = {
  books: Book[];
  rentals: Rental[];
};
const storageMap: StorageSchema = {
  [endpoints.books]: booksDB,
  [endpoints.rentals]: rentalsDB,
};

export function readStorage<K extends keyof StorageSchema>(key: K) {
  const raw = sessionStorage.getItem(key);

  if (raw === null) {
    //initialize storage
    const initialData = storageMap[key];
    writeStorage(key, initialData);
    return initialData;
  } else if (!raw) return [] as StorageSchema[K];
  const result = JSON.parse(raw);
  return result as StorageSchema[K];
}

export function writeStorage<K extends keyof StorageSchema>(
  key: K,
  data: StorageSchema[K],
) {
  sessionStorage.setItem(key, JSON.stringify(data));
}
