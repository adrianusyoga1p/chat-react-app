import Loading from "@/components/Loading";
import { userStore } from "@/store/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const GuardedRoute = ({ children }) => {
  const { currentUser, isLoading, fetchUserInfo } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        return navigate("/", { replace: true });
      } else {
        fetchUserInfo(user?.uid);
        navigate("/chat-app", { replace: true });
      }
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo, navigate]);

  useEffect(() => {
    if (!isLoading && !currentUser) {
      return navigate("/", { replace: true });
    }
  }, [isLoading, currentUser, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return currentUser ? children : null;
};

export default GuardedRoute;
