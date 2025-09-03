import DataTable from "react-data-table-component";

export default function Books() {
  const columns = [
    {
      name: "First name",
      selector: (row: any) => row.firstName,
      sortable: true,
    },
    {
      name: "Last name",
      selector: (row: any) => row.firstName,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row: any) => row.age,
      sortable: true,
    },
    {
      name: "Full name",
      selector: (row: any) => `${row.firstName || ""} ${row.lastName || ""}`,
      sortable: true,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataTable data={rows} columns={columns} />
    </div>
  );
}
