export const textToInitials = (text: string) => {
  if (!text.includes(" ") || text.split(" ").length > 2)
    return text.charAt(0).toUpperCase();
  return text
    .split(" ")[0]
    .charAt(0)
    .toUpperCase()
    .concat(text.split(" ")[1].charAt(0).toUpperCase());
};
