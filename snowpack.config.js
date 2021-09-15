import * as R from "ramda";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const fileURLToDir = R.pipe(fileURLToPath, dirname);

const filepath = fileURLToDir(import.meta.url);

const abs = (rel) => path.join(filepath, rel);

export default {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/" },
  },
  alias: {
    perf_hooks: "./src/benchmarking/universal-performance.js",
  },
  exclude: [abs("src/**/test/**"), abs("src/testing/print-tree.js")],
  devOptions: {
    open: "none",
  },
};
