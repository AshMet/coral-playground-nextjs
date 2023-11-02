// const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
module.exports = {  //withPWA(
  // pwa: {
  //   disable:
  //     process.env.NODE_ENV === "development" ||
  //     process.env.NODE_ENV === "preview" ||
  //     process.env.NODE_ENV === "production",
  //   // delete two lines above to enable PWA in production deployment
  //   // add your own icons to public/manifest.json
  //   // to re-generate manifest.json, you can visit https://tomitm.github.io/appmanifest/
  //   dest: "public",
  //   register: true,
  // },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.ignoreWarnings = [
      {
        message: /(magic-sdk|@walletconnect\/web3-provider|@web3auth\/web3auth)/,
      }
    ]
    return config
  },
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  async redirects() {
    return [
      {
        source: '/diving/map ',
        destination: '/map ',
        permanent: true,
      },
      {
        source: '/diving/certifications ',
        destination: '/certifications ',
        permanent: true,
      },
      {
        source: '/diving/dive_sites ',
        destination: '/dive_sites ',
        permanent: true,
      },
      {
        source: '/diving/dive_centres ',
        destination: '/dive_centres ',
        permanent: true,
      },
      {
        source: '/diving/booking ',
        destination: '/booking ',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      'avatars.dicebear.com',
      'ipfs.moralis.io',
      'rvlocxzrtjom.usemoralis.com',
      'tfpamgcqwydaqamjcxpu.supabase.co',
      'stzgaygfnnszcvhmnbqy.supabase.co',
      'trrwzjpbcilwehezrxqn.supabase.co',
      'localhost',
    ]
  }
};
