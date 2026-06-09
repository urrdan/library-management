export default function formValidation<T>(
  data: T, //object to be validated
  fieldsToValidate: (keyof T)[], //prop names
) {
  const result: Partial<Record<keyof T, boolean>> = {};
  fieldsToValidate.forEach((x) => {
    if (!data[x] && data[x] !== 0) result[x] = true;
  });
  return {
    errorObj: result,
    hasError: Object.values(result).some((x) => x == true),
  };
}
