import { useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/common/loaders/Loader";
import { useTwitterAuth } from "@/components/hooks/useTwitterAuth";
import { useNavigate, useSearchParams } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oauth_token = searchParams.get("oauth_token");
  const oauth_verifier = searchParams.get("oauth_verifier");
  const denied = searchParams.get("denied");
  const { handleCallback, isLoading, error } = useTwitterAuth();

  useEffect(() => {
    if (denied) {
      // Case 1: User denied authorization
      toast.error("You denied access to the app. Please try again.");
      navigate("/");
    } else if (oauth_token && oauth_verifier) {
      // Case 2 & 3: User is signed in (either approved or needs to approve)
      handleCallback({ oauth_token, oauth_verifier });
    } else {
      // Case 4: Unexpected error or missing data
      toast.error("Authentication failed. Please try again.");
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oauth_token, oauth_verifier, denied]);

  return (
    <div className="callback-container">
      {isLoading && <Loader />}
      {!error && (
        <div className="error-box">
          <p>{"error?.message"}</p>
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default Callback;
