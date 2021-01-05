module.exports = {
  mount: {
    public: "/",
    src: "/",
  },
  plugins: [["@snowpack/plugin-sass", {}], "@snowpack/plugin-typescript"],
  buildOptions: {
    sourceMaps: true,
  },
  experiments: {
    optimize: {
      bundle: false,
      minify: true,
      target: "es2020",
    },
  },
};
