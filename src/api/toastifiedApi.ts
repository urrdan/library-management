import { toast } from "react-toastify";
import type { SuccessResponse } from "./mockAPI";

type CustomMessage = {
  success?: string;
  error?: string;
};
export default async function apiWithToast<T /* extends { message: string } */>(
  api: Promise<SuccessResponse<T>>,
  customMessage: CustomMessage = {},
): Promise<SuccessResponse<T>> {
  try {
    const res = await api;
    const message = customMessage.success || res.message;
    message && toast.success(message);
    return res;
  } catch (err: any) {
    const message = customMessage.error || err.message;
    message && toast.error(message);
    throw err;
  }
}
