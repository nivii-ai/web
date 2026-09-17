import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const ONE_PAGER_FILE = "/nivii-one-pager-en.pdf";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Con la barra final los anchors quedan /es/#home y no /es#home.
  trailingSlash: true,
  async rewrites() {
    return [{ source: "/onepager", destination: ONE_PAGER_FILE }];
  },
  async headers() {
    return [
      {
        source: ONE_PAGER_FILE,
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/onepager",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
