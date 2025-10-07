export interface rentalDataType {
  rentalId: number;
  bookId: number;
  bookTitle: string;
  customerId: number;
  customerName: string;
  staffId: number;
  staffName: string;
  rentedDate: string;
  returnDate: string;
}
export const rentalData: rentalDataType[] = [
  {
    rentalId: 11,
    bookId: 4,
    bookTitle: "A Narrow Escape",
    customerId: 2,
    customerName: "John Doe",
    staffId: 1,
    staffName: "John Doe",
    rentedDate: "25-09-2025",
    returnDate: "6-10-2025",
  },
  {
    rentalId: 13,
    bookId: 3,
    bookTitle: "The Witch And Twelve Slaves",
    customerId: 2,
    customerName: "Michael Brown",
    staffId: 2,
    staffName: "Michael Brown",
    rentedDate: "29-09-2025",
    returnDate: "14-10-2025",
  },
];
