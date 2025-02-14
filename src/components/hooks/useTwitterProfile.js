import { fetchProfileDetail } from "@/modules/profile/slice/ProfileSlice";
import Cookies, { cookieKeys } from "@/services/cookies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useTwitterProfile = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const User = Cookies.get(cookieKeys?.USER_DETAILS);
        if (!User || Object.keys(User)?.length === 0) {
          dispatch(fetchProfileDetail()).then((status) => {
            if (status?.payload?.data?.user) {
              Cookies.set(
                cookieKeys?.USER_DETAILS,
                status?.payload?.data?.user
              );
              setProfile(status?.payload?.data?.user);
            }
          });
        } else {
          setProfile(User);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  });

  return { profile, isLoading, error };
};
