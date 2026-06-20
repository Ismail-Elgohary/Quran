import { createSignal } from "solid-js";

export const [playing, setPlaying] = createSignal(false);
export const [reciterId, setReciterId] = createSignal(9);

let audio: HTMLAudioElement | null = null;
let currentSurah: number | null = null;
let currentReciter: number | null = null;

export const playSurah = async (surahId: number) => {
 const numericSurahId = Number(surahId);
 const numericReciterId = reciterId();

 if (audio && currentSurah === numericSurahId && currentReciter === numericReciterId) {
  if (audio.paused) {
   audio.play().catch(e => console.error(e));
   setPlaying(true);
  } else {
   audio.pause();
   setPlaying(false);
  }
  return;
 }

 if (audio) {
  audio.pause();
  audio.currentTime = 0;
 }

 try {
  const response = await fetch(
   `https://api.quran.com/api/v4/chapter_recitations/${numericReciterId}/${numericSurahId}`);
  const result = await response.json();
  const audioUrl = result.audio_file.audio_url;

  audio = new Audio(audioUrl);
  currentSurah = numericSurahId;
  currentReciter = numericReciterId;
  setPlaying(true);

  audio.onended = () => {
   setPlaying(false);
   currentSurah = null;
   currentReciter = null;
   audio = null;
  };

  audio.play().catch((error) => {
   console.error("Error for playing:", error);
   setPlaying(false);
  });

 } catch (error) {
  console.error("error for surah:", error);
  setPlaying(false);
  currentSurah = null;
  currentReciter = null;
  audio = null;
 }
};

export const pauseSurah = () => {
 if (!audio) return;
 audio.pause();
 setPlaying(false);
};
