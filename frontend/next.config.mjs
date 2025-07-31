/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      domains: ['res.cloudinary.com'],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "image.fonwall.ru",
        },
      ],
    },
};

export default nextConfig;
