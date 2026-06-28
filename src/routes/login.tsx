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
  <div class="min-h-screen flex items-center justify-center bg-background p-6">
   <div class="w-full max-w-md bg-card rounded-3xl p-8 shadow-xl">

    <div class="text-center mb-8">
     <h1 class="text-3xl font-bold text-muted-foreground">
      Welcome To Quran
     </h1>

     <p class="mt-2 text-muted-foreground">
      Sign in to continue your journey.
     </p>
    </div>

    <div class="flex gap-4 mb-6">
     <button
      type="button"
      class="w-full py-3 rounded-full font-semibold transition"
      classList={{
       "bg-tab-active text-tab-active-foreground": selected() === "signIn",
       "bg-tab text-tab-foreground": selected() !== "signIn",
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
       "bg-tab-active text-tab-active-foreground": selected() === "signUp",
       "bg-tab text-tab-foreground": selected() !== "signUp",
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
      class="w-full px-4 py-3 rounded-xl bg-background text-foreground placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-foucs border border-border"
     />

     <input
      value={password()}
      onInput={(e) => setPassword(e.currentTarget.value)}
      type="password"
      placeholder="Password"
      class="w-full px-4 py-3 rounded-xl bg-background text-foreground placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-foucs border border-border"
     />

     <button
      type="submit"
      class="w-full py-3 rounded-xl bg-foucs text-foreground font-semibold cursor-pointer"
     >
      Login
     </button>

     <button
      onClick={() => navigate("/forgetpassword")}
      type="button"
      class="text-lg text-placeholder hover:text-foreground cursor-pointer"
     >
      Forgot Password?
     </button>

    </form>
   </div>
  </div >
 );
}
