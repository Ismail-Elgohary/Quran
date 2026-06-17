import SurahPreview from "~/components/surahPreview";
import SurahSearch from "../routes/search";

export default function Home() {
 return (
  <>
   <section class="bg-black py-16">
    <div class="text-center px-6">
     <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-[#e7e9ea] mb-4">
      Quran
     </h1>

     <p class="mt-8 text-xl md:text-3xl leading-relaxed font-bold text-[#24898f] max-w-4xl mx-auto">
      اقْرَؤُوا القُرْآنَ فإنَّه يَأْتي يَومَ القِيامَةِ
      شَفِيعًا لأَصْحابِهِ
     </p>
     <SurahSearch />
    </div>
   </section>

   <SurahPreview />
  </>
 );
}
