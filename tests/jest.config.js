const config = {
  verbose: true,
  forceExit: true,
  setupFilesAfterEnv: ["./jest.setup.js"],
  testEnvironmentOptions: {
    NODE_ENV: "test",
    PORT: 9000,
  },
};

module.exports = config;
