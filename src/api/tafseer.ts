export const tafseerKather = async (id: string) => {
 console.log("TAFSEER API CALLED:", id);

 const res = await fetch(
  `https://ummahapi.com/api/tafsir/ibn_kathir_ar/surah/${id}`
 );

 const data = await res.json();

 console.log("TAFSEER DATA:", data);

 return data;
};


export const tafsirQurtubi = async (surah: string, ayah: number) => {
 const res = await fetch(
  `https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/ar.qurtubi`
 );

 if (!res.ok) {
  throw new Error("Failed to load Qurtubi tafsir");
 }

 const data = await res.json();

 return data.data;
};
