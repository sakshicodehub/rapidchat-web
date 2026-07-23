import { useState } from "react";
import { verifyOtp } from "../services/api";

type VerifyOtpFormProps = {
  phone: string;
};

export default function VerifyOtpForm(phone: VerifyOtpFormProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerifyOtp = async () => {
    const response = await verifyOtp({ phone: phone, otp: otp})
    console.log("response", response)
    localStorage.setItem(
      "token",
      response.data.token
    );
    console.log("token", response.data.token)
    window.location.reload();
    if (response.data.error) {
      setError(response.data.error);
    }
  };

  return (
    <>
      <input style={{ width: "100%", padding: "10px", backgroundColor: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px" }}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        {error}
      </div>

      <button onClick={handleVerifyOtp}>
        Verify OTP
      </button>
    </>
  );
}