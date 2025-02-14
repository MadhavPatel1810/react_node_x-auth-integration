import { lazy } from "react";
//Authentication
export const Login = lazy(() => import("@/modules/login/pages"));
//My Profile
export const Profile = lazy(() => import("@/modules/profile/pages"));
//Twitter Callback
export const TwitterCallback = lazy(() =>
  import("@/modules/login/components/Callback")
);
