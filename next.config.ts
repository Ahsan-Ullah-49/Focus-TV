import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: { qualities: [75, 90, 95, 100] },
  // Send retired project and legacy URLs to their current destinations.
  redirects() {
    return [
      { source: "/cast", destination: "/production-services", permanent: false },
      { source: "/meet-the-cast", destination: "/production-services", permanent: false },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
