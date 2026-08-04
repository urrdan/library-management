import type { CustomerProfile } from "src/types/customerTypes";
import dateUtil from "src/utils/dateUtil";
import { endpoints } from "../utils/constants";
import { createCrudController } from "./createCrudController";

export const customersController = createCrudController<
  typeof endpoints.customers,
  CustomerProfile
>(endpoints.customers, () => ({
  status: "active",
  activeRental: 0,
  customerSince: dateUtil.today(),
}));
