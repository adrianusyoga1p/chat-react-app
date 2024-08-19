import { userStore } from "@/store/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import GuardedRoute from "@/router/guard";
import Home from "./Home";
import Register from "./Register/Register";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = userStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <Loading />;
  return (
    <Routes>
      <Route element={<Login />} path="login" />
      <Route element={<Register />} path="register" />
      <Route
        path="/"
        element={
          <GuardedRoute auth={currentUser}>
            <Home />
          </GuardedRoute>
        }
      />
    </Routes>
  );
};

export default App;
