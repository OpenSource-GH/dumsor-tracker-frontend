import DetailsCard from "@/app/(system)/logs/[id]/components/details-card";
import BackButton from "@/components/ui/back-button";
import EditButton from "@/components/ui/edit-button";

type Props = {
  id: string;
  location: string;
  timeBackOn: any;
  timeOff: any;
  userid: string;
  authorid: string;
};
async function DetailsPage({
  id,
  location,
  timeOff,
  timeBackOn,
  userid,
  authorid,
}: Props) {
  return (
    <main className="max-w-lg mx-auto px-6">
      <div className="my-8 w-full h-full">
        <div className="flex items-center justify-between">
          <BackButton />
          {userid === authorid && <EditButton id={id} />}
        </div>
        <DetailsCard
          location={location}
          timeOff={timeOff}
          timeBackOn={timeBackOn}
        />
      </div>
    </main>
  );
}

export default DetailsPage;
