import DetailsPage from "@/app/(system)/logs/[id]/components/details-page";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getLog } from "@/app/actions/logs.actions";
import { toast } from "sonner";

type Props = {
  params: {
    id: string;
  };
};
async function LogDetailsPage({ params }: Props) {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/sign-in");
  }

  const data = await getLog(params.id);

  if (!data) {
    toast.error("Log not found");
    return;
  }
  const author = data.data.log.userId;

  return (
    <div>
      <DetailsPage
        id={params.id}
        location={data.data.log.location}
        timeOff={data.data.log.timeOff}
        timeBackOn={data.data.log.timeBackOn}
        userid={userData?.user.id}
        authorid={author}
      />
    </div>
  );
}

export default LogDetailsPage;
