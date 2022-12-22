const nrwlConfig = require("@nrwl/react/plugins/bundle-rollup");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
// const commonjs = require("@rollup/plugin-commonjs");

module.exports = (config) => {
  const nxConfig = nrwlConfig(config);
  return {
    ...nxConfig,
    plugins: [nodeResolve(), ...nxConfig.plugins],
  };
};
