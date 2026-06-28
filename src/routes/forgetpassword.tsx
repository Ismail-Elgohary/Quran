import { useNavigate } from "@solidjs/router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { createSignal } from "solid-js";
import { toast } from "solid-sonner";

export default function ForgetPassword() {
 const [email, setEmail] = createSignal("");

 const navigate = useNavigate();

 const resetPassword = async () => {
  if (!email()) {
   toast.error("Please enter your email");
   return;
  }

  try {
   await sendPasswordResetEmail(
    getAuth(),
    email()
   );

   toast.success(
    "Password reset link sent to your email"
   );

   navigate("/login");
  } catch (error: any) {
   toast.error(error.message);
  }
 };

 return (
  <div class="min-h-screen flex items-center justify-center bg-background p-6">
   <div class="w-full max-w-md bg-card rounded-3xl p-8 shadow-xl">

    <h1 class="text-3xl font-bold text-primary-foreground text-center mb-3">
     Forgot Password
    </h1>

    <p class="text-foreground text-center mb-6">
     Enter your email to receive a reset link
    </p>

    <div class="flex flex-col gap-4">

      <input
      type="email"
      placeholder="Email"
      value={email()}
      onInput={(e) => setEmail(e.currentTarget.value)}
      class="w-full px-4 py-3 rounded-xl bg-background text-foreground placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-foucs border border-border"
     />

     <button
      onClick={resetPassword}
      class="w-full py-3 rounded-xl bg-foucs text-foreground font-semibold cursor-pointer"
     >
      Send Reset Link
     </button>

     <button
      onClick={() => navigate("/login")}
      class="text-foreground hover:text-primary-foreground cursor-pointer"
     >
      Back to Login
     </button>

    </div>
   </div>
  </div>
 );
}
