import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Con la barra final los anchors quedan /es/#home y no /es#home.
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
