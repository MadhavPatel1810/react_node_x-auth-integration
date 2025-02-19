import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTwitterAuth } from "@/components/hooks/useTwitterAuth";

const Callback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams?.get("code");
  const authError = searchParams?.get("error");
  const state = searchParams?.get("state");
  const { handleCallback, isLoading, error } = useTwitterAuth();

  useEffect(() => {
    if (authError) {
      if (authError === "access_denied") {
        toast.error("You denied access to the app. Please try again.");
      } else {
        toast.error(
          "An error occurred during authorization. Please try again."
        );
      }
      navigate("/");
    } else if (code) {
      handleCallback(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, authError, state]);

  return (
    <div>
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: "red" }}>{error.message}</p> : null}
    </div>
  );
};

export default Callback;
