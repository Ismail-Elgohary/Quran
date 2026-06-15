export const tafseerKather = async (id: string) => {
 console.log("TAFSEER API CALLED:", id);

 const res = await fetch(
  `https://ummahapi.com/api/tafsir/ibn_kathir_ar/surah/${id}`
 );

 const data = await res.json();

 console.log("TAFSEER DATA:", data);

 return data;
};

export const tafseerMuyasser = async (id: string) => {
 console.log("TAFSEER API CALLED:", id);

 const res = await fetch(
  `https://quranenc.com/api/v1/translation/aya/arabic_moyassar/${id}`
 );

 const data = await res.json();

 console.log("TAFSEER DATA:", data);

 return data;
};

