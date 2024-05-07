import { Button } from "@/components/ui/button";
import Search from "@/components/ui/search-bar";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { getLogs, getRecentLogs } from "../../actions/logs.actions";
import LogList from "@/app/(system)/(main)/feed/log-feed";
import RecentLogList from "@/app/(system)/(main)/feed/recent-log-feed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default async function Home() {
  const response = await getLogs();
  const recent = await getRecentLogs();

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
        <Tabs defaultValue="recent" className="w-full mb-6">
          <TabsList className="w-full mb-2">
            <TabsTrigger value="recent" className="w-full">
              Recent
            </TabsTrigger>
            <TabsTrigger value="all posts" className="w-full">
              All Logs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="recent">
            <div className="w-full h-full border-l-2 border-dashed">
              <div className="ml-4">
                <RecentLogList data={recent} />
              </div>
            </div>
            <div>
              <h3 className="text-center text-sm text-neutral-500 py-6">
                That's all for now.
              </h3>
            </div>
          </TabsContent>
          <TabsContent value="all posts">
            <div className="w-full h-full border-l-2 border-dashed">
              <div className="ml-4">
                <LogList data={response.data.logs.reverse()} />
              </div>
            </div>
            <div>
              <h3 className="text-center text-sm text-neutral-500 py-6">
                Oops, you reached the end.
              </h3>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
