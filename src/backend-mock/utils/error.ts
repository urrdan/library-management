/**
 * Errors that are part of the domain contract: safe to show to the user and
 * always re-thrown unchanged by the controllers.
 */
export class CustomError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "CustomError";
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "NotFoundError";
  }
}

/** Raised when the session storage backing the mock database is unusable. */
export class StorageError extends CustomError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "StorageError";
  }
}

/**
 * Re-throws domain errors untouched and wraps anything unexpected in an error
 * carrying a user-facing message, keeping the original error as `cause`.
 */
export function rethrowError(error: unknown, fallbackMessage: string): never {
  if (error instanceof CustomError) throw error;
  throw new Error(fallbackMessage, { cause: error });
}
