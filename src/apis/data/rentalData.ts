interface rentalDataType {
  rentalId: number;
  bookId: number;
  bookTitle: string;
  customerId: number;
  customerFirstName: string;
  customerLastName: string;
  rentedDate: string;
  returnDate: string;
}
export const rentalData: rentalDataType[] = [
  {
    rentalId: 11,
    bookId: 4,
    bookTitle: "A Narrow Escape",
    customerId: 2,
    customerFirstName: "John",
    customerLastName: "Doe",
    rentedDate: "25-09-2025",
    returnDate: "6-10-2025",
  },
  {
    rentalId: 13,
    bookId: 3,
    bookTitle: "The Witch And Twelve Slaves",
    customerId: 2,
    customerFirstName: "Michael",
    customerLastName: "Brown",
    rentedDate: "29-09-2025",
    returnDate: "14-10-2025",
  },
];
