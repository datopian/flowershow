export default {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/@:org/:slug*",
          destination: "/@org/:org/:slug*",
        },
      ],
    };
  },
  webpack: (config) => {
    config.infrastructureLogging = {
      level: "error",
    };
    return config;
  },
};
