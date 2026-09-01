import {
  createCustomerController,
  deleteCustomerController,
  getEnrichedCustomersController,
  updateCustomerController,
  updateCustomerStatusController,
} from "src/backend-mock/controllers/customersController";
import { getCustomerRentalsController } from "src/backend-mock/controllers/rentalsController";
import type { SuccessResponse } from "src/types/apiTypes";
import type {
  Customer,
  CustomerProfile,
  CustomerStatus,
  CustomerStatusFilter,
} from "src/types/customerTypes";
import type { RentalView } from "src/types/rentalTypes";

export async function getCustomersAPI({
  page,
  pageSize,
  status,
}: {
  page?: number;
  pageSize?: number;
  status?: CustomerStatusFilter;
}): Promise<SuccessResponse<Customer[]>> {
  try {
    let result = await getEnrichedCustomersController({
      page,
      pageSize,
      status,
    });
    return {
      data: result.data,
      message: null,
      pagination: result.pagination,
    };
  } catch (error) {
    throw error;
  }
}

export async function getCustomerRentalsAPI(
  customerId: string,
): Promise<SuccessResponse<RentalView[]>> {
  try {
    let result = await getCustomerRentalsController(customerId);
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

export async function updateCustomerStatusAPI(
  customerId: string,
  status: Extract<CustomerStatus, "active" | "suspended">,
) {
  try {
    let result = await updateCustomerStatusController(customerId, status);
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
