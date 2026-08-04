import {
  createRentalController,
  deleteRentalController,
  getRentalsController,
  returnRentalController,
  undoReturnRentalController,
  updateRentalController,
} from "src/backend-mock/controllers/rentalsController";
import type { SuccessResponse } from "src/types/apiTypes";
import type { RentalEditable, Rental } from "src/types/rentalTypes";

export async function getRentalsAPI(): Promise<SuccessResponse<Rental[]>> {
  const result = await getRentalsController();
  return { data: result, message: null };
}

export async function createRentalAPI(newRental: RentalEditable) {
  const result = await createRentalController(newRental);
  return { data: result, message: result };
}

export async function updateRentalAPI(
  editedRental: RentalEditable,
  id: string,
) {
  const result = await updateRentalController(id, editedRental);
  return { data: result, message: result };
}

export async function returnRentalAPI(id: string, returnedDate: string) {
  const result = await returnRentalController(id, returnedDate);
  return { data: result, message: result };
}

export async function undoReturnRentalAPI(id: string) {
  const result = await undoReturnRentalController(id);
  return { data: result, message: result };
}

export async function deleteRentalAPI(
  id: string,
): Promise<SuccessResponse<string>> {
  const result = await deleteRentalController(id);
  return { data: result, message: result };
}
