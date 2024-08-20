import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home";
import Register from "./Register/Register";
import GuardedRoute from "@/router/guard";
import { PublicRoute } from "@/router/public";
import NotFound from "./NotFound/NotFound";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/chat-app"
        element={
          <GuardedRoute>
            <Home />
          </GuardedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
