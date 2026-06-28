import { A, useNavigate } from "@solidjs/router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { createSignal, onMount, Show } from "solid-js";
import Menu from "../components/mobilelist";
import { auth } from "../lib/firebase";

export default function Header() {
 const navigate = useNavigate();

 const [user, setUser] = createSignal<any>(null);
 const [open, setOpen] = createSignal(false);

 onMount(() => {
  onAuthStateChanged(auth, (u) => {
   setUser(u);
  });
 });

 const logout = async () => {
  await signOut(auth);
  setUser(null);
  navigate("/login");
 };

 return (
  <header class="sticky top-0 left-0 w-full z-50 bg-background shadow-lg">
   <div class="w-full mx-auto px-6 py-4 flex items-center justify-between">
    <A href="/" class="text-lg font-extrabold text-foreground">
     Quran
    </A>
    <nav class="flex items-center gap-4 px-6">

     <Show
      when={user()}
      fallback={
       <button
        class="rounded-full text-primary px-4 py-2 text-lg font-medium border border-primary"
        onClick={() => navigate("/login")}
       >
        Sign in
       </button>
      }
     >

      <div class="relative">

       <button
        onClick={() => setOpen(!open())}
        class="w-10 h-10 rounded-full bg-primary text-white font-bold"
       >
        {user()?.email?.charAt(0).toUpperCase()}
       </button>

       <Show when={open()}>
        <div class="absolute right-0 mt-2 w-48 bg-card rounded-xl shadow-lg overflow-hidden">

         <div class="px-4 py-3 text-sm text-muted-foreground border-b border-border">
          {user()?.email}
         </div>

         <button
          onClick={() => navigate("/profile")}
          class="w-full text-left px-4 py-3 text-muted-foreground hover:bg-hover"
         >
          Profile
         </button>

         <button
          onClick={logout}
          class="w-full text-left px-4 py-3 text-destructive hover:bg-destructive-hover"
         >
          Logout
         </button>

        </div>
       </Show>

      </div>
     </Show>
     <Menu />

    </nav>
   </div>
  </header >
 );
}

