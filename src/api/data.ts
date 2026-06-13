let currentAudio: HTMLAudioElement | null = null;

export const playAudio = async (surahId: string, ayahNumber: number) => {
 const res = await fetch(
  `https://api.alquran.cloud/v1/ayah/${surahId}:${ayahNumber}/ar.husary`
 );
 const data = await res.json();
 const audio = new Audio(data.data.audio);
 currentAudio = audio;
 audio.play();
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
