import { useNavigate, useParams } from "@solidjs/router";
import { BookOpen } from "lucide-solid";
import { createResource, createSignal, For, Show } from "solid-js";
import { toast } from "solid-sonner";
import { getSurah, pauseAudio, playAudio } from "../../../api/data";
import { data } from "../../../api/surahname";
import { tafseerKather, tafsirQurtubi } from "../../../api/tafseer";
import Icons from "../../../components/icons";
import TafsirPage from "../../../components/tafseer/tafseer";

export default function SurahPage() {
 const params = useParams();
 const [open, setOpen] = createSignal(false);
 const [selectedAyah, setSelectedAyah] = createSignal(1);
 const [drawer, setDrawer] = createSignal(false);
 const navigate = useNavigate();

 const [ayahs] = createResource(() => params.id, getSurah);

 const [tafseerKathir] = createResource(
  () => params.id,
  tafseerKather
 );

 const [qurtubi] = createResource(
  () => ({ surah: params.id, ayah: selectedAyah() }),
  ({ surah, ayah }) => tafsirQurtubi(surah, ayah)
 );

 const copyAyah = async (text: string) => {
  try {
   await navigator.clipboard.writeText(text);
   toast.success("Copied to clipboard");
  } catch (err) { }
 };

 const saveAyah = (ayah: string) => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  bookmarks.push(ayah);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  toast.success("Ayah saved");
 };

 const getTafsirKathir = () => {
  const data = tafseerKathir();
  if (!data?.data?.verses) return null;

  return data.data.verses.find(
   (v: any) => v.ayah === selectedAyah()
  );
 };

 const surahName = data.find((surah) => surah.id === Number(params.id)
 )?.name ?? params.id;

 return (
  <div class="bg-[#171717] min-h-screen px-6 py-6 text-right">





   <div class="max-w-3xl mx-auto flex justify-between items-center mb-8">
    <h1 class="text-white text-3xl font-bold">
     سورة {surahName}
    </h1>

    <button
     class="flex items-center gap-2 bg-[#24898f] hover:bg-[#1f777d]
           transition px-5 py-2 rounded-full text-white"
     onClick={() => navigate(`/surah/${params.id}/read`)}
    >
     📖
     <span>Reading Mode</span>
    </button>
   </div>

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
         onPlay={(surahId, ayahNumber) => {
          setSelectedAyah(ayahNumber);
          setDrawer(true);
          playAudio(surahId, ayahNumber);
         }}
         stopAudio={pauseAudio}
        />

        <p class="text-white text-3xl leading-loose text-right mb-6">
         {ayah}
        </p>

        <button
         class="flex items-center gap-2 text-gray-400 hover:text-teal-400 font-bold"
         onClick={() => {
          setSelectedAyah(i() + 1);
          setOpen(true);
         }}
        >
         <BookOpen class="w-6 h-6" />
         <span>Tafsir</span>
        </button>

       </div>
      )}
     </For>
    </div>
   </Show>

   <TafsirPage
    open={open}
    onClose={() => setOpen(false)}
    selectedAyah={selectedAyah}
    tafsirKathir={getTafsirKathir}
    surahName={qurtubi()?.data?.surah?.name}
    surahNumber={params.id}
    qurtubi={qurtubi}
    loading={tafseerKathir.loading}
    error={tafseerKathir.error}
   />

   <Show when={drawer()}>
    <>
     <div
      class="fixed inset-0 bg-black/50 z-40"
      onClick={() => setDrawer(false)}
     />

     <div class="fixed bottom-0 left-0 right-0 z-50 bg-[#25282d] rounded-t-3xl p-6">

      <div class="flex justify-between items-center mb-4">
       <h2 class="text-white font-bold">
        Ayah {selectedAyah()}
       </h2>

       <button
        class="text-white"
        onClick={() => setDrawer(false)}
       >
        ✕
       </button>
      </div>

      <div class="flex justify-center gap-4">

       <button
        class="bg-[#24898f] px-7 py-3 rounded-full text-white"
        onClick={() =>
         playAudio(params.id, selectedAyah())
        }
       >
        Play
       </button>
      </div>
     </div>
    </>
   </Show>
  </div>
 );
}
