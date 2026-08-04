import { toast } from "react-toastify";
import type { SuccessResponse } from "src/types/apiTypes";
import { getErrorMessage } from "src/utils/errorUtils";

type CustomMessage = {
  success?: string;
  error?: string;
};
export default async function apiWithToast<T>(
  api: Promise<SuccessResponse<T>>,
  customMessage: CustomMessage = {},
): Promise<SuccessResponse<T>> {
  try {
    const res = await api;
    const message = customMessage.success || res.message;
    if (message) toast.success(message);
    return res;
  } catch (err) {
    const message = customMessage.error || getErrorMessage(err);
    toast.error(message);
    throw err;
  }
}
