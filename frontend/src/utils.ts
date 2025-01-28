export const dateToString = (date: Date): string => {
  return date.toISOString().split("T")[0];
};
