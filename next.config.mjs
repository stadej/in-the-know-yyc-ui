/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '8080',
            pathname: '/api/files/download/**',
          },
          {
            protocol: 'http',
            hostname: 'intheknowyyc.ca',
            pathname: '/api/files/download/**',
          },
        ],
      },
};

export default nextConfig;
