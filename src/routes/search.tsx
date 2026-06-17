import { useNavigate } from "@solidjs/router";
import { createMemo, createSignal, For, Show } from "solid-js";
import { data } from "../api/surahname";

export default function SurahSearch() {
 const navigate = useNavigate();
 const [search, setSearch] = createSignal("");

 const filtered = createMemo(() => {
  if (!search().trim()) return [];

  return data.filter((s) =>
   s.name.toLowerCase().includes(search().toLowerCase())
  );
 });

 const goToSurah = (id: number) => {
  navigate(`/surah/${id}`);
  setSearch("");
 };

 return (
  <div class="w-full max-w-xl mx-auto p-4">

   <div class="relative">

    <input
     class="w-full p-4 rounded-xl bg-[#1a1a1a] text-white
     border border-gray-700 focus:border-teal-500 outline-none"
     placeholder="Search Surah..."
     value={search()}
     onInput={(e) => setSearch(e.currentTarget.value)}
    />

    <Show when={search().trim().length > 0}>

     <div class="absolute left-0 right-0 mt-2 bg-[#111] border border-gray-700
      rounded-xl shadow-lg z-50">

      <Show
       when={filtered().length > 0}
       fallback={
        <div class="p-3 text-gray-400 text-center">
         No results found
        </div>
       }
      >
       <For each={filtered()}>
        {(surah) => (
         <div
          class="p-3 flex justify-between cursor-pointer
           hover:bg-[#222] transition"
          onClick={() => goToSurah(surah.id)}
         >
          <span>{surah.name}</span>
          <span class="text-gray-500 text-sm">#{surah.id}</span>
         </div>
        )}
       </For>
      </Show>
     </div>
    </Show>
   </div>
  </div>
 );
}
