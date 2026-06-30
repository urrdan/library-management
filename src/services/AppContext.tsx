import { createContext, type JSX } from "react";

export const mainContext = createContext({});
export function AppContext(props: { children: JSX.Element }) {
  return (
    <mainContext.Provider value={{}}>{props.children}</mainContext.Provider>
  );
}
