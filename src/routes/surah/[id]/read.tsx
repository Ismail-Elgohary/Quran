import { useNavigate, useParams } from "@solidjs/router";
import { ArrowLeft, Minus, Pause, Play, Plus } from "lucide-solid";
import { createResource, createSignal, For, Show } from "solid-js";

import { getSurah } from "../../../api/data";
import { playing, playSurah } from "../../../api/fullsurah";
import { data } from "../../../api/surahname";

export default function Read() {
 const params = useParams();
 const navigate = useNavigate();

 const [fontSize, setFontSize] = createSignal(42);

 const increase = () => setFontSize((s) => Math.min(s + 2, 72));
 const decrease = () => setFontSize((s) => Math.max(s - 2, 18));

 const [ayahs] = createResource(() => params.id, getSurah);

 const surahName = data.find((s) => s.id === Number(params.id))?.name ?? params.id;

 return (
  <div class="min-h-screen bg-[#171717] text-white" dir="rtl">

   <header class="sticky top-0 z-50 bg-[#171717]/90 backdrop-blur border-b border-gray-800">

    <div class="max-w-5xl mx-auto flex items-center justify-between p-5">

     <button
      onClick={() => navigate(`/surah/${params.id}`)}
      class="rounded-full p-2 hover:bg-[#2d2d2d]"
     >
      <ArrowLeft class="w-6 h-6 transform rotate-180" />
     </button>

     <h1 class="text-2xl font-bold">
      سورة {surahName}
     </h1>

     <div class="flex items-center gap-4">

      <div class="flex gap-2">
       <button onClick={decrease} class="p-2 hover:bg-[#2d2d2d] rounded">
        <Minus />
       </button>

       <button onClick={increase} class="p-2 hover:bg-[#2d2d2d] rounded">
        <Plus />
       </button>
      </div>
     </div>
    </div>

    <div class="flex justify-center pb-4">
     <button
      onClick={() => playSurah(Number(params.id))}
      class="flex items-center gap-2 bg-teal-600 px-5 py-2 rounded-full hover:bg-teal-700 transition"
     >
      <Show when={playing()} fallback={<Play />}>
       <Pause />
      </Show>

      <span>
       {playing() ? "إيقاف مؤقت" : "تشغيل السورة"}
      </span>
     </button>
    </div>

   </header>

   <main class="max-w-5xl mx-auto py-12 px-8">

    <Show
     when={!ayahs.loading}
     fallback={<p class="text-center text-gray-400">جاري تحميل الآيات...</p>}
    >
     <p
      class="text-center leading-[2.6]"
      style={{ "font-size": `${fontSize()}px` }}
     >
      <For each={ayahs()}>
       {(ayah, i) => (
        <>
         {ayah}
         <span class="inline-flex items-center justify-center
              w-12 h-12 mx-2 rounded-full
              border border-teal-500
              text-teal-400 text-xl"
         >
          {i() + 1}
         </span>
        </>
       )}
      </For>
     </p>
    </Show>

   </main>
  </div>
 );
}
