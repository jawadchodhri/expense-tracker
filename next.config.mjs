/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // This forwards all /api calls to my Express backend on localhost!
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },
};

export default nextConfig;