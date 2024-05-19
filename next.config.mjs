/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: (function () {
      const envs = process.env;

      const srcs = Object.keys(envs).filter((key) =>
        key.startsWith('IMAGES_SRC'),
      );

      return srcs.map((key) => {
        const url = new URL(envs[key]);
        return {
          hostname: url.hostname,
          pathname: url.pathname,
          port: url.port,
          protocol: url.protocol.split(':')[0],
        };
      });
    })(),
  },
};

export default nextConfig;
