let currentAudio: HTMLAudioElement | null = null;
let currentAyah: string | null = null;
let currentListen: (() => void)[] = [];

const notify = () => currentListen.forEach((e) => e());

export const subscribeAudio = (e: () => void) => {
 currentListen.push(e);
};


export const playAudio = async (surahId: string, ayahNumber: number) => {

 const ayahKey = `${surahId}:${ayahNumber}`;

 if (currentAudio && currentAyah === ayahKey) {
  if (currentAudio.paused) {
   await currentAudio.play();
  } else {
   currentAudio.pause();
  }
  notify();
  return;
 }

 if (currentAudio) {
  currentAudio.pause();
  currentAudio.currentTime = 0;
 }

 const res = await fetch(
  `https://api.alquran.cloud/v1/ayah/${surahId}:${ayahNumber}/ar.husary`
 );
 const data = await res.json();
 const audio = new Audio(data.data.audio);

 currentAudio = audio;
 currentAyah = ayahKey;

 notify();

 await audio.play();

 audio.onended = () => {
  currentAudio = null;
  currentAyah = null;
  notify();
 };
};

export const pauseAudio = () => {
 if (!currentAudio) return;
 currentAudio.pause();
 currentAudio.currentTime = 0;
 currentAudio = null;
 currentAyah = null;
 notify();
};

export const getSurah = async (id: string) => {
 const res = await fetch(`https://quranapi.pages.dev/api/${id}.json`);

 if (!res.ok) {
  throw new Error(`Faild: ${res.status}`);
 }
 const data = await res.json();
 return data.arabic1 as string[];
};

export const getFullSurah = async (id: string) => {
 const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}`);

 if (!res.ok) {
  throw new Error(`Failed: ${res.status}`);
 }

 const data = await res.json();

 return data.data.ayahs
  .map((ayah: { text: string }) => ayah.text)
  .join(" ");
};
