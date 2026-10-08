import { createServer } from "vite";
import config from "../../vite.config.js";

const server = await createServer({ ...config, configFile: false, server: { host: "127.0.0.1", port: 4180, strictPort: true } });
await server.listen();
