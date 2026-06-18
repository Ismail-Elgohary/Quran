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
     class="w-full p-4 rounded-xl bg-[#171717] text-white
     border border-gray-700 focus:border-teal-500 outline-none"
     placeholder="Search Surah..."
     value={search()}
     onInput={(e) => setSearch(e.currentTarget.value)}
    />

    <Show when={search().trim().length > 0}>

     <div class="absolute left-0 right-0 mt-2 bg-[#171717] border border-gray-700
      rounded-xl shadow-lg z-50 text-[#e7e9ea]">

      <Show
       when={filtered().length > 0}
       fallback={
        <div class="p-3 text-white text-center">
         No results found
        </div>
       }
      >
       <For each={filtered()}>
        {(surah) => (
         <div
          class="p-3 flex justify-between cursor-pointer
           hover:bg-[#474747] transition"
          onClick={() => goToSurah(surah.id)}
         >
          <span>{surah.name}</span>
          <span class="text-[#e7e9ea] text-lg">#{surah.id}</span>
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
