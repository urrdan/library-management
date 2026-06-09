import booksDB from "../database/booksDB";
import rentalsDB from "../database/rentalsDB";
import customersDB from "../database/customersDb";
import staffDB from "../database/staffDB";
import type { Customer } from "src/types/customerTypes";
import type { Staff } from "src/types/staffTypes";
import { endpoints } from "./constants";
import type { Rental } from "src/types/rentalTypes";
import type { Book } from "src/types/bookTypes";

export type StorageSchema = {
  [endpoints.books]: Book[];
  [endpoints.rentals]: Rental[];
  [endpoints.customers]: Customer[];
  [endpoints.staff]: Staff[];
};
const storageMap: StorageSchema = {
  [endpoints.books]: booksDB,
  [endpoints.rentals]: rentalsDB,
  [endpoints.customers]: customersDB,
  [endpoints.staff]: staffDB,
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
