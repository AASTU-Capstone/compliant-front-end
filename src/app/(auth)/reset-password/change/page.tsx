"use client";
import React, { useState } from "react";
import { MdOutlinePassword, MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import jwt  from "jsonwebtoken";

type Props = {};

export default function SignUp({}: Props) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [previousPassword, setPreviousPassword] = useState<string>("");
  const [error, setError] = useState("");
  const {
    resetPasswordHandler,
    auth: { isLoading },
  } = useAuth();
  var email: string =
    typeof window !== "undefined" ? sessionStorage.getItem("email") ?? "" : "";

  if(!email){
    const token = decodeURIComponent(typeof window !== "undefined" ? document.cookie : "")
    .split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];
    const decodedToken: any = jwt.decode(token || "");
    email= decodedToken?.useremail
  }
  const router = useRouter();

  const notify = () => {
    toast.success("Password Changed Successfully", {
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      newPassword === "" ||
      newPassword === null ||
      confirmPassword === "" ||
      confirmPassword === null
    ) {
      setError("Password and Confirm Password are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }
    if (newPassword === previousPassword) {
      setError("Password should not be the same as the previous one");
      return;
    }
    setError("");
    console.log("Password:", newPassword);
    const res = await resetPasswordHandler({ newPassword, email });
    console.log("res", res);
    if (res && "data" in res && res?.data?.success) {
      console.log("Password reset successfully");
      notify();
      router.push("/password-updated");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div className="flex justify-center items-center h-full w-full font-[Poppins]">
      <div className="flex flex-col justify-center items-center gap-4 w-2/3 space-y-3">
        <h1 className="text-2xl text-center font-roboto text-onSurface capitalize">
          RESET YOUR PASSWORD
        </h1>
        <p className="text-center text-sm text-[#989898] mb-2 px-3">
          Create a new password. Ensure it differs from previous ones for
          security.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full px-4 flex flex-col space-y-4"
        >
          <div className="relative">
            <MdOutlinePassword className="text-secondary absolute left-3 top-[12px] text-sm" />
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Password"
              className="text-xs py-3 border-blue-200 text-secondary leading-4 border w-full outline-none pl-10 rounded-lg  px-3  focus:outline-none focus:ring-1 focus:ring-blue-300"
              value={newPassword}
              onChange={handlePasswordChange}
            />
            {isVisible ? (
              <MdOutlineRemoveRedEye
                className="text-secondary cursor-pointer absolute top-3 right-[15px] text-sm"
                onClick={() => setIsVisible(!isVisible)}
              />
            ) : (
              <FaRegEyeSlash
                className="text-secondary cursor-pointer absolute top-3 right-[15px] text-sm"
                onClick={() => setIsVisible(!isVisible)}
              />
            )}
          </div>

          <div className="relative">
            <MdOutlinePassword className="text-secondary absolute left-3 top-[12px] text-sm" />
            <input
              type={isConfirmVisible ? "text" : "password"}
              placeholder="Confirm Password"
              className="text-xs py-3 border-blue-200 text-secondary leading-4 border w-full outline-none pl-10 rounded-lg  px-3  focus:outline-none focus:ring-1 focus:ring-blue-300"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {isConfirmVisible ? (
              <MdOutlineRemoveRedEye
                className="text-secondary cursor-pointer absolute top-3 right-[15px] text-sm"
                onClick={() => setIsConfirmVisible(!isConfirmVisible)}
              />
            ) : (
              <FaRegEyeSlash
                className="text-secondary cursor-pointer absolute top-3 right-[15px] text-sm"
                onClick={() => setIsConfirmVisible(!isConfirmVisible)}
              />
            )}
          </div>

          <div className="flex flex-col gap-1 justify-center items-center">
            {/* error message */}
            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Update password button */}
            <button
              className="bg-primarykey font-roboto text-sm border-transparent py-3 text-white cursor-pointer hover:bg-custom-blue/75 transition duration-150 ease-linear rounded-lg px-8 mx-auto mt-4"
              type="submit"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
