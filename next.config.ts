import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

const config: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
}

export default withNextIntl(config)
