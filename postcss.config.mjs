import { createRequire } from "node:module";
import { join } from "node:path";

// Load the plugin here. A plugin name in the config object is required from
// Turbopack's worker, which cannot see this package under pnpm.
const require = createRequire(join(process.cwd(), "postcss.config.mjs"));
const tailwindcss = require("@tailwindcss/postcss");

export default {
  plugins: [tailwindcss()],
};
