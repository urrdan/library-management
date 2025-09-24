interface staffDataType {
  staffId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  staffSince: string;
}
export const staffData: staffDataType[] = [
  {
    staffId: 1,
    firstName: "John",
    lastName: "Doe",
    email: "Johndoe@gmail.com",
    phone: "6231234456",
    staffSince: "23-12-2023",
  },
  {
    staffId: 2,
    firstName: "Michael",
    lastName: "Brown",
    phone: "6231234456",
    email: "Johndoe@gmail.com",
    staffSince: "23-12-2023",
  },
];
