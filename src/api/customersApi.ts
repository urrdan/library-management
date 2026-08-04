import {
  createCustomerController,
  deleteCustomerController,
  getCustomersController,
  updateCustomerController,
} from "src/backend-mock/controllers/customersController";
import type { SuccessResponse } from "src/types/apiTypes";
import type { Customer, CustomerProfile } from "src/types/customerTypes";

export async function getCustomersAPI(): Promise<SuccessResponse<Customer[]>> {
  const result = await getCustomersController();
  return { data: result, message: null };
}

export async function createCustomerAPI(newcustomer: CustomerProfile) {
  const result = await createCustomerController(newcustomer);
  return { data: result, message: result };
}

export async function updateCustomerAPI(
  newcustomer: Partial<CustomerProfile>,
  id: string,
) {
  const result = await updateCustomerController(id, newcustomer);
  return { data: result, message: result };
}

export async function deleteCustomerAPI(
  id: string,
): Promise<SuccessResponse<string>> {
  const result = await deleteCustomerController(id);
  return { data: result, message: result };
}
