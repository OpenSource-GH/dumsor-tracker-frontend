import UpdateLogForm from "./components/update-log";

type Props = {
  params: {
    id: string;
  };
};

function UpdateLogPage({ params }: Props) {
  console.log(params.id);
  return (
    <div className="max-w-lg mx-auto px-6">
      <UpdateLogForm id={params.id} />
    </div>
  );
}

export default UpdateLogPage;
