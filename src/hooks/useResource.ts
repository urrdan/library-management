import { useCallback, useEffect, useState } from "react";
import apiWithToast from "src/api/toastifiedApi";
import type { SuccessResponse } from "src/types/apiTypes";

/**
 * Loads a list endpoint on mount and exposes a `refresh` for the pages to
 * hand over to their table/form children after a mutation.
 */
export function useResource<T>(
  fetchResource: () => Promise<SuccessResponse<T[]>>,
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    apiWithToast(fetchResource())
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [fetchResource]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, refresh };
}
