import { userStore } from "@/store/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

export const PublicRoute = ({ children }) => {
  const { currentUser, fetchUserInfo, isLoading } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserInfo(user.uid);
        navigate("/chat-app", { replace: true });
      } else {
        return navigate("/", { replace: true });
      }
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo, navigate]);

  useEffect(() => {
    if (!currentUser && !isLoading) {
      return navigate("/", { replace: true });
    }
  }, [currentUser, navigate, isLoading]);

  return !currentUser ? children : null;
};
