import type { TableColumn } from "react-data-table-component";
import type { PersonProfile } from "src/components/person-form/PersonForm";

/** Contact detail columns shared by the staff and the customer tables. */
export function personColumns<T extends PersonProfile>(): TableColumn<T>[] {
  return [
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      grow: 1.5,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      grow: 2,
    },
  ];
}
