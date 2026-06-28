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
   <main class="min-h-screen bg-surface text-primary-foreground p-6">
    <h2 class="text-foreground text-3xl font-bold text-center mb-8">السور</h2>

    <Show when={loading()}>
     <div class="flex justify-center py-20">
      <p class="text-primary text-xl">loading...</p>
     </div>
    </Show>

    <Show when={!loading()}>
     <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
      <For each={surahs()}>
       {(surah, index) => (
        <div
         onClick={() => navigate(`/surah/${index() + 1}`)}
         class="bg-background border border-border hover:border-foucs rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300"
        >
         <div class="w-9 h-9 rounded-full bg-muted-foreground flex items-center justify-center">
          <span class="text-surface font-bold text-lg">
           {index() + 1}
          </span>
         </div>
         <p class="text-primary-foreground font-bold text-lg text-center">
          {surah.surahNameArabic}
         </p>
         <p class="text-foucs text-xs text-center">
          {surah.surahNameTranslation}
         </p>
         <span
          class={`text-xs px-2 py-0.5 rounded-full ${surah.revelationPlace === "Mecca" ? "bg-bg-span text-text-span" : "bg-bg-btn text-btn"}`}
         >
          {surah.revelationPlace === "Mecca" ? "مكية" : "مدنية"}
         </span>
         <p class="text-primary-foreground text-xs">{surah.totalAyah} آية</p>
        </div>
       )}
      </For>
     </div>
    </Show>
   </main>
  </>
 );
}
