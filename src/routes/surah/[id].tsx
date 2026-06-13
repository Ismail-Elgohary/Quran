import { useParams } from "@solidjs/router";
import { createResource, For, Show } from "solid-js";
import { toast } from "solid-sonner";
import { getSurah, pauseAudio, playAudio } from "../../api/data";
import Icons from "../../components/icons";

export default function SurahPage() {
 const params = useParams();
 const [ayahs] = createResource(() => params.id, getSurah);

 const copyAyah = async (text: string) => {
  try {
   await navigator.clipboard.writeText(text);
   toast.success("Copied to clipboard");
  } catch (err) {
   console.error(err);
  }
 };

 const saveAyah = (ayah: string) => {
  const bookmarks = JSON.parse(
   localStorage.getItem("bookmarks") || "[]"
  );

  bookmarks.push(ayah);
  localStorage.setItem(
   "bookmarks",
   JSON.stringify(bookmarks)
  );
  toast.success("Ayah saved");
 };


 return (
  <div class="bg-[#171717] min-h-screen px-6 py-6 text-right">
   <h1 class="text-white text-3xl font-bold text-center mb-8">
    سورة {params.id}
   </h1>

   <Show when={ayahs.loading}>
    <p class="text-teal-400 text-center">Loading...</p>
   </Show>

   <Show when={ayahs.error}>
    <p class="text-red-400 text-center">Error: {ayahs.error}</p>
   </Show>

   <Show when={!ayahs.loading && ayahs()}>
    <div class="max-w-3xl mx-auto divide-y divide-gray-800">

     <For each={ayahs()}>
      {(ayah, i) => (
       <div class="py-6">
        <Icons
         surahId={params.id}
         ayahNumber={i() + 1}
         ayah={ayah}
         onCopy={copyAyah}
         onSave={saveAyah}
         onPlay={playAudio}
         stopAudio={pauseAudio}
        />

        <p class="text-white text-3xl leading-loose text-right mb-6">
         {ayah}
        </p>
       </div>
      )}
     </For>
    </div >
   </Show >
  </div >
 );
}
