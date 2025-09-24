interface customerDataType {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  customerSince: string;
  membershipStatus: string;
}
export const membershipStatus = ["Active", "Inactive", "Suspended"];
export const customersData: customerDataType[] = [
  {
    customerId: 1,
    firstName: "John",
    lastName: "Doe",
    phone: "6231234456",
    customerSince: "23-12-2023",
    email: "Johndoe@gmail.com",
    membershipStatus: "active",
  },
  {
    customerId: 2,
    firstName: "Michael",
    lastName: "Brown",
    phone: "6231234456",
    customerSince: "23-12-2023",
    email: "Johndoe@gmail.com",
    membershipStatus: "active",
  },
];
