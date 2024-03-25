export function sortByLatestDateTop(array: any[], property: string): any[] {
  return array.sort(
    (a, b) => new Date(b[property]).getTime() - new Date(a[property]).getTime()
  );
}
