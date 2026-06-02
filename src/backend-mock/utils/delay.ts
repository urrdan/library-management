import { API_TIMEOUT } from "./constants";

export function delay(ms = API_TIMEOUT) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
