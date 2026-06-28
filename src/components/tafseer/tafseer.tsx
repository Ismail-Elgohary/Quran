import { useParams } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { data } from "../../api/surahname";

export default function TafsirSheet(props: any) {
 const [selected, setSelected] = createSignal("kathir");
 const params = useParams();

 const currentTafsir = () => {
  if (selected() === "kathir") return props.tafsirKathir();
  if (selected() === "qurtubi") return props.qurtubi?.();

  return null;
 };

 const surahName = data.find((surah) => surah.id === Number(params.id)
 )?.name ?? params.id;

 return (
  <Show when={props.open()}>

   <div
    class="fixed inset-0 bg-bg-list z-40"
    onClick={props.onClose}
   />

   <div class="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-2xl p-4 h-[70vh] overflow-y-auto pb-10">

    <div class="sticky top-0 z-10 bg-background p-4">

     <div class="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-4" />

     <div class="flex justify-between items-center mb-4">

      <h2 class="text-primary-foreground text-xl font-bold items-center text-center">
       سورة  {props.surahNumber}
      </h2>

      <h3 class="text-primary-foreground text-xl font-bold items-center text-center justify-center mb-4">
       تفسير سورة {surahName}
      </h3>

      <button
       class="text-foreground text-xl cursor-pointer"
       onClick={props.onClose}
      >
       ✕
      </button>
     </div>

    </div>
    <div class="flex gap-3 mb-4 justify-center">
     <button
      class="px-4 py-2 rounded-full text-sm font-semibold"
      classList={{
       "bg-bg-btn text-primary-foreground": selected() === "kathir",
       "bg-color-tab text-foreground": selected() !== "kathir",
      }}
      onClick={() => setSelected("kathir")}
     >
      Ibn Kathir
     </button>

     <button
      class="px-4 py-2 rounded-full text-sm font-semibold"
      classList={{
       "bg-bg-btn text-primary-foreground": selected() === "qurtubi",
       "bg-color-tab text-foreground": selected() !== "qurtubi",
      }}
      onClick={() => setSelected("qurtubi")}
     >
      Al-Qurtubi
     </button>
    </div>

    <Show when={props.loading}>
     <p class="text-foucs">Loading tafsir...</p>
    </Show>

    <Show when={props.error}>
     <p class="text-destructive">Failed to load tafsir</p>
    </Show>

    {/* content */}
    <Show when={currentTafsir()}>
     <div class="text-foreground leading-[3.5rem] text-xl font-bold font-serif  opacity-85 whitespace-pre-line mb-20 mt-6">

      <p class="mt-2">
       {currentTafsir().text || currentTafsir().translation}
      </p>

     </div>
    </Show>

   </div>
  </Show>
 );
}
