const obtainAssetUrl = (asset: string): string => {
  const isGithubActions = process.env.GITHUB_ACTIONS === "true";
  const repoName = "Andrival-portafolio";
  const basePath = isGithubActions ? `/${repoName}` : "";
  return `${basePath}${asset}`;
};

export default obtainAssetUrl;
