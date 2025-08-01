/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "Andrival-portafolio";
const basePath = isGithubActions ? `/${repoName}` : "";
const assetPrefix = isGithubActions ? `/${repoName}/` : "";
console.log("Base Path:", basePath);
console.log("Asset Prefix:", assetPrefix);

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix,
  images: {
    // ← Desactiva la optimización en tiempo real
    unoptimized: true,
  },
};

module.exports = nextConfig;
