"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LightbulbOff } from "lucide-react";
import { Circle } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type CardProps = {
  log_id: string;
  author_id: string;
  author_name: string;
  location: string;
  time_off: string;
  created_id: Date;
};

export function LogCard({ ...props }: CardProps) {
  const [timeDiff, setTimeDiff] = useState("");

  useEffect(() => {
    const postedTime = new Date(props.created_id);
    const currentTime = new Date();
    const diffInMs = currentTime.getTime() - postedTime.getTime();
    const diffInMin = Math.floor(diffInMs / (1000 * 60));
    setTimeDiff(`${diffInMin} min ago`);

    // we can properly implement logic for hours, days, weeks, etc.
  }, [props.created_id]);

  return (
    <Link href={`/logs/${props.log_id}`} passHref>
      <div className="w-80 h-28 group rounded-md cursor-pointer bg-[#E4E7EC]/10 border hover:border-neutral-400 border-neutral-100 p-2 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src="" />
                {/* Implement random boring avatars */}
                <AvatarFallback className="text-xs">KK</AvatarFallback>
              </Avatar>
              <span className="font-bold tracking-tighter text-xs uppercase text-neutral-500 group-hover:text-neutral-600">
                {props.author_name}
              </span>
            </div>
            <div className="tracking-tighter text-xs text-neutral-500 group-hover:text-neutral-600">
              {timeDiff}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Circle className="h-2 w-2 mr-2" fill="#ff5544" color="fff" />
            <span className="font-bold tracking-tighter text-xs uppercase text-neutral-500 group-hover:text-neutral-600">
              {props.location}
            </span>
            <div>
              <HoverCard>
                <HoverCardTrigger>
                  <LightbulbOff className="h-4 w-4 ml-2 hover:text-[#ff5544]" />
                  <span className="sr-only">Lights out</span>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="text-sm text-foreground">
                    This area hasn't had light in the past hour.{" "}
                    <span className="underline underline-offset-2">
                      Learn More.
                    </span>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 10L3.27142 7.80196C3.80122 7.28928 4.60292 7.18086 5.24987 7.53439V7.53439C6.0927 7.99496 7.14943 7.65839 7.57065 6.79522L8.16866 5.56977C8.61945 4.64598 9.55744 4.06 10.5853 4.06V4.06C11.5081 4.06 12.3663 3.58692 12.859 2.80676L14 1"
                stroke="#E00000"
              />
            </svg>
            <div className="text-[#E00000] text-xs tracking-tighter">
              High dumsor area
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default LogCard;
