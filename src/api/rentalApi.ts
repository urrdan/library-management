import { rentalsController } from "src/backend-mock/controllers/rentalsController";
import { createResourceApi, mutationResponse } from "./createResourceApi";

const rentalsApi = createResourceApi(rentalsController);

export const getRentalsAPI = rentalsApi.get;
export const createRentalAPI = rentalsApi.create;
export const updateRentalAPI = rentalsApi.update;
export const deleteRentalAPI = rentalsApi.remove;

export const returnRentalAPI = (id: string, returnedDate: string) =>
  mutationResponse(rentalsController.returnRental(id, returnedDate));

export const undoReturnRentalAPI = (id: string) =>
  mutationResponse(rentalsController.undoReturn(id));
