export const formatDate = (
  dateString?: string,
  format: string = "dd/mm/yyyy"
): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day: string = String(date.getDate()).padStart(2, "0"); // Ensure two digits
  const month: string = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two digits
  const year: string = String(date.getFullYear());
  return format.replace("dd", day).replace("mm", month).replace("yyyy", year);
};
