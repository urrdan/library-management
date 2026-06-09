export type StaffRole = "librarian" | "admin";

export type Staff = {
  id: string;
} & StaffSystemFields &
  StaffProfile;

export type StaffSystemFields = {
  staffSince: string;
  role: StaffRole;
};
export type StaffProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};
