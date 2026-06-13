import { A } from "@solidjs/router";
import { Globe, List } from "lucide-solid";

export default function Header() {
 return (
  <header class="sticky top-0 left-0 w-full z-50 bg-[#171717] shadow-lg">
   <div class="w-full mx-auto px-6 py-4 flex items-center justify-between">
    <A href="/" class="text-lg font-extrabold text-[#e7e9ea]">
     Quran
    </A>
    <nav class="flex items-center gap-6">
     <A
      href="/language"
      class="text-[#e7e9ea] hover:text-teal-400 transition-all"
     >
      <Globe size={28} />
     </A>
     <A
      href="/list"
      class="text-[#e7e9ea] hover:text-teal-400 transition-all"
     >
      <List size={28} />
     </A>
    </nav>
   </div>
  </header>
 );
}

