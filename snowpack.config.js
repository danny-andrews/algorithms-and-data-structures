export default {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/" },
  },
  alias: {
    perf_hooks: "./src/client/universal-performance.js",
  },
  exclude: ["**/test/**/*"],
};
