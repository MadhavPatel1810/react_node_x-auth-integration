import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTwitterAuth } from "@/components/hooks/useTwitterAuth";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams?.get("code");
  const { handleCallback, isLoading, error } = useTwitterAuth();

  useEffect(() => {
    if (code) {
      handleCallback(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <div>
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: "red" }}>{error.message}</p> : null}
    </div>
  );
};

export default Callback;
