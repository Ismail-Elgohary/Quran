import { A, useNavigate } from "@solidjs/router";
import Menu from "../components/mobilelist";

export default function Header() {
 const navigate = useNavigate();


 return (
  <header class="sticky top-0 left-0 w-full z-50 bg-[#171717] shadow-lg">
   <div class="w-full mx-auto px-6 py-4 flex items-center justify-between">
    <A href="/" class="text-lg font-extrabold text-[#e7e9ea]">
     Quran
    </A>
    <nav class="flex items-center gap-4 px-6">

     <button
      class="rounded-full text-[#24898f] px-4 py-2 text-lg font-medium shadow-md hover:bg-white hover:shadow-lg border border-text-[#24898f]"
      onClick={() => navigate("/login")}
     >
      Sign in
     </button>

     <Menu />

    </nav>
   </div>
  </header >
 );
}

