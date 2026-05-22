"use client";
import React, { useEffect, useState } from "react";
interface ErrorData {
  success: boolean;
  isVerified: boolean;
}
interface ErrorResponse {
  data: ErrorData;
}

import {
  MdOutlinePassword,
  MdOutlineMailOutline,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaRegEyeSlash, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import jwt from "jsonwebtoken";

import { useAuth } from "@/hooks/useAuth";
import {
  resetAuth,
  setAuth,
  setUserProfile,
} from "@/lib/redux/slices/authSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineMail } from "react-icons/ai";
import { set } from "react-hook-form";
import { useWebSocket } from "@/providers/WebSocketContext";

const notify = () => {
  toast.success("Logged in Successfully", {
    position: "bottom-center",
    autoClose: 7000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    style: {
      color: "#fff",
      backgroundColor: "#3563E9",
      padding: "0px",
    },
  });
};

type Props = {};

export default function Login({}: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const auth = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const { connectWebSocket } = useWebSocket();

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    const res = await auth.loginHandler({ email, password });

    if (res && "data" in res) {
      if (res.data.success && res.data.isVerified) {
        const decodedToken: any = jwt.decode(res.data.token);
        const userType = decodedToken.typ;
        const userId = decodedToken.userid;
        
        localStorage.setItem("userId", userId);
        connectWebSocket(userId);
        notify();

        // Redirect based on userType
        switch (userType) {
          case "admin":
            router.push("/admin/dashboard");
            break;
          case "manager":
            router.push("/manager/dashboard");
            break;
          case "subordinate":
            router.push("/subordinate/dashboard");
            break;
          case "user":
            router.push("/user/dashboard");
            break;
          default:
            router.push("/");
            break;
        }
      }
    } else if (res && res.error && "data" in res.error) {
      const errorData = res.error.data as ErrorResponse['data'];
      if (errorData.success && !errorData.isVerified) {
        router.push("/signup/verify-otp?email=" + email);
      }
    }
  };

  return (
    <div className="h-full flex items-center justify-center font-[Poppins]">
      <div className="w-2/3 gap-4">
        <h1 className="text-2xl text-center font-roboto pb-4 text-[#333333] mb-3">
          LOGIN
        </h1>

        {auth.auth.error &&
          auth.auth.error.data &&
          !auth.auth.error.data.success && (
            <div className="w-full border border-red-600/50 text-red-600 rounded-lg py-2.5 text-sm font-light flex items-center s space-x-3 mb-3 pl-3">
              <Image
                src="/images/sign-error.svg"
                width={20}
                height={20}
                alt="error sign"
                className="object-contain cursor-pointer"
                onClick={() => dispatch(resetAuth())}
              />
              <p>
                {auth.auth.error?.status === "FETCH_ERROR"
                  ? "Network Error"
                  : auth.auth.error?.data.message}
              </p>
            </div>
          )}

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-2 mb-3 text-secondary"
        >
          {/* Email */}

          <div className="relative">
            <AiOutlineMail className="absolute left-3 top-[14px] text-secondary font-light text-sm" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="text-xs py-3 text-secondary border-blue-200 leading-4 border w-full outline-none pl-10 rounded-lg  px-3  focus:outline-none focus:ring-1 focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="email-input"
            />
          </div>
          {/* Password */}
          <div className="relative">
            <MdOutlinePassword className="text-secondary absolute left-3 top-[13px] font-light text-sm" />
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
              required
              className="text-xs py-3 border-blue-200 text-secondary leading-4 border w-full outline-none pl-10 rounded-lg  px-3  focus:outline-none focus:ring-1 focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="password-input"
            />
            {isVisible ? (
              <MdOutlineRemoveRedEye
                className="text-secondary cursor-pointer absolute top-[14px] right-[13px] text-sm"
                onClick={() => setIsVisible(false)}
              />
            ) : (
              <FaRegEyeSlash
                className="text-secondary cursor-pointer absolute top-[14px] right-[13px] text-sm"
                onClick={() => setIsVisible(true)}
              />
            )}
            {errorMessage && (
              <span className="text-red-500">
                Email or password is incorrect
              </span>
            )}
          </div>

          <button
            className="bg-primarykey font-roboto text-sm border-transparent  py-3 text-white cursor-pointer hover:bg-custom-blue/75 transition duration-150 ease-linear rounded-lg w-full mx-auto mt-4"
            type="submit"
            data-testid="login-button"
            disabled={auth.auth.isLoading}
          >
            {auth.auth.isLoading ? (
              <div className="flex items-center justify-center gap-x-3 bg-transparent">
                <div className="spinner"></div>
                <span>Processing . . .</span>
              </div>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>

        <div className="flex items-center justify-end w-full">
          <p>
            <Link
              href="/reset-password"
              className="cursor-pointer text-secondary hover:text-blue-500 transition  duration-150 ease-linear text-xs hover:underline"
            >
              Forgot password
            </Link>
          </p>
        </div>

        <div className="flex flex-row items-center w-full my-4 mx-auto">
          <div className="flex-grow bg-gray-600/25 h-[1px] "></div>
          <div className="px-5 text-gray-600 ">or</div>
          <div className="flex-grow bg-gray-600/25 h-[1px] "></div>
        </div>

        <div className="space-y-4">
          <button className=" py-2  text-white w-full flex justify-center items-center border-none cursor-pointer hover:bg-background rounded-3xl">
            <span className="flex flex-row items-center">
              <FcGoogle className="m-1 mx-5 text-base" />
              <div className="pr-2 text-gray-900 text-sm font-medium">
                Continue with Google
              </div>
            </span>
          </button>
        </div>

        <div className="text-center pt-2 mt-3">
          <div className="text-sm flex justify-center items-center">
            <p className="text-black">I don{"'"}t have an account?</p>
            <Link href="/signup" className=" font-medium pl-2">
              <span className="text-primary hover:underline">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
