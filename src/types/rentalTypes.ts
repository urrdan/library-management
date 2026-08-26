export type Rental = RentalSystemFields &
  RentalCreate & {
    id: string;
  };

export type RentalSystemFields = {
  returnedDate: string | null;
};

export type RentalCreate = {
  bookId: string;
  customerId: string;
  staffId: string;
  rentedDate: string;
  dueDate: string;
};

export type RentalView = Rental & {
  bookTitle: string;
  customerName: string;
  staffName: string;
  status: RentalStatus;
};

export type AdminRentalEditable = RentalCreate &
  Partial<Pick<Rental, "returnedDate">>;

export type RentalStatus = "active" | "overdue" | "returned";
export type RentalStatusFilter = RentalStatus | "all";
