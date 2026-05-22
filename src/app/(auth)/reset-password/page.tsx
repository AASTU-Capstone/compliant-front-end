"use client";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { AiOutlineMail } from "react-icons/ai";
// import Link from "next/link";
// import { CiUser } from "react-icons/ci";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { useForgotPasswordMutation } from "@/lib/redux/features/user";

type Props = {};

export default function SignUp({}: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const {
    forgotPasswordHandler,
    auth: { isLoading },
  } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || email === null) {
      setError("Email is required");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Email is not valid");
      return;
    }
    setError("");
    sessionStorage.setItem("email", email);
    try {
      const res = await forgotPasswordHandler({ email: email });
      if (res && "data" in res && res?.data?.success) {
        router.push("/reset-password/verify-otp");
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setEmail(event.target.value);
  };

  return (
    <div className="flex justify-center items-center h-full font-[Poppins]">
      <div className=" w-full gap-4 flex flex-col items-center space-y-2">
        <h1 className="text-2xl text-center font-roboto text-[#333333]">
          FORGOT PASSWORD
        </h1>
        <p className="text-center text-xs text-[#989898] mb-2">
          Please enter your email to reset the password
        </p>

        {/* Form | Email */}
        <form
          onSubmit={handleSubmit}
          className="gap-2 flex flex-col items-center justify-center w-full  "
        >
          <div className="gap-y-3 w-full">
            <div className="relative w-full">
              <AiOutlineMail className="absolute left-[100px] top-[14px] font-light text-sm" />
              <div className="flex justify-center items-center w-full">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Your Email"
                  className="text-sm py-3 w-3/4 border-blue-200 text-secondary leading-4 border outline-none pl-10 rounded-lg  px-3  focus:outline-none focus:ring-1 focus:ring-blue-300"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 w-full justify-center items-center mt-3">
              <button
                type="submit"
                className="bg-primarykey font-roboto text-sm border-transparent py-3 text-white cursor-pointer hover:bg-custom-blue/75 transition duration-150 ease-linear rounded-lg w-1/3 mx-auto mt-4"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-x-3 bg-transparent">
                    <div className="spinner"></div>
                    <span>Processing . . .</span>
                  </div>
                ) : (
                  <span>Reset Password</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
