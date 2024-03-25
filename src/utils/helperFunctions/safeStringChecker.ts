export const safeStringChecker = (
  value: string | undefined,
  fallback: string
) => {
  return value !== undefined ? value : fallback;
};
