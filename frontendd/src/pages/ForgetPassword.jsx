import { useState, useRef } from "react";
import api from "./api.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [length, setLength] = useState(8);
  const [options, setOptions] = useState({
    uppercase: false,
    lowercase: true,
    numbers: false,
    symbols: false,
  });

  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const sendOtp = async () => {
    try {
      const res = await api.post("/forgotPassword", { email });
      alert(res.data.message);
      setStep("otp");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOtp = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) return alert("Please enter complete OTP");
    try {
      const res = await api.post("/verifyOtp", { otp: finalOtp });
      alert(res.data.message);
      setStep("password");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const generatePassword = () => {
    let chars = "";
    if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (options.numbers) chars += "0123456789";
    if (options.symbols) chars += "!@#$%^&*()_+[]{}<>?";
    if (!chars) return alert("Select at least one option");

    let generated = "";
    for (let i = 0; i < length; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generated);
  };

  const resetPassword = async () => {
    try {
      const res = await api.post("/resetPassword", { password }, { withCredentials: true });
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      {step === "email" && (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-4">Forgot Password?</h2>
          <input
            type="email"
            placeholder="your@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4"
          />
          <button
            onClick={sendOtp}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Send OTP
          </button>
          <p className="text-center mt-4 text-sm">
            <Link to="/login" className="text-blue-500">Back to Login</Link>
          </p>
        </div>
      )}

     
      {step === "otp" && (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 text-center text-xl border rounded"
              />
            ))}
          </div>
          <button
            onClick={verifyOtp}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Verify OTP
          </button>
        </div>
      )}

      
      {step === "password" && (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold text-center mb-4">Reset Password</h2>

          <input
            type="range"
            min={4}
            max={32}
            value={length}
            onChange={(e) => setLength(+e.target.value)}
            className="w-full mb-4"
          />

          <button
            onClick={generatePassword}
            className="w-full bg-blue-500 text-white py-2 rounded mb-4"
          >
            Generate Password
          </button>

          <input
            value={password}
            readOnly
            className="w-full border px-3 py-2 rounded mb-4"
          />

          <button
            onClick={resetPassword}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
}
