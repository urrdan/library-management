import type { StaffProfile } from "src/types/staffTypes";
import dateUtil from "src/utils/dateUtil";
import { endpoints } from "../utils/constants";
import { createCrudController } from "./createCrudController";

export const staffController = createCrudController<
  typeof endpoints.staff,
  StaffProfile
>(endpoints.staff, () => ({
  role: "librarian",
  staffSince: dateUtil.today(),
}));
