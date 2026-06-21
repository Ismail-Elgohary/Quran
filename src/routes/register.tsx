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
  <div class="min-h-screen flex items-center justify-center bg-[#1f2125] p-6">
   <div class="w-full max-w-md bg-[#25282d] rounded-3xl p-8 shadow-xl">

    <div class="text-center mb-8">
     <h1 class="text-3xl font-bold text-white">
      Welcome To Quran
     </h1>

     <p class="text-gray-400 mt-2">
      Sign in or create an account to continue your Quran journey.
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
     onSubmit={register}
    >
     <input
      value={name()}
      onInput={(e) => setName(e.currentTarget.value)}
      type="text"
      placeholder="Name"
      class="w-full px-4 py-3 rounded-xl bg-[#1f2125] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 border border-[#3a3a3a]"
     />

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
     <input
      value={cpassword()}
      onInput={(e) => setCpassword(e.currentTarget.value)}
      type="password"
      placeholder="Confirm Password"
      class="w-full px-4 py-3 rounded-xl bg-[#1f2125] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 border border-[#3a3a3a]"
     />
     <button
      type="submit"
      class="w-full py-3 rounded-xl bg-[#2ca4ab] text-white font-semibold"
     >
      Sign Up
     </button>
    </form>
   </div>
  </div>
 );
}
