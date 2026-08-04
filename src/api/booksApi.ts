import { booksController } from "src/backend-mock/controllers/booksController";
import { createResourceApi } from "./createResourceApi";

const booksApi = createResourceApi(booksController);

export const getBooksAPI = booksApi.get;
export const createBookAPI = booksApi.create;
export const updateBookAPI = booksApi.update;
export const deleteBookAPI = booksApi.remove;
