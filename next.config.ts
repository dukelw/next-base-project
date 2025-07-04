import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withPlugins from "next-compose-plugins";

const withNextIntl = createNextIntlPlugin("./src/i18n/i18n.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloudinary-marketing-res.cloudinary.com",
      },
    ],
  },
};

export default withPlugins([withNextIntl], nextConfig);
