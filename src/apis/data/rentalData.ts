export interface rentalDataType {
  rentalId?: number;
  bookId: number | null;
  bookTitle: string;
  customerId: number | null;
  customerName: string;
  staffId: number | null;
  staffName: string;
  rentedDate: string;
  returnDate: string;
}
export const rentalDataTemplate = {
  bookId: null,
  bookTitle: "",
  customerId: null,
  customerName: "",
  staffId: null,
  staffName: "",
  rentedDate: "",
  returnDate: "",
};
export const rentalData: rentalDataType[] = [
  {
    rentalId: 11,
    bookId: 4,
    bookTitle: "A Narrow Escape",
    customerId: 2,
    customerName: "John Doe",
    staffId: 1,
    staffName: "John Doe",
    rentedDate: "2025-09-25",
    returnDate: "2025-10-06",
  },
  {
    rentalId: 13,
    bookId: 3,
    bookTitle: "The Witch And Twelve Slaves",
    customerId: 2,
    customerName: "Michael Brown",
    staffId: 2,
    staffName: "Michael Brown",
    rentedDate: "2025-09-29",
    returnDate: "2025-10-14",
  },
];
