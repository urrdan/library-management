export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

/** Lets expected business errors bubble up, masks unexpected ones. */
export function rethrowBusinessError(
  error: unknown,
  fallbackMessage: string,
): never {
  if (error instanceof CustomError) throw error;
  throw new Error(fallbackMessage);
}
