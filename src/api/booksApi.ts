import {
  createBookController,
  deleteBookController,
  getBooksController,
  updateBookController,
} from "src/backend-mock/controllers/booksController";
import type { SuccessResponse } from "src/types/apiTypes";
import type { Book, BookStatusFilter, EditableBook } from "src/types/bookTypes";

export async function getBooksAPI({
  page,
  pageSize,
  status,
}: {
  page?: number;
  pageSize?: number;
  status?: BookStatusFilter;
}): Promise<SuccessResponse<Book[]>> {
  try {
    let result = await getBooksController({ page, pageSize, status });
    return {
      data: result.data,
      message: null,
      pagination: result.pagination,
    };
  } catch (error) {
    throw error;
  }
}

export async function createBookAPI(newbook: EditableBook) {
  try {
    let result = await createBookController(newbook);
    return { data: result, message: result };
  } catch (err) {
    throw err;
  }
}

export async function updateBookAPI(
  newbook: Partial<EditableBook>,
  id: string,
) {
  try {
    let result = await updateBookController(id, newbook);
    return { data: result, message: result };
  } catch (err) {
    throw err;
  }
}

export async function deleteBookAPI(
  id: string,
): Promise<SuccessResponse<string>> {
  try {
    let result = await deleteBookController(id);
    return { data: result, message: result };
  } catch (error) {
    throw error;
  }
}
