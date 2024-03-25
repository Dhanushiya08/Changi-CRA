export function addUniqueKey(dataArray: any[]) {
  return dataArray.map((obj: any, index: any) => {
    return { ...obj, key: index };
  });
}
