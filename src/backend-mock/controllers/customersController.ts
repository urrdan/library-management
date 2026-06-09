import {
  checkRecordExists,
  createRecordOperation,
  updateRecordOperation,
} from "../utils/records-operations";
import { readStorage, writeStorage } from "../utils/storage-operations";
import { endpoints, messages } from "../utils/constants";
import { delay } from "../utils/delay";
import type {
  CustomerSystemFields,
  CustomerProfile,
} from "src/types/customerTypes";
import { NotFoundError } from "../utils/error";
import dateUtil from "src/utils/dateUtil";

const CUSTOMERS_STORAGE_KEY = endpoints.customers;

export async function getCustomersController() {
  try {
    await delay();
    const customers = readStorage(CUSTOMERS_STORAGE_KEY);
    return customers;
  } catch (err) {
    console.log(err);

    throw new Error(messages.getError);
  }
}

export async function createCustomerController(
  customer: CustomerProfile,
): Promise<string> {
  try {
    await delay();
    const defaultCustomer: CustomerSystemFields = {
      status: "active",
      activeRental: 0,
      customerSince: dateUtil.today(),
    }; //uneditable fields
    const customers = readStorage(CUSTOMERS_STORAGE_KEY);
    const createdCustomer = { ...customer, ...defaultCustomer };
    const updatedCustomers = createRecordOperation(customers, createdCustomer);
    writeStorage(CUSTOMERS_STORAGE_KEY, updatedCustomers);
    return messages.postSuccess;
  } catch {
    throw new Error(messages.postError);
  }
}

export async function updateCustomerController(
  id: string,
  updatedFields: Partial<CustomerProfile>,
): Promise<string> {
  try {
    const customers = readStorage(CUSTOMERS_STORAGE_KEY);

    if (!checkRecordExists(customers, id)) {
      throw new NotFoundError(messages.notFound);
    }
    const updatedCustomers = updateRecordOperation(
      customers,
      id,
      updatedFields,
    );
    writeStorage(CUSTOMERS_STORAGE_KEY, updatedCustomers);
    return messages.updateSuccess;
  } catch (error) {
    throw error;
  }
}

export async function deleteCustomerController(id: string) {
  try {
    await delay();
    const customers = readStorage(CUSTOMERS_STORAGE_KEY);
    if (!checkRecordExists(customers, id))
      throw new NotFoundError(messages.notFound);
    const updatedCustomers = customers.filter((customer) => customer.id !== id);
    writeStorage(CUSTOMERS_STORAGE_KEY, updatedCustomers);
    return messages.deleteSuccess;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new Error(messages.deleteError);
  }
}
