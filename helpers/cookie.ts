import Cookie from "js-cookie";

export const getDataFromCookie = (key: string): string | undefined => {
  return Cookie.get(key);
};

export const setDataFromCookie = (key: string, value: any): void => {
  Cookie.set(key, value);
};

export const removeDataFromCookie = (key: string): void => {
  Cookie.remove(key);
};
