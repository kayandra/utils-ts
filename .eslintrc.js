module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-kydr`
  extends: ["kydr"],
  settings: {
    next: {
      rootDir: ["src/*/"],
    },
  },
};
