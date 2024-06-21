import { env } from "../../env";

export const serverURI =
  env.REACT_APP_VITE_BACKEND_API || import.meta.env.VITE_BACKEND_API;
