"use client";
import { useAuth } from "@/hooks/useAuth";
import { useVerifyAccountMutation } from "@/lib/redux/features/user";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
// import { useVerifyOTPMutation } from "@/lib/redux/features/user";

const MyComponent = () => {
  const [values, setValues] = useState(Array(6).fill(""));
  // const [verifyOTP, { isSuccess, isLoading, error }] = useVerifyOTPMutation();

  const [timer, setTimer] = useState(60);

  const email: string =
    typeof window !== "undefined" ? sessionStorage.getItem("email") ?? "" : "";
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResendCode = () => {
    console.log("Resend code");
    setTimer(60);
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
    if (index < values.length - 1 && event.target.value) {
      if (typeof window !== "undefined") {
        const nextInput = document.getElementById(`input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const [verifyAccount, { isLoading }] = useVerifyAccountMutation();

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    const res = await verifyAccount({ email, OTPCode: values.join("") });
    if (res && "data" in res) {
      if (res.data.success) {
        console.log("verified account");
        router.push(`/reset-password/change`);
      }
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

  const handlePaste = (
    index: number,
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const pasteValue = event.clipboardData.getData("text");
    const newValues = [...values];
    newValues.splice(index, pasteValue.length);
    newValues.splice(index, 0, ...pasteValue.split(""));
    setValues(newValues);
    if (index < newValues.length - 1) {
      if (typeof window !== "undefined") {
        const nextInput = document.getElementById(
          `input-${index + pasteValue.length}`
        );
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-full font-[Poppins]">
      <div className="w-1/2 gap-4 flex flex-col items-center space-y-2">
        <h1 className="text-2xl text-center font-roboto text-onSurface">
          CHECK YOUR EMAIL
        </h1>

        <p className="text-center text-xs  text-[#777777] px-4 whitespace-normal">
          We{"'"}ve sent a verification code to {email}. Please enter the
          6-digit code below to verify your account
        </p>

        {/* Input Boxes */}
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
        <div>
          <button
            className="text-gray-500 underline rounded-xl px-5 py-2"
            onClick={handleResendCode}
            disabled={timer > 0}
          >
            {timer > 0 ? `Resend Code (${timer})` : "Resend Code"}
          </button>
        </div>

        {/* Verify Button */}
        <button
          className="bg-primarykey text-xs border-transparent py-3 text-white cursor-pointer hover:bg-custom-blue/75 transition duration-150 ease-linear rounded-lg px-12 mx-auto mt-4 text-center"
          onClick={handleSubmit}
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
    </div>
  );
};

export default MyComponent;
