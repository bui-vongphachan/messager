/** @type {import('next').NextConfig} */

const regexEqual = (x, y) =>
  x instanceof RegExp &&
  y instanceof RegExp &&
  x.source === y.source &&
  x.global === y.global &&
  x.ignoreCase === y.ignoreCase &&
  x.multiline === y.multiline;

module.exports = {
  reactStrictMode: false,
  distDir: "build",
  images: {
    loader: 'imgix',
    path: 'https://platform-lookaside.fbsbx.com/',
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/home" },
      "/login": { page: "/login" },
    };
  },
};
