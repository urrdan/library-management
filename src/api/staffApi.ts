import {
  createStaffController,
  deleteStaffController,
  getStaffController,
  searchStaffController,
  updateStaffController,
} from "src/backend-mock/controllers/staffController";
import type { SuccessResponse } from "src/types/apiTypes";
import type {
  Staff,
  StaffProfile,
  StaffStatusFilter,
} from "src/types/staffTypes";

export async function getStaffsAPI({
  page,
  pageSize,
  status,
}: {
  page?: number;
  pageSize?: number;
  status?: StaffStatusFilter;
}): Promise<SuccessResponse<Staff[]>> {
  try {
    const result = await getStaffController({ page, pageSize, status });
    return { data: result.data, pagination: result.pagination, message: null };
  } catch (error) {
    throw error;
  }
}

export async function searchStaffAPI({
  query,
  limit,
}: {
  query: string;
  limit?: number;
}): Promise<SuccessResponse<Staff[]>> {
  try {
    let result = await searchStaffController({ query, limit });
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
