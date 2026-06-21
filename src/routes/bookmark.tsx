import { getAuth } from "firebase/auth";
import {
 collection,
 deleteDoc,
 doc,
 getDocs,
 query,
 where,
} from "firebase/firestore";
import { createSignal, For, onMount, Show } from "solid-js";

import { db } from "../lib/firebase";

export default function Bookmark() {
 const [activeTab, setActiveTab] = createSignal("saved");
 const [savedAyahs, setSavedAyahs] = createSignal<any[]>([]);


 onMount(async () => {
  const user = getAuth().currentUser;

  if (!user) return;

  const q = query(
   collection(db, "bookmarks"),
   where("userId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  const bookmarks = snapshot.docs.map((doc) => ({
   id: doc.id,
   ...doc.data(),
  }));

  setSavedAyahs(bookmarks);
 });

 const removeAyah = async (id: string) => {
  await deleteDoc(doc(db, "bookmarks", id));

  setSavedAyahs((prev) =>
   prev.filter((item) => item.id !== id)
  );
 };

 return (
  <div class="bg-[#171717] min-h-screen text-white p-5" dir="rtl">

   <h1 class="text-center text-teal-500 mt-5 font-bold text-2xl mb-6">
    your bookmarkes
   </h1>

   <header class="w-full bg-[#222] p-4 rounded-xl flex justify-center gap-4">
    <button
     onClick={() => setActiveTab("saved")}
     class="px-6 py-2 rounded-full"
     classList={{
      "bg-[#080809] text-white": activeTab() === "saved",
      "bg-[#343a40] text-[#dee2e6]": activeTab() !== "saved",
     }}
    >
     Saved
    </button>
   </header>

   <main class="mt-8 max-w-2xl mx-auto">

    <Show when={activeTab() === "saved"}>
     <div class="space-y-4">

      <For
       each={savedAyahs()}
       fallback={
        <p class="text-center text-gray-500">
         you haven't saved any ayahs yet
        </p>
       }
      >
       {(item) => (
        <div class="bg-[#222] p-5 rounded-xl border-r-4 border-teal-500 flex justify-between items-start">

         <div>
          <p class="text-xl font-semibold mb-2">
           {item.text}
          </p>

          <span class="text-xs text-teal-400">
           سورة {item.surahName} - آية {item.ayahNum}
          </span>
         </div>

         <button
          onClick={() => removeAyah(item.id)}
          class="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10 transition-colors"
          title="Delete"
         >
          🗑️
         </button>

        </div>
       )}
      </For>

     </div>
    </Show>

   </main>
  </div>
 );
}
