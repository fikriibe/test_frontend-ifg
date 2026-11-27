import createWebStorage from "redux-persist/lib/storage/createWebStorage";


const createNoopStorage = () => ({
  getItem: async () => null,
  setItem: async (_key: string, value: string) => value,
  removeItem: async () => {},
});

const storage =
  typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export default storage;
