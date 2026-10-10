export default function validateField<T>(
  data: T,
  fieldsToValidate: (keyof T)[],
) {
  const result: Partial<Record<keyof T, boolean>> = {};

  fieldsToValidate.forEach((field) => {
    if (!data[field] && data[field] !== 0) {
      result[field] = true;
    }
  });

  return {
    errorObj: result,
    hasError: Object.values(result).some((value) => value === true),
  };
}
