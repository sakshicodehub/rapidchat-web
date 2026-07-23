import { useState } from "react";
import { sendOtp } from "../services/api";

type SendOtpFormProps = {
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setOtpSent: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SendOtpForm({ setPhone, setOtpSent}: SendOtpFormProps) 
{
  const [number, setNumber] = useState("");

  const handleSendOtp = async () => {
    await sendOtp({ phone: number });

    setPhone(number);
    setOtpSent(true);
  };

  return (
    <>
      <input style={{ width: "100%", padding: "10px", backgroundColor: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px" }}
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <button onClick={handleSendOtp}>
        Send OTP
      </button>
    </>
  );
}