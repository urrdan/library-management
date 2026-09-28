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
  CustomerStatus,
  CustomerStatusFilter,
} from "src/types/customerTypes";
import { CustomError } from "../utils/error";
import dateUtil from "src/utils/dateUtil";
import { DEFAULT_PAGE_SIZE } from "src/utils/constants";
import enrichCustomersData from "../utils/enrichCustomerData";
import { nameJoiner } from "src/utils/stringUtils";

const CUSTOMERS_STORAGE_KEY = endpoints.customers;

export async function getEnrichedCustomersController({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  status = "all",
}: {
  page?: number;
  pageSize?: number;
  status?: CustomerStatusFilter;
}) {
  try {
    await delay();

    const customers = readStorage(CUSTOMERS_STORAGE_KEY);

    // filter
    let filteredCustomers = customers.filter(
      (customer) => customer.status !== "deleted",
    );

    if (status !== "all") {
      filteredCustomers = filteredCustomers.filter(
        (customer) => customer.status === status,
      );
    }

    // pagination metadata
    const totalRecords = filteredCustomers.length;
    const totalPages = Math.ceil(totalRecords / pageSize);

    const startIndex = (page - 1) * pageSize;

    const paginatedCustomers = filteredCustomers.slice(
      startIndex,
      startIndex + pageSize,
    );

    // enrich only records to be returned
    const data = enrichCustomersData(paginatedCustomers);
    return {
      data,
      pagination: {
        page,
        pageSize,
        totalRecords,
        totalPages,
      },
    };
  } catch {
    throw new Error(messages.getError);
  }
}

export async function searchCustomersController({
  query,
  limit,
}: {
  query: string;
  limit?: number;
}) {
  try {
    const customers = readStorage(CUSTOMERS_STORAGE_KEY);

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return customers
      .filter((customer) => {
        const fullName = nameJoiner(customer).toLowerCase();

        return fullName.includes(normalizedQuery);
      })
      .slice(0, limit || customers.length);
  } catch {
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
      throw new CustomError(messages.notFound);
    }
    const updatedCustomers = updateRecordOperation(
      customers,
      id,
      updatedFields,
    );
    writeStorage(CUSTOMERS_STORAGE_KEY, updatedCustomers);
    return messages.updateSuccess;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error; // business error
    }
    throw new Error(messages.updateError); //unexpected error
  }
}

export async function updateCustomerStatusController(
  customerId: string,
  status: Extract<CustomerStatus, "active" | "suspended">,
) {
  try {
    await delay();

    const customers = readStorage(CUSTOMERS_STORAGE_KEY);
    const customer = customers.find((x) => x.id === customerId);
    if (!customer) {
      throw new CustomError(messages.notFound);
    }
    if (customer.status === status) {
      throw new CustomError(`Customer is already ${status}`);
    }
    const updatedCustomers = updateRecordOperation(customers, customerId, {
      status,
    });
    writeStorage(CUSTOMERS_STORAGE_KEY, updatedCustomers);
    return messages.updateSuccess;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(messages.updateError);
  }
}

export async function deleteCustomerController(id: string) {
  try {
    await delay();
    const customers = readStorage(CUSTOMERS_STORAGE_KEY);
    const customer = customers.find((customer) => customer.id === id);
    if (!customer) {
      throw new CustomError(messages.notFound);
    }
    if (customer.status === "deleted") {
      throw new CustomError("Customer is already deleted");
    }
    const updatedCustomers = updateRecordOperation(customers, id, {
      status: "deleted",
    });
    writeStorage(CUSTOMERS_STORAGE_KEY, updatedCustomers);
    return messages.deleteSuccess;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(messages.deleteError);
  }
}
