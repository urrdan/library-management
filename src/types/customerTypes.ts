export type CustomerStatus = "active" | "suspended" | "deleted";
export type CustomerStatusFilter = CustomerStatus | "all";

export type Customer = {
  id: string;
} & CustomerSystemFields &
  CustomerProfile;

export type CustomerSystemFields = {
  status: CustomerStatus;
  activeRental: number;
  customerSince: string;
};
export type CustomerProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};
export type CustomerRentalCounts = {
  all: number;
  active: number;
  overdue: number;
  returned: number;
};
export const customerRentalCounts = {
  all: 0,
  active: 0,
  overdue: 0,
  returned: 0,
};
