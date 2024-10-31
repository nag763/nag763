/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            __dirname: false, // Ignorer __dirname dans Webpack
            __filename: false,
        }
        return config;
    }
};

export default nextConfig;
