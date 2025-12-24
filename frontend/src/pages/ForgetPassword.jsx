import { useState } from "react";
import api from "./api.jsx";

export function ForgetPassword() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const sendOtp = async () => {
    try {

      const res = await api.post("/forgotPassword", { email })
      console.log(res.data);
      alert(res.data.message)
      setStep("otp");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message)

    }
  };

  const verifyOtp = async () => {
    try {
      const res = await api.post("/verifyOtp", { otp })
      console.log(res.data);
      alert(res.data.message)
    setStep("password");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message)
    }
  };

  const resetPassword = async () => {
    try {
         const res = await api.post("/resetPassword", { password })
      console.log(res.data);
      alert(res.data.message)
    } catch (error) {
      alert(error.response?.data?.message)
      
    }
  };

  return (
    <div>
      {step === "email" && (
        <>
          <h2>Find your account</h2>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {step === "otp" && (
        <>
          <h2>Enter OTP</h2>
          <input
            placeholder="6 digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify</button>
        </>
      )}

      {step === "password" && (
        <>
          <h2>Set new password</h2>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={resetPassword}>Confirm</button>
        </>
      )}
    </div>
  );
}






/*export function ForgetPassword() {
  const [email, setEmail] = useState("");
    const navigate=useNavigate();

  const handleemail = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post("http://localhost:8001/otp", {email}, {
        headers: { "Content-type": "application/json" },
      });
      if( response.status===201){
        
        alert(response.data.message);
        navigate("/veryfiotp");
        
      }
    } catch (error) {
       alert(
        error.response?.data?.message||error.message
      );
    }
  };

  return (
    <>
      <div className="register">
        <form onSubmit={handleemail}>
          <div className="input">
            <strong>Email</strong>{" "}
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              placeholder="Enter email here"
            />
          </div>
          <div className="input">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}*/