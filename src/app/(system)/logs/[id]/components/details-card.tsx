import { Lightbulb, LightbulbOff, Map } from "lucide-react";
import React from "react";

type Props = {
  location: string;
  timeBackOn: any;
  timeOff: any;
};
async function DetailsCard({ location, timeOff, timeBackOn }: Props) {
  return (
    <div className="w-full h-24 group rounded-md cursor-pointer border hover:border-neutral-400 border-neutral-200 shadow-sm p-2 flex items-center justify-between">
      <div className="font-bold w-[60%] tracking-tighter text-xs uppercase dark:text-neutral-400 text-neutral-700 group-hover:text-neutral-400 z-20">
        <Map
          className="h-8 w-4 mr-2 inline-flex"
          color="#000"
          fill="#eb1717"
          opacity={0.8}
        />
        {location}
      </div>
      <div className="flex flex-col justify-between items-end gap-4">
        <div className="font-bold text-xs uppercase text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-600">
          {timeOff}
        </div>
        <div className="text-neutral-500 dark:text-neutral-400 text-[0.6rem] tracking-tighter uppercase font-bold">
          {timeBackOn === "0" ? (
            <>
              <LightbulbOff className="h-4 w-4 mr-1 text-red-700 dark:text-[#ff5544] inline-flex" />
              Still off
            </>
          ) : (
            <>
              <Lightbulb className="h-4 w-4 mr-1 text-green-700 dark:text-[#00ff00] inline-flex" />
              Time back: {timeBackOn}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsCard;
