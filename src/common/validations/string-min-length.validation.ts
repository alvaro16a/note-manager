export const StringMinLength = (value: string, min: number): boolean => {
  return value.length < min ? true : false;
};
