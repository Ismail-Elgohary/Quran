import { useNavigate, useParams } from "@solidjs/router";
import { ArrowLeft, Minus, Plus } from "lucide-solid";
import { createResource, createSignal, For, Show } from "solid-js";

import { getSurah } from "../../../api/data";
import { data } from "../../../api/surahname";

export default function Read() {
 const [fontSize, setFontSize] = createSignal(42);

 const increase = () =>
  setFontSize((size) => Math.min(size + 2, 72));

 const decrease = () =>
  setFontSize((size) => Math.max(size - 2, 18));

 const params = useParams();
 const navigate = useNavigate();

 const [ayahs] = createResource(() => params.id, getSurah);

 const surahName =
  data.find((s) => s.id === Number(params.id))?.name ??
  params.id;

 return (
  <div class="min-h-screen bg-[#171717] text-white">

   {/* Header */}
   <header class="sticky top-0 z-50 bg-[#171717]/90 backdrop-blur border-b border-gray-800">
    <div class="max-w-5xl mx-auto flex items-center justify-between p-5">

     <button
      onClick={() => navigate(`/surah/${params.id}`)}
      class="rounded-full p-2 hover:bg-[#2d2d2d]"
     >
      <ArrowLeft class="w-6 h-6" />
     </button>

     <h1 class="text-2xl font-bold">
      سورة {surahName}
     </h1>

     <div class="flex gap-2">
      <button
       onClick={decrease}
       class="rounded-full p-2 hover:bg-[#2d2d2d]"
      >
       <Minus class="w-6 h-6 hover:text-teal-400" />
      </button>

      <button
       onClick={increase}
       class="rounded-full p-2 hover:bg-[#2d2d2d]"
      >
       <Plus class="w-6 h-6 hover:text-teal-400" />
      </button>
     </div>

    </div>
   </header>

   <main class="max-w-5xl mx-auto py-12 px-8">

    <Show
     when={!ayahs.loading}
     fallback={
      <p class="text-center text-gray-400">
       Loading...
      </p>
     }
    >
     <p
      class="text-center leading-[2.6]"
      style={{
       "font-size": `${fontSize()}px`,
      }}
     >
      <For each={ayahs()}>
       {(ayah, i) => (
        <>
         {ayah}

         <span
          class="inline-flex items-center justify-center
            w-12 h-12 mx-2 rounded-full
            border border-teal-500
          text-teal-400 text-xl align-middle"
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
