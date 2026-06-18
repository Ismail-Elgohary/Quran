import { createSignal, For, onMount, Show } from "solid-js";

export default function Bookmark() {
 const [activeTab, setActiveTab] = createSignal("saved");
 const [savedAyahs, setSavedAyahs] = createSignal<any[]>([]);

 const STORAGE_KEY = "quran_saved_ayahs";

 onMount(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) setSavedAyahs(JSON.parse(saved));
 });

 const removeAyah = (index: number) => {
  const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  const updated = current.filter((_: any, i: number) => i !== index);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  setSavedAyahs(updated);
 };

 return (
  <div class="bg-[#171717] min-h-screen text-white p-5" dir="rtl">

   <h1 class="text-center text-teal-500 mt-5 font-bold text-2xl mb-6">
    your bookmarkes
   </h1>

   <header class="w-full bg-[#222] p-4 rounded-xl flex justify-center gap-4">
    <button
     onClick={() => setActiveTab("saved")}
     class="px-6 py-2 rounded-full"
     classList={{
      "bg-[#080809] text-white": activeTab() === "saved",
      "bg-[#343a40] text-[#dee2e6]": activeTab() !== "saved",
     }}
    >
     Saved
    </button>
   </header>

   <main class="mt-8 max-w-2xl mx-auto">

    <Show when={activeTab() === "saved"}>
     <div class="space-y-4">

      <For
       each={savedAyahs()}
       fallback={
        <p class="text-center text-gray-500">
         you haven't saved any ayahs yet
        </p>
       }
      >
       {(item, index) => (
        <div class="bg-[#222] p-5 rounded-xl border-r-4 border-teal-500 flex justify-between items-start">

         <div>
          <p class="text-xl font-semibold mb-2">
           {item.text}
          </p>

          <span class="text-xs text-teal-400">
           سورة {item.surahName} - آية {item.ayahNum}
          </span>
         </div>

         <button
          onClick={() => removeAyah(index())}
          class="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10 transition-colors"
          title="Delete"
         >
          🗑️
         </button>

        </div>
       )}
      </For>

     </div>
    </Show>

   </main>
  </div>
 );
}
