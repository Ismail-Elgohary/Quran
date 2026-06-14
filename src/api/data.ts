let currentAudio: HTMLAudioElement | null = null;
let currentAyah: string | null = null;

export const playAudio = async (surahId: string, ayahNumber: number) => {



 const ayahKey = `${surahId}:${ayahNumber}`;
 if (currentAudio && currentAyah === ayahKey) {
  if (currentAudio.paused) {
   await currentAudio.play();
  } else {
   currentAudio.pause();
  }
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

 await audio.play();

 audio.onended = () => {
  currentAudio = null;
  currentAyah = null;
 };
};

export const pauseAudio = () => {
 if (currentAudio) {
  currentAudio.pause();
 }
};

export const getSurah = async (id: string) => {
 const res = await fetch(`https://quranapi.pages.dev/api/${id}.json`);

 if (!res.ok) {
  throw new Error(`Faild: ${res.status}`);
 }
 const data = await res.json();
 return data.arabic1 as string[];
};
