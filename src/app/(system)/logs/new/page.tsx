import CreateLogForm from "./components/create-log";
import {redirect} from "next/navigation";
import {createClient} from "@/utils/supabase/server";

async function CreateLogPage() {
  const supabase = await createClient();

  const {data, error} = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/sign-in");
  }
  return (
    <div className="max-w-lg mx-auto px-6">
      <CreateLogForm/>
    </div>
  );
}

export default CreateLogPage;
