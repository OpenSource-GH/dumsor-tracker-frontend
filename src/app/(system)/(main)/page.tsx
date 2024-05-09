import { Button } from "@/components/ui/button";
import Search from "@/components/ui/search-bar";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { getLogs, getRecentLogs } from "../../actions/logs.actions";
import LogList from "@/app/(system)/(main)/feed/log-feed";
import RecentLogList from "@/app/(system)/(main)/feed/recent-log-feed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    location?: string;
  };
}) {
  const response = await getLogs({
    location: searchParams?.location!,
    page: searchParams?.page!,
  });

  //make all call for the next page. using this for pagination
  const next_page = await getLogs({
    location: searchParams?.location!,
    page: String(Number(searchParams?.page) + 1)!,
  });
  
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
        <br />
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
            <div className="py-6">
              <Search placeholder="Search By Location" />
            </div>
            <div className="w-full h-full border-l-2 border-dashed">
              <div className="ml-4">
                <LogList data={response.data.logs} />
              </div>
            </div>
            <br />
            <div>
              <div className="flex gap-5 w-full justify-end items-center">
                <Link
                  href={`http://localhost:3000/?page=${
                    Number(searchParams?.page) - 1
                  }`}
                >
                  Previous
                </Link>
                {next_page.data.logs.length > 0 && (
                  <Link
                    href={`http://localhost:3000/?page=${
                      Number(searchParams?.page) + 1
                    }`}
                  >
                    Next
                  </Link>
                )}
              </div>
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
