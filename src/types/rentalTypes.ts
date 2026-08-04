export type Rental = {
  id: string;
} & RentalSystemFields &
  RentalEditable;

export type RentalSystemFields = {
  returnedDate: string | null;
};

export type RentalEditable = {
  bookId: string;
  bookTitle: string;
  customerId: string;
  customerName: string;
  staffId: string;
  staffName: string;
  rentedDate: string;
  dueDate: string;
};
