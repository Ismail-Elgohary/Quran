import { createSignal } from "solid-js";

let currentAudio: HTMLAudioElement | null = null;

const [currentAyah, setCurrentAyah] = createSignal<string | null>(null);
const [playing, setPlaying] = createSignal(false);

const [duration, setDuration] = createSignal(0);
const [currentTime, setCurrentTime] = createSignal(0);

export { currentAyah, currentTime, duration, playing };

export const playAudio = async (
 surahId: string,
 ayahNumber: number
) => {
 const ayahKey = `${surahId}:${ayahNumber}`;

 // toggle نفس الآية
 if (currentAudio && currentAyah() === ayahKey) {
  if (currentAudio.paused) {
   await currentAudio.play();
   setPlaying(true);
  } else {
   currentAudio.pause();
   setPlaying(false);
  }
  return;
 }

 // stop old audio
 if (currentAudio) {
  currentAudio.pause();
  currentAudio.currentTime = 0;
 }

 const res = await fetch(
  `https://api.alquran.cloud/v1/ayah/${surahId}:${ayahNumber}/ar.husary`
 );

 const data = await res.json();

 currentAudio = new Audio(data.data.audio);

 setCurrentAyah(ayahKey);

 currentAudio.ontimeupdate = () => {
  setCurrentTime(currentAudio?.currentTime || 0);
 };

 currentAudio.onloadedmetadata = () => {
  setDuration(currentAudio?.duration || 0);
 };

 currentAudio.onplay = () => setPlaying(true);
 currentAudio.onpause = () => setPlaying(false);

 currentAudio.onended = () => {
  setPlaying(false);
  setCurrentAyah(null);
  currentAudio = null;
  setCurrentTime(0);
 };

 await currentAudio.play();
};

export const pauseAudio = () => {
 if (!currentAudio) return;

 currentAudio.pause();
 setPlaying(false);
};

export const seekAudio = (time: number) => {
 if (!currentAudio) return;

 currentAudio.currentTime = time;
 setCurrentTime(time);
};

export const getSurah = async (id: string) => {
 const res = await fetch(`https://quranapi.pages.dev/api/${id}.json`);

 if (!res.ok) throw new Error(`Faild: ${res.status}`);

 const data = await res.json();
 return data.arabic1 as string[];
};

export const getFullSurah = async (id: string) => {
 const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}`);

 if (!res.ok) throw new Error(`Failed: ${res.status}`);

 const data = await res.json();

 return data.data.ayahs
  .map((ayah: { text: string }) => ayah.text)
  .join(" ");
};
