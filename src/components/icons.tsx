import { Bookmark, Copy, Pause, Play, Share2 } from "lucide-solid";
import { Show } from "solid-js";

type IconsProps = {
 surahId: string | number | undefined;
 ayahNumber: number;
 ayah: string;
 isLoading: boolean;
 isPlaying: boolean;
 onCopy: (text: string) => void;
 onSave: (
  text: string,
  surahName: string,
  ayahNum: number
 ) => void;
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

    <Show when={props.isPlaying}
     fallback={
      <Play
       size={25}
       onClick={() => props.onPlay(props.surahId as string, props.ayahNumber)}
       class="hover:text-teal-400 transition-all cursor-pointer"
      />
     }
    >
     <Pause
      onClick={props.stopAudio}
      size={25}
      class="hover:text-teal-400 transition-all cursor-pointer"
     />
    </Show>

    <Bookmark
     onClick={() =>
      props.onSave(
       props.ayah,
       props.surahName,
       props.ayahNumber
      )
     }
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
  </div >
 );
}
