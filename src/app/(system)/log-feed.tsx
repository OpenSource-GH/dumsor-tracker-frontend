import React from "react";
import LogCard from "@/components/cards/log-card";

type Props = {
  data: {
    log_id: string;
    author_id: string;
    author_name: string;
    location: string;
    time_off: string;
    created_id: Date;
  }[];
};

function Home({ ...props }: Props) {
  return (
    <div>
      <div>
        {props.data.length === 0 ? (
          <div>
            <h3 className="text-center">No posts to display.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {props.data.map((item) => {
              return (
                <LogCard
                  log_id={item.log_id}
                  author_id={item.author_id}
                  author_name={item.author_name}
                  location={item.location}
                  key={item.log_id}
                  time_off={item.time_off}
                  created_id={item.created_id}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
