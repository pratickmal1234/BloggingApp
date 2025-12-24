import { useState } from "react";
import axios from "axios";

export function VerifyOtp() {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (value, index) => {
    try {
      if (isNaN(value)) return;

      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // auto move next
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    } catch (error) {
        
    }
  };
  const verifyOtp = async () => {
    try {
      const enteredOtp = otp.join("");
      const res = await axios.post(
        "http://localhost:8001/otpveryify",
        { otp: enteredOtp },
        {
          headers: { "Content-type": "application/json" },
        }
      );

      // const data = await res.json();
      if (res.status === 200) {
        alert("OTP Verified Successfully!");
      } else {
        alert("Wrong OTP!");
      }
    } catch (error) {
      alert(error.res?.data?.message || error.message);
    }
    // if (data.success) {
    // alert("OTP Verified Successfully!");
    // } else {
    // alert("Wrong OTP!");
    // }
  };
  return (
    <>
      <div className="otp-wrapper">
        <h2>Verify OTP</h2>

        <div className="otp-box">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
            />
          ))}
        </div>

        <button onClick={verifyOtp}>Verify</button>
      </div>
    </>
  );
}
