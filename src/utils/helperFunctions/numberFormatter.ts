export const numberFormatter = (val: number | string) => {
  if (isNaN(Number(val))) {
    return 0;
  } else {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(Number(val));
  }
};
export function calculatePercentageChange(
  today: number,
  lastweek: number
): number {
  if (today === 0) {
    return 0;
  }
  if (lastweek === 0) {
    return 0;
  }
  const percentageChange = ((today - lastweek) / Math.abs(lastweek)) * 100;
  if (isNaN(percentageChange)) {
    return 0;
  }
  return parseFloat(percentageChange.toFixed(2));
}
export function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
type DateFormatOptions = Intl.DateTimeFormatOptions;
export const formatDate = (createdAt: any) => {
  const date = new Date(createdAt);
  const dateFormatOptions: DateFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-US", dateFormatOptions);
};
export const toPascalCase = (text: any, trimSpace = false) =>
  text
    .split(" ")
    .map((t: any) => t[0].toUpperCase() + t.slice(1).toLowerCase())
    .join(trimSpace ? "" : " ");
