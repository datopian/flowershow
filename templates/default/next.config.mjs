import { withContentlayer } from 'next-contentlayer';

export default withContentlayer({
  webpack: (config) => {
    config.infrastructureLogging = {
      level: 'error',
    };
    config.module = {
      rules: [
        {
          test: '**/*',
          exclude: [
            './content',
          ],
        },

      ],
    };
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
