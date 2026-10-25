import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Preserve the published WordPress navigation URLs during the redesign.
  redirects() {
    return [
      { source: "/meet-the-cast", destination: "/cast", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
