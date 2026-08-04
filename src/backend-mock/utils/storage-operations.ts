import booksDB from "../database/booksDB";
import rentalsDB from "../database/rentalsDB";
import customersDB from "../database/customersDb";
import staffDB from "../database/staffDB";
import type { Customer } from "src/types/customerTypes";
import type { Staff } from "src/types/staffTypes";
import { endpoints, messages } from "./constants";
import { StorageError } from "./error";
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
  let raw: string | null;
  try {
    raw = sessionStorage.getItem(key);
  } catch (error) {
    throw new StorageError(`${messages.storageUnavailable} ('${key}')`, {
      cause: error,
    });
  }

  if (raw === null) {
    //initialize storage
    const initialData = storageMap[key];
    writeStorage(key, initialData);
    return initialData;
  } else if (!raw) return [] as StorageSchema[K];

  try {
    return JSON.parse(raw) as StorageSchema[K];
  } catch (error) {
    throw new StorageError(`${messages.storageCorrupted} ('${key}')`, {
      cause: error,
    });
  }
}

export function writeStorage<K extends keyof StorageSchema>(
  key: K,
  data: StorageSchema[K],
) {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    throw new StorageError(`${messages.storageWriteFailed} ('${key}')`, {
      cause: error,
    });
  }
}
