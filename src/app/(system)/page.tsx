import { Button } from "@/components/ui/button";
import Search from "@/components/ui/search-bar";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import LogList from "../../app/(system)/log-feed";
import { data } from "@/db";
import { createClient } from "@/utils/supabase/server";

// Define your data here or fetch it from an API

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user)
  return (
    <main>
      <div className="fixed bottom-5 right-5 p-5">
        <Link href={`/logs/new`}>
          <Button size={"icon"} className="rounded-full">
            <PlusIcon />
          </Button>
        </Link>
      </div>
      <div className="max-w-screen-lg mx-auto min-h-screen p-6">
        <div>
          <h2>Are your lights out?</h2>
          <p className="text-neutral-500">
            View logs of power outages across the country
          </p>
        </div>
        <div className="py-6">
          <Search placeholder="Search Posts" />
        </div>
        <div className="w-full h-full border-l-2 border-dashed">
          <div className="ml-6">
            <LogList data={data} />
          </div>
        </div>
      </div>
    </main>
  );
}
