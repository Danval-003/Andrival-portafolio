/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "Andrival-portafolio";

const nextConfig = {
  output: "export",
  // Prefijo para las rutas internas
  basePath: isGithubActions ? `/${repoName}` : "",
  // Prefijo para los assets estáticos
  assetPrefix: isGithubActions ? `/${repoName}/` : "",
};

module.exports = nextConfig;
