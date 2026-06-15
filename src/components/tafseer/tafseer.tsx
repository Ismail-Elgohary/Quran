import { Show } from "solid-js";

export default function TafsirSheet(props: any) {
 return (
  <Show when={props.open()}>

   <div
    class="fixed inset-0 bg-black/60 z-40"
    onClick={props.onClose}
   />

   {/* Page in surah[id] */}
   <div class="fixed bottom-0 left-0 right-0 z-50 bg-[#1e1e1e] rounded-t-2xl p-4 h-[70vh] overflow-y-auto pb-10">

    <div class="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-4" />

    {/* Header */}
    <div class="flex justify-between items-center mb-4">
     <h2 class="text-white text-xl font-bold">
      Tafsir Ayah {props.selectedAyah()}
     </h2>

     <button
      class="text-gray-400 text-xl"
      onClick={props.onClose}
     >
      ✕
     </button>
    </div>

    {/* Button */}
    <div class="flex flex-col items-center gap-3 w-full mb-4">
     <hr class="border-gray-700 border-t-2 w-full" />

     <button class="px-4 py-2 rounded-full bg-[#343a40] text-[#dee2e6] font-semibold
      hover:bg-[#495057] hover:text-white transition-colors
      active:scale-95 duration-150 whitespace-nowrap">
      Tafsir Al-Muyassar
     </button>
    </div>

    {/* Tafsir Content */}
    <Show when={props.loading}>
     <p class="text-gray-400">Loading tafsir...</p>
    </Show>

    <Show when={props.error}>
     <p class="text-red-400">Failed to load tafsir</p>
    </Show>

    <Show when={props.tafsirKathir()}>
     <div class="text-gray-300 leading-[3.5rem] text-xl font-bold font-serif  opacity-85 whitespace-pre-line mb-20 mt-6">
      <span class="text-teal-400 font-bold text-lg">
       ({props.tafsirKathir().aya || props.tafsirKathir().ayah})</span>
      <p>{props.tafsirKathir().text}</p>
     </div>
    </Show>

   </div>
  </Show>
 );
}
