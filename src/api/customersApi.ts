import {
  createCustomerController,
  deleteCustomerController,
  getCustomersController,
  updateCustomerController,
} from "src/backend-mock/controllers/customersController";
import type { SuccessResponse } from "src/types/apiTypes";
import type { Customer, CustomerProfile } from "src/types/customerTypes";

export async function getCustomersAPI(): Promise<SuccessResponse<Customer[]>> {
  try {
    let result = await getCustomersController();
    return { data: result, message: null };
  } catch (error) {
    throw error;
  }
}

export async function createCustomerAPI(newcustomer: CustomerProfile) {
  try {
    let result = await createCustomerController(newcustomer);
    return { data: result, message: result };
  } catch (err) {
    throw err;
  }
}

export async function updateCustomerAPI(
  newcustomer: Partial<CustomerProfile>,
  id: string,
) {
  try {
    let result = await updateCustomerController(id, newcustomer);
    return { data: result, message: result };
  } catch (err) {
    throw err;
  }
}

export async function deleteCustomerAPI(
  id: string,
): Promise<SuccessResponse<string>> {
  try {
    let result = await deleteCustomerController(id);
    return { data: result, message: result };
  } catch (error) {
    throw error;
  }
}
