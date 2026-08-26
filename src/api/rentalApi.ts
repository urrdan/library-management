import {
  createRentalController,
  deleteRentalController,
  getEnhancedRentalsController,
  returnRentalController,
  undoReturnRentalController,
  updateRentalController,
} from "src/backend-mock/controllers/rentalsController";
import type { SuccessResponse } from "src/types/apiTypes";
import type {
  AdminRentalEditable,
  RentalCreate,
  RentalStatusFilter,
  RentalView,
} from "src/types/rentalTypes";

export async function getRentalsAPI({
  page,
  pageSize,
  status,
}: {
  page?: number;
  pageSize?: number;
  status?: RentalStatusFilter;
}): Promise<SuccessResponse<RentalView[]>> {
  try {
    let result = await getEnhancedRentalsController({ page, pageSize, status });
    return {
      data: result.data,
      message: null,
      pagination: result.pagination,
    };
  } catch (error) {
    throw error;
  }
}

export async function createRentalAPI(newRental: RentalCreate) {
  try {
    let result = await createRentalController(newRental);
    return { data: result, message: result };
  } catch (err) {
    throw err;
  }
}

export async function updateRentalAPI(
  editedRental: AdminRentalEditable,
  id: string,
) {
  try {
    let result = await updateRentalController(id, editedRental);
    return { data: result, message: result };
  } catch (err) {
    throw err;
  }
}
export async function returnRentalAPI(id: string, returnedDate: string) {
  try {
    let result = await returnRentalController(id, returnedDate);
    return { data: result, message: result };
  } catch (err) {
    throw err;
  }
}

export async function undoReturnRentalAPI(id: string) {
  try {
    let result = await undoReturnRentalController(id);
    return { data: result, message: result };
  } catch (err) {
    throw err;
  }
}

export async function deleteRentalAPI(
  id: string,
): Promise<SuccessResponse<string>> {
  try {
    let result = await deleteRentalController(id);
    return { data: result, message: result };
  } catch (error) {
    throw error;
  }
}
