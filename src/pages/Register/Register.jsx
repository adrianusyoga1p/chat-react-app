import BaseInput from "@/components/BaseInput";
import { useState } from "react";
import { useSwal } from "@/lib/useSwal";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import upload from "@/firebase/upload";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const Swal = useSwal();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.username || !form.email || !form.password) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter inputs!",
      });
    }

    const userRefs = collection(db, "users");
    const q = query(userRefs, where("username", "==", form.username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please input another username",
      });
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const imgAvatar = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username: form.username,
        email: form.username,
        avatar: imgAvatar,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      return navigate("/", { replace: true });
    }
  };

  return (
    <div className="p-6 grid md:grid-cols-2 bg-soft_primary h-screen">
      <div className="rounded-2xl h-full bg-primary max-md:hidden"></div>
      <div className="p-4 flex items-center justify-center">
        <form className="space-y-4" onSubmit={register}>
          <h1 className="text-center font-bold text-gray-700 text-2xl">
            Register
          </h1>
          <BaseInput
            label="Username"
            className="w-96"
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
          />
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
          {avatar.url && (
            <img
              src={avatar.url || "./avatar.png"}
              className="w-20 h-20 object-contain"
            />
          )}
          <BaseInput
            id="uploadImg"
            type="file"
            onChange={handleAvatar}
            label="Upload your avatar"
          />
          <button
            disabled={loading}
            type="submit"
            className={`bg-primary p-3 rounded text-white flex w-full justify-center items-center ${
              loading && "opacity-75"
            }`}
          >
            {loading ? "Loading.." : "Register"}
          </button>
          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <NavLink className="text-blue-600" to="/">
              Log in
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
