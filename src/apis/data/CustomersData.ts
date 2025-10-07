export interface customerDataType {
  customerId: number;
  customerName: string;
  email: string;
  phone: string;
  customerSince: string;
  membershipStatus: string;
}
export const membershipStatus = ["Active", "Inactive", "Suspended"];
export const customersData: customerDataType[] = [
  {
    customerId: 1,
    customerName: "John Doe",
    phone: "6231234456",
    customerSince: "23-12-2023",
    email: "Johndoe@gmail.com",
    membershipStatus: "active",
  },
  {
    customerId: 2,
    customerName: "Michael Brown",
    phone: "6231234456",
    customerSince: "23-12-2023",
    email: "Johndoe@gmail.com",
    membershipStatus: "active",
  },
];
