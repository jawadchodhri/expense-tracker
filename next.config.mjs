/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // When running locally on your laptop, it goes to localhost:5000
        // When running on Vercel, it forwards to your live Render backend!
        destination:
          process.env.NODE_ENV === "production"
            ? "https://expense-tracker-backend-9yqm.onrender.com/api/:path*"
            : "http://localhost:5000/api/:path*",
      },
    ];
  },
};

export default nextConfig;