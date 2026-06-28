import { useNavigate } from "@solidjs/router";
import {
 Bookmark,
 BookOpen,
 Globe,
 List,
 Moon,
 X,
} from "lucide-solid";
import { createSignal, For, Show } from "solid-js";

const menuItems = [
 { label: "Learn", icon: BookOpen, path: "/surah/1" },
 { label: "bookmarks", icon: Bookmark, path: "/bookmark" },
];

export default function Menu() {
 const [open, setOpen] = createSignal(false);
 const navigate = useNavigate();
 const toggle = () => setOpen(!open());

 return (
  <>
   <List
    size={28}
    onClick={toggle}
    class="text-foreground hover:text-foucs cursor-pointer transition-all"
   />

   <Show when={open()}>
    <div
     class="fixed inset-0 bg-bg-list z-40"
     onClick={toggle}
    />

    <div class="fixed top-0 right-0 h-full w-80 bg-surface z-50 flex flex-col shadow-xl animate-in slide-in-from-right">

     <div class="flex items-center justify-between px-6 py-5 border-b border-border">
      <h1 class="text-foreground text-2xl font-bold">Quran.com</h1>
      <X
       size={24}
       onClick={toggle}
       class="text-muted-foreground hover:text-foucs cursor-pointer transition-all"
      />
     </div>

     <div class="flex-1 overflow-y-auto py-4">
      <For each={menuItems}>
       {(item) => (
        <div
         onClick={() => {
          navigate(item.path);
          toggle();
         }}
         class="flex items-center gap-4 px-6 py-4 text-muted-foreground hover:text-foucs cursor-pointer transition-all text-lg"
        >
         <item.icon size={22} />
         <span>{item.label}</span>
        </div>
       )}
      </For>
     </div>

     <div class="border-t border-border p-4 flex items-center justify-between">
      <button class="flex items-center gap-2 text-muted-foreground hover:text-foucs transition-all">
       <Globe size={18} />
       Arabic
      </button>
      <button class="flex items-center gap-2 text-muted-foreground hover:text-foucs transition-all">
       <Moon size={18} />
       Theme
      </button>
     </div>
    </div>
   </Show>
  </>
 );
}
