import { Bookmark, Copy, Pause, Play, Share2 } from "lucide-solid";

type IconsProps = {
 surahId: string | number | undefined;
 ayahNumber: number;
 ayah: string;
 isLoading: boolean;
 onCopy: (text: string) => void;
 onSave: (text: string) => void;
 onPlay: (surahId: string, ayahNumber: number) => void;
 stopAudio: () => void;
};

export default function Icons(props: IconsProps) {

 return (

  <div class="flex items-center justify-between mb-6">
   <div class="flex items-center gap-3 text-gray-400">
    <span class="text-xl font-bold cursor-pointer hover:text-teal-400">
     {props.surahId}:{props.ayahNumber}
    </span>

    <Play
     onClick={() =>
      props.onPlay(
       props.surahId as string,
       props.ayahNumber
      )
     }
     size={25}
     class="hover:text-teal-400 transition-all cursor-pointer"
    />

    <Pause
     onClick={() => props.stopAudio()}
     size={25}
     class="hover:text-teal-400 transition-all cursor-pointer"
    />

    <Bookmark
     onClick={() => props.onSave(props.ayah)}
     size={25}
     class="hover:text-teal-400 transition-all cursor-pointer"
    />
   </div>

   <div class="flex items-center gap-3">

    <Copy
     onClick={() => props.onCopy(props.ayah)}
     size={25}
     class="text-gray-400 hover:text-teal-400 transition-all cursor-pointer"
    />

    <Share2
     size={25}
     class="text-gray-400 hover:text-teal-400 transition-all cursor-pointer"
    />
   </div>
  </div>
 );
}
