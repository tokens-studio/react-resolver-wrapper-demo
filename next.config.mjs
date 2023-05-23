// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://nextjs.org/docs/basic-features/image-optimization


/** @type {import('next').NextConfig} */
const config = {
  swcMinify: true,
  // transpilePackages:['../second-screen'],
  reactStrictMode: true,
  experimental: { optimizeCss: true },
  compiler: { removeConsole: process.env.NODE_ENV === 'production' },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['raw.githubusercontent.com'],
  },
  output: 'export',
  publicRuntimeConfig: {
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.tokens$/,
      type: 'asset/source',
      generator: {
        filename: 'static/chunks/[path][name].[hash][ext]'
      },
    });

    return config;
  }
};


export default config;
