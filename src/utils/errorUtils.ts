import { messages } from "src/backend-mock/utils/constants";

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string" &&
    (error as { message: string }).message
  ) {
    return (error as { message: string }).message;
  }
  return messages.defaultError;
}

/** Single place where unexpected failures are logged, so nothing is swallowed. */
export function reportError(context: string, error: unknown): void {
  console.error(`[${context}] ${getErrorMessage(error)}`, error);
}
