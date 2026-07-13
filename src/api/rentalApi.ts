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
  try {
    let result = await getRentalsController();
    return { data: result, message: null };
  } catch (error) {
    throw error;
  }
}

export async function createRentalAPI(newRental: RentalEditable) {
  try {
    let result = await createRentalController(newRental);
    return { data: result, message: result };
  } catch (err) {
    throw err;
  }
}

export async function updateRentalAPI(
  editedRental: RentalEditable,
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
