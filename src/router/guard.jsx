import Loading from "@/components/Loading";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GuardedRoute = ({ auth, children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (auth != null) {
      navigate("/chat-app", { replace: true });
    } else if (auth == null) {
      navigate("/", { replace: true });
    }
  }, [auth, navigate]);
  return auth ? children : <Loading />;
};

export default GuardedRoute;
