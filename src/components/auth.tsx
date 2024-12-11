import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Auth() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const supabase = createClient();

  const handleSendOtp = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
      options: { channel: "whatsapp" },
    });
    if (error) {
      console.error("Error sending OTP:", error.message);
    } else {
      setIsOtpSent(true);
    }
    console.log(data);
  };

  const handleVerifyOtp = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: "sms",
    });
    if (error) {
      console.error("Error verifying OTP:", error.message);
    } else {
      console.log("OTP verified successfully");
    }
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black p-6 rounded-lg shadow-lg border border-gray-800 space-y-6 max-w-md mx-auto">
      {!isOtpSent ? (
        <div className="space-y-4">
          {/* Phone Number Input */}
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white placeholder-gray-500 rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {/* Send OTP Button */}
          <button
            onClick={handleSendOtp}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* OTP Input */}
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white placeholder-gray-500 rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {/* Verify OTP Button */}
          <button
            onClick={handleVerifyOtp}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>

    // <div>
    //   {!isOtpSent ? (
    //     <div>
    //       <input
    //         type="text"
    //         placeholder="Phone number"
    //         value={phone}
    //         onChange={(e) => setPhone(e.target.value)}
    //       />
    //       <button onClick={handleSendOtp}>Send OTP</button>
    //     </div>
    //   ) : (
    //     <div>
    //       <input
    //         type="text"
    //         placeholder="OTP"
    //         value={otp}
    //         onChange={(e) => setOtp(e.target.value)}
    //       />
    //       <button onClick={handleVerifyOtp}>Verify OTP</button>
    //     </div>
    //   )}
    // </div>
  );
}
