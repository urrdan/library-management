import {
  checkRecordExists,
  createRecordOperation,
  updateRecordOperation,
} from "../utils/records-operations";
import { readStorage, writeStorage } from "../utils/storage-operations";
import { endpoints, messages } from "../utils/constants";
import { delay } from "../utils/delay";
import type { StaffProfile, StaffSystemFields } from "src/types/staffTypes";
import { NotFoundError, rethrowError } from "../utils/error";
import dateUtil from "src/utils/dateUtil";

const STAFF_STORAGE_KEY = endpoints.staff;

export async function getStaffController() {
  try {
    await delay();
    const staff = readStorage(STAFF_STORAGE_KEY);
    return staff;
  } catch (error) {
    rethrowError(error, messages.getError);
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
  } catch (error) {
    rethrowError(error, messages.postError);
  }
}

export async function updateStaffController(
  id: string,
  updatedFields: Partial<StaffProfile>,
): Promise<string> {
  try {
    await delay();
    const staffs = readStorage(STAFF_STORAGE_KEY);

    if (!checkRecordExists(staffs, id)) {
      throw new NotFoundError(messages.notFound);
    }
    const updatedStaffs = updateRecordOperation(staffs, id, updatedFields);
    writeStorage(STAFF_STORAGE_KEY, updatedStaffs);
    return messages.updateSuccess;
  } catch (error) {
    rethrowError(error, messages.updateError);
  }
}

export async function deleteStaffController(id: string) {
  try {
    await delay();
    const staffs = readStorage(STAFF_STORAGE_KEY);
    if (!checkRecordExists(staffs, id))
      throw new NotFoundError(messages.notFound);
    const updatedStaffs = staffs.filter((staff) => staff.id !== id);
    writeStorage(STAFF_STORAGE_KEY, updatedStaffs);
    return messages.deleteSuccess;
  } catch (error) {
    rethrowError(error, messages.deleteError);
  }
}
