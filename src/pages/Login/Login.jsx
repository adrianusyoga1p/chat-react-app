import BaseInput from "@/components/BaseInput";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebase";
import Loading from "@/components/Loading";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
    } catch (err) {
      console.log(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6 grid md:grid-cols-2 bg-soft_primary h-screen">
      <div className="rounded-2xl h-full bg-primary max-md:hidden"></div>
      <div className="p-4 flex items-center justify-center">
        <form className="space-y-4" onSubmit={login}>
          <h1 className="text-center font-bold text-gray-700 text-2xl">
            Login
          </h1>
          <BaseInput
            label="Email"
            className="w-96"
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />
          <BaseInput
            type="password"
            label="Password"
            className="w-96"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />
          <button
            disabled={loading}
            type="submit"
            className="bg-primary p-3 rounded text-white flex w-full justify-center items-center"
          >
            Login
          </button>
          <p className="text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <NavLink to="/register" className="text-blue-500">Sign Up</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
