import {
  createStaffController,
  deleteStaffController,
  getStaffController,
  updateStaffController,
} from "src/backend-mock/controllers/staffController";
import type { SuccessResponse } from "src/types/apiTypes";
import type { Staff, StaffProfile } from "src/types/staffTypes";

export async function getStaffsAPI(): Promise<SuccessResponse<Staff[]>> {
  const result = await getStaffController();
  return { data: result, message: null };
}

export async function createStaffAPI(newstaff: StaffProfile) {
  const result = await createStaffController(newstaff);
  return { data: result, message: result };
}

export async function updateStaffAPI(
  newstaff: Partial<StaffProfile>,
  id: string,
) {
  const result = await updateStaffController(id, newstaff);
  return { data: result, message: result };
}

export async function deleteStaffAPI(
  id: string,
): Promise<SuccessResponse<string>> {
  const result = await deleteStaffController(id);
  return { data: result, message: result };
}
