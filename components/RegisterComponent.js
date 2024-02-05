import React, { useState } from "react";
import Link from "next/link";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export const RegisterComponent = () => {
  console.log(auth?.currentUser?.email);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errMsg, SetErrMsg] = useState(null);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const notify = () => {
    toast.success("User signed up successfully");
  };

  const signup = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add the userName to the user profile
      await updateProfile(userCredential.user, { displayName: userName });

      console.log("User signed up successfully!");
      notify();
      router.push("/auth/login", { scroll: false });
    } catch (err) {
      console.log(err);
      SetErrMsg(err.message);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen ">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Logo</h1>
        <form className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="text"
              className="block text-sm font-semibold text-gray-800"
            >
              Full name
            </label>
            <input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          {errMsg && <center style={{ color: "red" }}>{errMsg}</center>}
          <div className="mt-8">
            <button
              onClick={signup}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200  bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};
