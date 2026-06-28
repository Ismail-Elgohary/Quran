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
  <div class="bg-background min-h-screen text-foreground p-5" dir="rtl">

   <h1 class="text-center text-foucs mt-5 font-bold text-2xl mb-6">
    your bookmarkes
   </h1>

   <header class="w-full bg-surface p-4 rounded-xl flex justify-center gap-4">
    <button
     onClick={() => setActiveTab("saved")}
     class="px-6 py-2 rounded-full"
     classList={{
      "bg-tab-active text-tab-active-foreground": activeTab() === "saved",
     "bg-tab text-tab-foreground": activeTab() !== "saved",
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
        <p class="text-center text-foreground">
         you haven't saved any ayahs yet
        </p>
       }
      >
       {(item) => (
        <div class="bg-surface p-5 rounded-xl border-r-4 border-foucs flex justify-between items-start">

         <div>
          <p class="text-xl font-semibold mb-2">
           {item.text}
          </p>

          <span class="text-xs text-foucs">
           سورة {item.surahName} - آية {item.ayahNum}
          </span>
         </div>

         <button
          onClick={() => removeAyah(item.id)}
          class="text-destructive hover:text-destructive p-2 rounded-full hover:bg-destructive-hover transition-colors"
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
