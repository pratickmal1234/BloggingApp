import { useState, useRef } from "react";
import api from "./api.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([])
  const [length, setLength] = useState(8);
  const [options, setOptions] = useState({
    uppercase: false,
    lowercase: true,
    numbers: false,
    symbols: false,
  });

const navigate=useNavigate()
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

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };



  const verifyOtp = async () => {
    const finalOtp = otp.join(""); // "123456"

    if (finalOtp.length !== 6) {
      alert("Please enter complete OTP");
      return;
    }

    try {
      const res = await api.post("/verifyOtp", { otp: finalOtp });
      alert(res.data.message);
      setStep("password");
    } catch (error) {
      alert(error.response?.data?.message);
    }

    // try {
    //   const res = await api.post("/verifyOtp", { otp })
    //   console.log(res.data);
    //   alert(res.data.message)
    //   setStep("password");

    // } catch (error) {
    //   console.log(error);
    //   alert(error.response?.data?.message)
    // }
  };

  const generatePassword = () => {
    let chars = "";
    if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (options.numbers) chars += "0123456789";
    if (options.symbols) chars += "!@#$%^&*()_+[]{}<>?";

    if (!chars) {
      alert("Select at least one option");
      return;
    }

    let generated = "";
    for (let i = 0; i < length; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(generated); // 🔥 IMPORTANT
  };


  const resetPassword = async () => {
    try {
      const res = await api.post("/resetPassword", { password },{withCredentials:true})
      console.log(res.data);
      alert(res.data.message)
       navigate("/login")
    } catch (error) {
      alert(error.response?.data?.message)

    }
  };

  return (
    <>
      
      {step === "email" && (
        <>

          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Forgot Password</title>
          {/* Tailwind CSS CDN */}
          <link
            href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
            rel="stylesheet"
          />
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n        /* Custom fade-in animation (reused from login page) */\n        @keyframes fadeIn {\n            from {\n                opacity: 0;\n                transform: translateY(-20px); /* Optional: slight slide-down effect */\n            }\n            to {\n                opacity: 1;\n                transform: translateY(0);\n            }\n        }\n\n        /* Apply the animation to an element */\n        .animate-fade-in {\n            animation: fadeIn 0.8s ease-out forwards;\n        }\n    "
            }}
          />
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm animate-fade-in">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
              Forgot Password?
            </h2>
            <p className="text-center text-gray-600 mb-6 text-sm">
              Enter your email address below and we'll send you a link to reset your
              password.
            </p>
            <form action="#" method="">
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={sendOtp}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Send OTP
                </button>
              </div>
            </form>
            <div className="text-center mt-6">
              <Link
                to="/login"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Back to Login
              </Link>
            </div>
          </div>


          {/* <h2>Find your account</h2>
          <div className="input-group">
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /></div>
          <button onClick={sendOtp}>Send OTP</button> */}
        </>
      )}

      {step === "otp" && (
        <>

          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>OTP Verification</title>
          <div className="bg-white dark:bg-gray-700 shadow-2xl rounded-3xl w-full max-w-md overflow-hidden grid md:grid-cols-1 transform transition-transform duration-300 hover:scale-105">
            <div className="p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 400 300"
                className="mx-auto mb-6 w-48 h-48 animate-pulse"
              >
                <circle cx={200} cy={200} r={150} fill="#3B82F6" />
                <circle cx={200} cy={200} r={120} fill="#FFFFFF" />
                <circle cx={200} cy={200} r={90} fill="#3B82F6" />
                <circle cx={200} cy={200} r={60} fill="#FFFFFF" />
                <text
                  x={200}
                  y={200}
                  textAnchor="middle"
                  fill="#2563EB"
                  fontSize={40}
                  fontWeight="bold"
                  dy=".3em"
                  className="text-center"
                >
                  OTP
                </text>
              </svg>
              <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                Verify OTP
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                Enter the 6-digit code sent to +91 8888888888
              </p>
              <div className="flex justify-center space-x-4 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
            focus:outline-none focus:ring-2 focus:ring-blue-500
            dark:bg-gray-600 dark:text-white"
                  />
                ))}

              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                Didn't receive code?
                <Link
                  to="/forget"
                  className="text-blue-500 hover:underline dark:text-blue-400 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Resend OTP
                </Link>
              </div>
              {/* <a href="https://abhirajk.vercel.app/" target=""> */}
              <button onClick={verifyOtp}
                className="w-full py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600
      transition-transform duration-300 hover:scale-105
      dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Verify OTP
              </button>
              {/* </a> */}
            </div>
          </div>


          {/* <h2>Enter OTP</h2> */}
          {/* <input
            placeholder="6 digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          /> */}
          {/* <button onClick={verifyOtp}>Verify</button> */}
        </>
      )}


      {step === "password" && (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md m-4">

          <h1 className="text-2xl font-bold text-center mb-6">
            🔐 Password Generator
          </h1>

          {/* Length Slider */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Password Length
            </label>
            <input
              type="range"
              min={4}
              max={32}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
            <div className="text-sm text-right mt-1">
              Length: <span className="font-semibold">{length}</span>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-2 mb-6 text-sm">
            {Object.keys(options).map((key) => (
              <label key={key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options[key]}
                  onChange={() =>
                    setOptions({ ...options, [key]: !options[key] })
                  }
                />
                <span className="capitalize">{key}</span>
              </label>
            ))}
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-4"
          >
            Generate Password
          </button>

          {/* Output */}
          <input
            type="text"
            value={password}
            readOnly
            className="w-full px-3 py-2 bg-gray-100 rounded text-sm mb-4"
          />

          {/* Reset Password */}
          <button
            onClick={resetPassword}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Reset Password
          </button>

        </div>
      )}


       
    </>
  );
}

  // {step === "password" && (
  //       <>
  //         <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md m-4">
  //           <h1 className="text-2xl font-bold text-center mb-6">🔐 Password Generator</h1>
  //           {/* Length Slider */}
  //     <div className="mb-4">
  //       <label className="block text-sm font-medium mb-1">Password Length</label>
  //       <input
  //         id="lengthSlider"
  //         type="range"
  //         min={4}
  //         max={32}
  //         defaultValue={8}
  //         className="w-full cursor-pointer"
  //       />
  //       <div className="text-sm text-right mt-1">
  //         Length:{" "}
  //         <span id="lengthValue" className="font-semibold">
  //           8
  //         </span>
  //       </div>
  //     </div>
  //     {/* Options */}
  //     <div className="grid grid-cols-2 gap-2 mb-6 text-sm">
  //       <label className="flex items-center space-x-2">
  //         <input type="checkbox" id="uppercase" className="form-checkbox" />
  //         <span>Uppercase</span>
  //       </label>
  //       <label className="flex items-center space-x-2">
  //         <input
  //           type="checkbox"
  //           id="lowercase"
  //           defaultChecked=""
  //           className="form-checkbox"
  //         />
  //         <span>Lowercase</span>
  //       </label>
  //       <label className="flex items-center space-x-2">
  //         <input type="checkbox" id="numbers" className="form-checkbox" />
  //         <span>Numbers</span>
  //       </label>
  //       <label className="flex items-center space-x-2">
  //         <input type="checkbox" id="symbols" className="form-checkbox" />
  //         <span>Symbols</span>
  //       </label>
  //     </div>
  //     {/* Generate Button */}
  //     <button
  //       onClick={resetPassword}
  //       className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-4"
  //     >
  //       Generate Password
  //     </button>
  //     {/* Output */}
  //     <div className="flex items-center justify-between px-3 py-2 bg-gray-100 rounded text-sm">
  //       <span id="passwordDisplay" className="break-all text-gray-800">
  //         Your password will appear here
  //       </span>
  //       <button
  //         onclick="copyPassword()"
  //         className="text-blue-600 hover:underline text-sm ml-4"
  //         id="copyBtn"
  //       >
  //         Copy
  //       </button>
  //     </div>
  //   </div>


  //         {/* <h2>Set new password</h2>
  //         <input
  //           type="password"
  //           placeholder="New password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //         <button onClick={resetPassword}>Confirm</button> */}
  //       </>
  //     )} 





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