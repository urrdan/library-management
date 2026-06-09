import {
  createStaffController,
  deleteStaffController,
  getStaffController,
  updateStaffController,
} from "src/backend-mock/controllers/staffController";
import type { SuccessResponse } from "src/types/apiTypes";
import type { Staff, StaffProfile } from "src/types/staffTypes";

export async function getStaffsAPI(): Promise<SuccessResponse<Staff[]>> {
  try {
    let result = await getStaffController();
    return { data: result, message: null };
  } catch (error) {
    throw error;
  }
}

export async function createStaffAPI(newstaff: StaffProfile) {
  try {
    let result = await createStaffController(newstaff);
    return { data: result, message: result };
  } catch (err) {
    throw err;
  }
}

export async function updateStaffAPI(
  newstaff: Partial<StaffProfile>,
  id: string,
) {
  try {
    let result = await updateStaffController(id, newstaff);
    return { data: result, message: result };
  } catch (err) {
    throw err;
  }
}

export async function deleteStaffAPI(
  id: string,
): Promise<SuccessResponse<string>> {
  try {
    let result = await deleteStaffController(id);
    return { data: result, message: result };
  } catch (error) {
    throw error;
  }
}
