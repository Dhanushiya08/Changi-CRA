export const objectToBase64 = (obj: any) => {
  const jsonString = JSON.stringify(obj);
  const base64String = btoa(jsonString);
  return base64String;
};
