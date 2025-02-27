/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "image.fonwall.ru",
          },
        ],
      },
};

export default nextConfig;
