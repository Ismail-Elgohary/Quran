import { useNavigate } from "@solidjs/router";
import { createSignal, For, onMount, Show } from "solid-js";

interface SurahList {
 surahNameArabic: string;
 surahNameTranslation: string;
 revelationPlace: string;
 totalAyah: number;
}

export default function SurahPreview() {
 const [surahs, setSurahs] = createSignal<SurahList[]>([]);
 const [loading, setLoading] = createSignal(true);
 const navigate = useNavigate();

 onMount(async () => {
  try {
   const res = await fetch("https://quranapi.pages.dev/api/surah.json");
   const data = await res.json();
   setSurahs(data);
  } catch (err) {
   console.error("Error", err);
  } finally {
   setLoading(false);
  }
 });

 return (
  <>
   <main class="min-h-screen bg-[#171717] text-white p-6">
    <h2 class="text-white text-3xl font-bold text-center mb-8">السور</h2>

    <Show when={loading()}>
     <div class="flex justify-center py-20">
      <p class="text-teal-400 text-xl">loading...</p>
     </div>
    </Show>

    <Show when={!loading()}>
     <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
      <For each={surahs()}>
       {(surah, index) => (
        <div
         onClick={() => navigate(`/surah/${index() + 1}`)}
         class="bg-[#171717] border border-gray-50 hover:border-teal-500  rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300"
        >
         <div class="w-9 h-9 rounded-full bg-gray-200  flex items-center justify-center">
          <span class="text-black font-bold text-lg">
           {index() + 1}
          </span>
         </div>
         <p class="text-white font-bold text-lg text-center">
          {surah.surahNameArabic}
         </p>
         <p class="text-teal-400 text-xs text-center">
          {surah.surahNameTranslation}
         </p>
         <span
          class={`text-xs px-2 py-0.5 rounded-full ${surah.revelationPlace === "Mecca" ? "bg-amber-900 text-amber-300" : "bg-blue-900 text-blue-300"}`}
         >
          {surah.revelationPlace === "Mecca" ? "مكية" : "مدنية"}
         </span>
         <p class="text-gray-400 text-xs">{surah.totalAyah} آية</p>
        </div>
       )}
      </For>
     </div>
    </Show>
   </main>
  </>
 );
}
