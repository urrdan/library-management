import { createContext, useState, type JSX } from "react";
import { rentalData, type rentalDataType } from "../apis/data/rentalData";
import { rentalAPIs } from "../assets/api/api";

export const mainContext = createContext({
  rentals: rentalData,
  apis: (source: string, method: string, data: any) => {
    source;
    method;
    data;
  },
});
export function MainContext(props: { children: JSX.Element }) {
  const [rentals, setRentals] = useState<rentalDataType[]>(rentalData);
  const apis = (source: string, method: string, data: any) => {
    switch (source) {
      case "rental":
        rentalAPIs(
          (arg: rentalDataType[]) => {
            setRentals(arg);
          },
          rentals,
          method,
          data
        );
        break;
      default:
        break;
    }
  };
  return (
    <mainContext.Provider
      value={{
        rentals,
        apis,
      }}
    >
      {props.children}
    </mainContext.Provider>
  );
}
