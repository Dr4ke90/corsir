export const formatDate = (date) => {
  const options = { month: "2-digit", day: "2-digit", year: "numeric" };
  return date.toLocaleDateString("ro-RO", options);
};
