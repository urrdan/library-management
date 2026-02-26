import books from "./defaultData/books";
const timeout = 500;
//message
const getErrorDefaultMessage = "Error: Fetching Resource";
const postSuccessDefaultMessage = "Success: Record Added.";
const postErrorDefaultMessage = "Error: Creating Resource!";
const updateSuccessDefaultMessage = "Success: Record updated.";
const updateErrorDefaultMessage = "Error: Updating Resource!";
const deleteSuccessDefaultMessage = "Success: Record deleted.";
const deleteErrorDefaultMessage = "Error: Deleting Resource!";
const notFoundErrorMessage = "Resource not found";

type Endpoint = "/books" | "/loans";
export type SuccessResponse<T> = {
  data: T;
  message: string | null;
};

const setupDefaultData = (url: Endpoint) => {
  const map: Record<string, {}[]> = {
    "/books": books,
    //more to come e.g users, loans
  };
  return map[url] ? map[url] : [];
};

const getResource = <T>(url: Endpoint): T[] => {
  try {
    let fromStore = sessionStorage.getItem(url);
    if (fromStore == null) {
      const defaultData = setupDefaultData(url);
      if (defaultData) {
        fromStore = JSON.stringify(defaultData);
        sessionStorage.setItem(url, fromStore);
      }
    }

    return JSON.parse(fromStore || "[]");
  } catch {
    return [];
  }
};

const checkExistence = <T extends { id: string }>(data: T[], id: string) => {
  return data.some((record) => record.id == id);
};

//endpoints
export const getApi = <T>(url: Endpoint): Promise<SuccessResponse<T[]>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve({ data: getResource(url), message: null });
      } catch {
        reject({ data: {}, message: getErrorDefaultMessage });
      }
    }, timeout);
  });
};

export const postApi = <T>(
  url: Endpoint,
  body: T,
): Promise<SuccessResponse<string>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = getResource<T>(url);
        let id = String(Date.now());
        const requestBody = [{ ...body, id }, ...data];
        sessionStorage.setItem(url, JSON.stringify(requestBody));

        resolve({ data: id, message: postSuccessDefaultMessage });
      } catch {
        reject({ data: body, message: postErrorDefaultMessage });
      }
    }, timeout);
  });
};

export const updateApi = <T extends { id: string }>(
  url: Endpoint,
  id: string,
  body: Partial<Omit<T, "id">>,
): Promise<SuccessResponse<string>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = getResource<T>(url);

        if (!checkExistence(data, id)) {
          reject({ data: id, message: notFoundErrorMessage });
          return;
        }
        const requestBody = data.map((record) => {
          if (record.id == id) {
            return { ...record, ...body };
          }
          return record;
        });
        sessionStorage.setItem(url, JSON.stringify(requestBody));
        resolve({
          data: id /*ToDO: return updatedRecord*/,
          message: updateSuccessDefaultMessage,
        });
      } catch {
        reject({ data: id, message: updateErrorDefaultMessage });
      }
    }, timeout);
  });
};

export const deleteApi = (
  url: Endpoint,
  id: string,
): Promise<SuccessResponse<string>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = getResource<{ id: string }>(url);
        if (!checkExistence(data, id)) {
          reject({ data: id, message: notFoundErrorMessage });
          return;
        }
        const requestBody = data.filter((record) => record.id != id);
        sessionStorage.setItem(url, JSON.stringify(requestBody));
        resolve({ data: id, message: deleteSuccessDefaultMessage });
      } catch {
        reject({ data: id, message: deleteErrorDefaultMessage });
      }
    }, timeout);
  });
};
