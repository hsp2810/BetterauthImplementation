export const getFormatedUsernameName = (
  username: string | null,
  name: string
): string => {
  if (!username) {
    return name.split(" ")[0];
  }

  return `@${username}`;
};
