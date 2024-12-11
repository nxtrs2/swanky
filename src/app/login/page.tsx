"use client";
import Auth from "@/components/auth";

export default function LoginPage() {
  return <Auth />;
}

// export default function LoginPage() {
//   return (
//     <form>
//       <label htmlFor="email">Phone:</label>
//       <input id="email" name="email" type="email" required />
//       <label htmlFor="password">Password:</label>
//       <input id="password" name="password" type="password" required />
//       <button formAction={login}>Log in</button>
//       <button formAction={signup}>Sign up</button>
//     </form>
//   );
// }
// "use client";

// import { useState } from "react";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { AlertCircle } from "lucide-react";

// export default function PhoneLogin() {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState("phone"); // 'phone' or 'otp'
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const supabase = createClientComponentClient();

//   const handleSendOTP = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const { error } = await supabase.auth.signInWithOtp({
//       phone: phoneNumber,
//     });

//     if (error) {
//       setError(error.message);
//     } else {
//       setStep("otp");
//     }

//     setLoading(false);
//   };

//   const handleVerifyOTP = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const { error } = await supabase.auth.verifyOtp({
//       phone: phoneNumber,
//       token: otp,
//       type: "sms",
//     });

//     if (error) {
//       setError(error.message);
//     } else {
//       router.push("/dashboard"); // Redirect to dashboard or home page after successful login
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
//         <div className="text-center">
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//             Phone Login
//           </h2>
//         </div>
//         {error && (
//           <Alert variant="destructive">
//             <AlertCircle className="h-4 w-4" />
//             <AlertTitle>Error</AlertTitle>
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}
//         {step === "phone" ? (
//           <form onSubmit={handleSendOTP} className="mt-8 space-y-6">
//             <div>
//               <Label htmlFor="phone">Phone Number</Label>
//               <Input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 required
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 placeholder="+1234567890"
//                 className="mt-1"
//               />
//             </div>
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Sending..." : "Send OTP"}
//             </Button>
//           </form>
//         ) : (
//           <form onSubmit={handleVerifyOTP} className="mt-8 space-y-6">
//             <div>
//               <Label htmlFor="otp">Enter OTP</Label>
//               <Input
//                 id="otp"
//                 name="otp"
//                 type="text"
//                 required
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 placeholder="123456"
//                 className="mt-1"
//               />
//             </div>
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Verifying..." : "Verify OTP"}
//             </Button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }
