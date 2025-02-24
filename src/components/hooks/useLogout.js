import Cookies from "@/services/cookies";
import { useDispatch } from "react-redux";
import { getLogout } from "@/modules/login/slice/loginSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(getLogout());
    Cookies.clear();
  };
  return { logout };
};
