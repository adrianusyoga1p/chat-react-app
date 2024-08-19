import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home";
import Register from "./Register/Register";

const App = () => {
  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route element={<Register />} path="/register" />
      <Route element={<Home />} path="/chat-app" />
    </Routes>
  );
};

export default App;
