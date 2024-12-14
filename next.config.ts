import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    return config; // Não altere o processamento de estilos
  },
  images:{
    remotePatterns:[
      {
        hostname: 'res.cloudinary.com'
      }
    ]
  }
};

export default nextConfig;
