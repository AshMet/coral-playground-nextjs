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
        source: '/',
        destination: '/diving/map',
        permanent: true,
      },
    ]
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      'avatars.dicebear.com',
      'ipfs.moralis.io',
      'rvlocxzrtjom.usemoralis.com',
      "vlqxftdcfuokmxeeffud.supabase.co",
      'localhost',
      'https://s3.eu-west-3.amazonaws.com/media.coralplayground.com',
      'coral-playground-api.herokuapp.com'
    ]
  }
};
