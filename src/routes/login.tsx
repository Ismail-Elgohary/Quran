import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";

import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "solid-sonner";
import { auth } from "../lib/firebase";

export default function Login() {
 const [email, setEmail] = createSignal("");
 const [password, setPassword] = createSignal("");
 const [selected, setSelected] = createSignal("signIn");

 const navigate = useNavigate();

 const login = async (e: Event) => {
  e.preventDefault();

  try {
   await signInWithEmailAndPassword(
    auth,
    email(),
    password()
   );

   toast.success("Login successful");

   navigate("/");
  } catch (error: any) {
   toast.error(error.message);
  }
 };

 return (
  <div class="min-h-screen flex items-center justify-center bg-[#1f2125] p-6">
   <div class="w-full max-w-md bg-[#25282d] rounded-3xl p-8 shadow-xl">

    <div class="text-center mb-8">
     <h1 class="text-3xl font-bold text-white">
      Welcome To Quran
     </h1>

     <p class="mt-2 text-gray-400">
      Sign in to continue your journey.
     </p>
    </div>

    <div class="flex gap-4 mb-6">
     <button
      type="button"
      class="w-full py-3 rounded-full font-semibold transition"
      classList={{
       "bg-[#080809] text-white": selected() === "signIn",
       "bg-[#343a40] text-[#dee2e6]": selected() !== "signIn",
      }}
      onClick={() => {
       setSelected("signIn");
       navigate("/login");
      }}
     >
      Sign In
     </button>

     <button
      type="button"
      class="w-full py-3 rounded-full font-semibold transition"
      classList={{
       "bg-[#080809] text-white": selected() === "signUp",
       "bg-[#343a40] text-[#dee2e6]": selected() !== "signUp",
      }}
      onClick={() => {
       setSelected("signUp");
       navigate("/register");
      }}
     >
      Sign Up
     </button>
    </div>

    <form
     class="flex flex-col gap-4"
     onSubmit={login}
    >
     <input
      value={email()}
      onInput={(e) => setEmail(e.currentTarget.value)}
      type="email"
      placeholder="Email"
      class="w-full px-4 py-3 rounded-xl bg-[#1f2125] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 border border-[#3a3a3a]"
     />

     <input
      value={password()}
      onInput={(e) => setPassword(e.currentTarget.value)}
      type="password"
      placeholder="Password"
      class="w-full px-4 py-3 rounded-xl bg-[#1f2125] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 border border-[#3a3a3a]"
     />

     <button
      type="submit"
      class="w-full py-3 rounded-xl bg-[#2ca4ab] text-white font-semibold"
     >
      Login
     </button>

     <button
      onClick={() => navigate("/forgetpassword")}
      type="button"
      class="text-sm text-gray-400 hover:text-white cursor-pointer"
     >
      Forgot Password?
     </button>

    </form>
   </div>
  </div >
 );
}
