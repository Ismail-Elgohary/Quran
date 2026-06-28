import { useNavigate } from "@solidjs/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createSignal, onMount } from "solid-js";
import { toast } from "solid-sonner";
import { auth } from "../lib/firebase";

export default function Register() {
 const [name, setName] = createSignal("");
 const [email, setEmail] = createSignal("");
 const [password, setPassword] = createSignal("");
 const [cpassword, setCpassword] = createSignal("");
 const [selected, setSelected] = createSignal("signUp");
 const navigate = useNavigate();


 const register = async (e: Event) => {
  e.preventDefault();

  try {
   await createUserWithEmailAndPassword(
    auth,
    email(),
    password()
   );

   toast.success("Account created successfully");

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

     <p class="text-muted-foreground mt-2">
      Sign in or create an account to continue your Quran journey.
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
     onSubmit={register}
    >
     <input
      value={name()}
      onInput={(e) => setName(e.currentTarget.value)}
      type="text"
      placeholder="Name"
      class="w-full px-4 py-3 rounded-xl bg-background text-foreground placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-foucs border border-border"
     />

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
     <input
      value={cpassword()}
      onInput={(e) => setCpassword(e.currentTarget.value)}
      type="password"
      placeholder="Confirm Password"
      class="w-full px-4 py-3 rounded-xl bg-background text-foreground placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-foucs border border-border"
     />
     <button
      type="submit"
      class="w-full py-3 rounded-xl bg-foucs text-foreground font-semibold cusror-pointer"
     >
      Sign Up
     </button>
    </form>
   </div>
  </div>
 );
}
