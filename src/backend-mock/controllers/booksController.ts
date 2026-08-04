import type { BookProfile } from "src/types/bookTypes";
import { endpoints } from "../utils/constants";
import { createCrudController } from "./createCrudController";

export const booksController = createCrudController<
  typeof endpoints.books,
  BookProfile
>(endpoints.books);
