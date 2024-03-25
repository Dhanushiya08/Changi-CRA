export const getUserCookie: any = (name: string) => {
  var ckyName = name || "user";
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === ckyName) {
      let decoded = decodeURIComponent(cookie[1]);
      return JSON.parse(atob(decoded));
    }
  }

  return null;
};
export const removeUserCookie = (name: string) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

};