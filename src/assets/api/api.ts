import type { rentalDataType } from "../../apis/data/rentalData";

export const rentalAPIs = (
  setRentals: (arg: rentalDataType[]) => void,
  rentals: rentalDataType[],
  method: string,
  data: rentalDataType
) => {
  const selectedRentalIndex = rentals.findIndex(
    (r) => r.rentalId == data.rentalId
  );
  const modifiedRentals = [...rentals]; //to prevent mutating the state
  switch (method) {
    case "post":
      setRentals([...rentals, data]);
      break;

    case "update":
      modifiedRentals.splice(selectedRentalIndex, 1, data);
      setRentals(modifiedRentals);
      break;
    case "delete":
      modifiedRentals.splice(selectedRentalIndex, 1);
      setRentals(modifiedRentals);
      break;
    default:
      console.log("error");
  }
};
