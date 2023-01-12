export enum ExternalURL {
  discord,
  twitter,
  notion,
  discourse,
  iris,
}

export const externalURL = (externalURL: ExternalURL) => {
  switch (externalURL) {
    case ExternalURL.discord:
      return 'http://discord.gg/4CJc74JEUY';
    case ExternalURL.twitter:
      return 'https://twitter.com/socialnouns';
    case ExternalURL.notion:
      return 'https://github.com/irislib/iris/wiki/Welcome';
    case ExternalURL.discourse:
      return 'https://discourse.nouns.wtf/';
    case ExternalURL.iris:
      return 'https://iris.to/#/profile/GcpgxrcFMk_iRZErLfI0pRq-AiySWc6BAm8PrCNOMec.1ytS7WnHU8HjqXN-mfH0iQocco9BhthSVEViBoFPU_I';
  }
};
