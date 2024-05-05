import UpdateLogForm from "./components/update-log";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

async function UpdateLogPage({params}: Props) {
  const supabase = await createClient();

  const {data, error} = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/sign-in");
  }
  return (
    <div className="max-w-lg mx-auto px-6">
      <UpdateLogForm id={params.id}/>
    </div>
  );
}

export default UpdateLogPage;
