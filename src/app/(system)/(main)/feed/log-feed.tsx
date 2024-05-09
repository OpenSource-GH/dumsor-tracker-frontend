import React from "react";
import LogCard from "@/components/cards/log-card";
import { Lightbulb } from "lucide-react";

type Log = {
  _id: string;
  location: string;
  timeOff: string;
  timeBackOn: string;
};

type Props = {
  data: Log[];
};

function Home({ data }: Props) {
  return (
    <div>
      <div className="w-full h-full">
        {data.length === 0 ? (
          <div className="grid place-content-center py-24 gap-4">
            <Lightbulb className="h-24 w-24 text-neutral-500 ml-14" />
            <h3 className="text-neutral-500">No posts to display.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.map((log) => (
              <LogCard log={log} key={log._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
