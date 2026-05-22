"use client";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Suspense } from "react";
import { useCreateOTPMutation } from "@/lib/redux/features/user";
import { useVerifyAccountMutation } from "@/lib/redux/features/user";

const MyComponent = () => {
  const [createOTP] = useCreateOTPMutation();
  const [verifyAccount, { isLoading }] = useVerifyAccountMutation();

  const [values, setValues] = useState(Array(6).fill(""));
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email") || "";

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResendCode = async () => {
    const res = await createOTP({ email });
    console.log(res);
    setTimer(60);
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValues = [...values];
    const value = event.target.value;

    if (value.match(/^[0-9]$/)) {
      newValues[index] = value;
      setValues(newValues);
      if (index < values.length - 1) {
        const nextInput = document.getElementById(`input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else if (value === "") {
      newValues[index] = value;
      setValues(newValues);
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && values[index] === "") {
      if (index > 0) {
        const prevInput = document.getElementById(`input-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    const res = await verifyAccount({ email, OTPCode: values.join("") });
    if (res && "data" in res) {
      if (res.data.success) {
        router.push(`/success`);
      }
    }
  };

  const handlePaste = (
    index: number,
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const pasteValue = event.clipboardData.getData("text");
    const newValues = [...values];
    const pasteArray = pasteValue.split("").slice(0, values.length - index);

    for (let i = 0; i < pasteArray.length; i++) {
      newValues[index + i] = pasteArray[i];
    }

    setValues(newValues);

    if (index + pasteArray.length < values.length) {
      const nextInput = document.getElementById(
        `input-${index + pasteArray.length}`
      );
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-full font-[Poppins]">
      <div className="w-1/2 gap-4 flex flex-col items-center space-y-2">
        <h1 className="text-2xl text-center font-roboto text-onSurface">
          CHECK YOUR EMAIL
        </h1>

        <p className="text-center text-xs text-[#777777] px-4 whitespace-normal">
          We{"'"}ve sent a verification code to {email}. Please enter the
          6-digit code below to verify your account
        </p>

        {/* Input Boxes */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-center items-center px-10">
            {values.map((value, index) => (
              <input
                key={index}
                id={`input-${index}`}
                type="text"
                className="border-[0.5px] border-gray-400 text-xl text-center w-1/3 h-10 focus:outline-none focus:shadow-none rounded-lg m-2"
                value={value}
                maxLength={1}
                onChange={(event) => handleChange(index, event)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onPaste={(event) => handlePaste(index, event)}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="text-gray-500 cursor-pointer underline text-sm rounded-xl px-5 py-2"
              onClick={handleResendCode}
              disabled={timer > 0}
            >
              {timer > 0 ? `Resend Code (${timer})` : "Resend Code"}
            </button>
          </div>

          {/* Verify Button */}
          <div className="flex justify-center">
            <button
              className="bg-primarykey text-xs border-transparent py-3 text-white cursor-pointer hover:bg-custom-blue/75 transition duration-150 ease-linear rounded-lg px-12 mx-auto mt-4 text-center"
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-x-3 bg-transparent">
                  <div className="spinner"></div>
                  <div>Processing . . .</div>
                </div>
              ) : (
                <span>Verify code</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <MyComponent />
    </Suspense>
  );
};

export default Page;
