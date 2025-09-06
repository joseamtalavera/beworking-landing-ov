/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // enables static export
  images: { unoptimized: true } // required if you use next/image with export
};

export default nextConfig;
