import BaseInput from "@/components/BaseInput";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";

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

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);

      await setDoc(doc(db, "users", res?.user?.uid), {
        username: res?.user?.displayName,
        email: res?.user?.email,
        avatar: res?.user?.photoURL,
        id: res?.user?.uid,
        blocked: [],
      });

      const userChatsRef = doc(db, "userchats", res?.user?.uid);
      const userChatsDoc = await getDoc(userChatsRef);

      if (!userChatsDoc.exists()) {
        await setDoc(userChatsRef, {
          chats: [],
        });
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 grid md:grid-cols-2 bg-soft_primary h-screen gap-4">
      <div className="rounded-2xl h-full bg-primary max-md:hidden"></div>
      <div className="p-4 flex items-center justify-center">
        <div className="space-y-4">
          <h1 className="text-center font-bold text-gray-700 text-2xl">
            Login
          </h1>
          <BaseInput
            label="Email"
            className="min-w-64 lg:min-w-96"
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
            className="min-w-64 lg:min-w-96"
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
            onClick={login}
            className={`bg-primary p-3 rounded text-white flex w-full justify-center items-center ${
              loading && "opacity-75"
            }`}
          >
            Login
          </button>
          <div className="flex w-full items-center gap-6">
            <div className="h-px bg-gray-300 w-full"></div>
            <p>or</p>
            <div className="h-px bg-gray-300 w-full"></div>
          </div>
          <div className="space-y-4">
            <button
              onClick={loginGoogle}
              className="bg-white border p-3 rounded flex w-full justify-center items-center"
            >
              Google
            </button>
          </div>
          <p className="text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <NavLink to="/register" className="text-blue-500">
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
