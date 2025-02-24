import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Cookies, { cookieKeys } from "@/services/cookies";
import { fetchProfileDetail } from "@/modules/profile/slice/ProfileSlice";

export const useTwitterProfile = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const User = Cookies.get(cookieKeys?.USER_DETAILS);
        if (!User || Object.keys(User)?.length === 0) {
          dispatch(fetchProfileDetail()).then((status) => {
            if (!status?.payload?.message) {
              Cookies.set(cookieKeys?.USER_DETAILS, status?.payload);
              setProfile(status?.payload);
            }
          });
          setIsLoading(false);
        } else {
          setProfile(User);
        }
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { profile, isLoading, error };
};
