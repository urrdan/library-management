import { staffController } from "src/backend-mock/controllers/staffController";
import { createResourceApi } from "./createResourceApi";

const staffApi = createResourceApi(staffController);

export const getStaffsAPI = staffApi.get;
export const createStaffAPI = staffApi.create;
export const updateStaffAPI = staffApi.update;
export const deleteStaffAPI = staffApi.remove;
