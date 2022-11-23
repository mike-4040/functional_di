import { DEFAULT_PORT } from "../constants.js";
const port = process.env.PORT || DEFAULT_PORT;

export const serverReady = () =>
  console.log(`Server listening on 'http://localhost:${port}'`);
