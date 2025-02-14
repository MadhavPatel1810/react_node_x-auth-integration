import routesConstants from "./routesConstants";
import { Login, Profile, TwitterCallback } from "./routeImports";

const routesConfig = {
  common: [],
  private: [
    {
      path: routesConstants.PROFILE,
      component: Profile,
    },
  ],
  public: [
    { path: routesConstants?.LOGIN, component: Login },
    { path: routesConstants?.TWITTER_CALLBACK, component: TwitterCallback },
  ],
};

export default routesConfig;
