import { useState } from "react";
import SendOtpForm from "../components/SendOtpForm.tsx";
import VerifyOtpForm from "../components/VerifyOtpForm.tsx";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  return (
    <>
      {!otpSent ? (
        <SendOtpForm
          setPhone={setPhone}
          setOtpSent={setOtpSent}
        />
      ) : (
        <VerifyOtpForm
          phone={phone}
        />
      )}
    </>
  );
}