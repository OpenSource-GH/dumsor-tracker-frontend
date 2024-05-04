import React from "react";
import LogCard from "@/components/cards/log-card";

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
      <div>
        {data.length === 0 ? (
          <div>
            <h3 className="text-center">No posts to display.</h3>
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
