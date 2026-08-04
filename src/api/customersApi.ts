import { customersController } from "src/backend-mock/controllers/customersController";
import { createResourceApi } from "./createResourceApi";

const customersApi = createResourceApi(customersController);

export const getCustomersAPI = customersApi.get;
export const createCustomerAPI = customersApi.create;
export const updateCustomerAPI = customersApi.update;
export const deleteCustomerAPI = customersApi.remove;
