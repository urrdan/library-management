export type CustomerStatus = "active" | "suspended";

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
