import { preview } from "vite";
import config from "../../vite.config.js";

await preview({ ...config, configFile: false, preview: { host: "127.0.0.1", port: 4181, strictPort: true } });
