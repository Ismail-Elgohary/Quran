import { useNavigate, useParams } from "@solidjs/router";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { BookOpen } from "lucide-solid";
import { createResource, createSignal, For, Show } from "solid-js";
import { toast } from "solid-sonner";
import { getSurah, pauseAudio, playAudio } from "../../../api/data";
import { data } from "../../../api/surahname";
import { tafseerKather, tafsirQurtubi } from "../../../api/tafseer";
import Icons from "../../../components/icons";
import TafsirPage from "../../../components/tafseer/tafseer";
import { db } from "../../../lib/firebase";

export default function SurahPage() {
 const params = useParams();
 const [open, setOpen] = createSignal(false);
 const [selectedAyah, setSelectedAyah] = createSignal(1);
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

 const saveAyah = async (
  ayah: string,
  surahName: string,
  ayahNum: number
 ) => {
  const user = getAuth().currentUser;

  console.log("USER:", user);

  if (!user) {
   toast.error("Please login first");
   return;
  }

  try {
   const data = {
    userId: user.uid,
    text: ayah,
    surahName,
    ayahNum,
    createdAt: Date.now(),
   };

   console.log("BOOKMARK DATA:", data);

   await addDoc(collection(db, "bookmarks"), data);

   toast.success("Ayah saved");
  } catch (error: any) {
   console.error("FIRESTORE ERROR:", error);
   toast.error(error.message || "Failed to save ayah");
  }
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
         surahName={surahName}
         ayahNumber={i() + 1}
         ayah={ayah}
         onCopy={copyAyah}
         onSave={saveAyah}
         onPlay={(surahId, ayahNumber) => {
          setSelectedAyah(ayahNumber);
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

   <div class="flex justify-between items-center mb-4">
   </div>
  </div>
 );
}
