export const IsInRange = (value: number, min: number, max: number): boolean => {
  return value <= max && value >= min ? true : false;
};
