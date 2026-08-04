import type { CrudController } from "src/backend-mock/controllers/createCrudController";
import type { SuccessResponse } from "src/types/apiTypes";

/** Wraps a read call of the mock backend into the API response envelope. */
export async function fetchResponse<T>(
  call: Promise<T>,
): Promise<SuccessResponse<T>> {
  return { data: await call, message: null };
}

/** Wraps a write call of the mock backend into the API response envelope. */
export async function mutationResponse(
  call: Promise<string>,
): Promise<SuccessResponse<string>> {
  const message = await call;
  return { data: message, message };
}

/** Exposes a resource controller as the endpoints consumed by the pages. */
export function createResourceApi<Record_, Editable>(
  controller: CrudController<Record_, Editable>,
) {
  return {
    get: () => fetchResponse(controller.getAll()),
    create: (record: Editable) => mutationResponse(controller.create(record)),
    update: (record: Partial<Editable>, id: string) =>
      mutationResponse(controller.update(id, record)),
    remove: (id: string) => mutationResponse(controller.remove(id)),
  };
}
