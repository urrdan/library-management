import {
  checkRecordExists,
  createRecordOperation,
  updateRecordOperation,
} from "../utils/records-operations";
import { readStorage, writeStorage } from "../utils/storage-operations";
import { endpoints, messages } from "../utils/constants";
import { delay } from "../utils/delay";
import type {
  StaffProfile,
  StaffStatusFilter,
  StaffSystemFields,
} from "src/types/staffTypes";
import { CustomError } from "../utils/error";
import dateUtil from "src/utils/dateUtil";
import { DEFAULT_PAGE_SIZE } from "src/utils/constants";

const STAFF_STORAGE_KEY = endpoints.staff;

export async function getStaffController({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  status = "all",
}: {
  page?: number;
  pageSize?: number;
  status?: StaffStatusFilter;
}) {
  try {
    await delay();
    const staff = readStorage(STAFF_STORAGE_KEY);

    let filteredStaff = staff;

    if (status !== "all") {
      filteredStaff = filteredStaff.filter((s) => s.role === status);
    }

    // pagination metadata
    const totalRecords = filteredStaff.length;
    const totalPages = Math.ceil(totalRecords / pageSize);

    const startIndex = (page - 1) * pageSize;

    const paginatedStaff = filteredStaff.slice(
      startIndex,
      startIndex + pageSize,
    );
    return {
      data: paginatedStaff,
      pagination: {
        page,
        pageSize,
        totalRecords,
        totalPages,
      },
    };
  } catch (err) {
    throw new Error(messages.getError);
  }
}

export async function createStaffController(
  newStaff: StaffProfile,
): Promise<string> {
  try {
    await delay();
    const defaultCustomer: StaffSystemFields = {
      role: "librarian",
      staffSince: dateUtil.today(),
    };
    const staffs = readStorage(STAFF_STORAGE_KEY);
    const createdStaff = { ...newStaff, ...defaultCustomer };
    const updatedStaffs = createRecordOperation(staffs, createdStaff);
    writeStorage(STAFF_STORAGE_KEY, updatedStaffs);
    return messages.postSuccess;
  } catch {
    throw new Error(messages.postError);
  }
}

export async function updateStaffController(
  id: string,
  updatedFields: Partial<StaffProfile>,
): Promise<string> {
  try {
    const staffs = readStorage(STAFF_STORAGE_KEY);

    if (!checkRecordExists(staffs, id)) {
      throw new CustomError(messages.notFound);
    }
    const updatedStaffs = updateRecordOperation(staffs, id, updatedFields);
    writeStorage(STAFF_STORAGE_KEY, updatedStaffs);
    return messages.updateSuccess;
  } catch (error) {
    throw error;
  }
}

export async function deleteStaffController(id: string) {
  try {
    await delay();
    const staffs = readStorage(STAFF_STORAGE_KEY);
    if (!checkRecordExists(staffs, id))
      throw new CustomError(messages.notFound);
    const updatedStaffs = staffs.filter((staff) => staff.id !== id);
    writeStorage(STAFF_STORAGE_KEY, updatedStaffs);
    return messages.deleteSuccess;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(messages.deleteError);
  }
}
