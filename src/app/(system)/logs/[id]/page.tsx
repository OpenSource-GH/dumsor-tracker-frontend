type Props = {
  params: {
    id: string;
  };
};
async function LogDetailsPage({ params }: Props) {
  return <div>{params.id}</div>;
}

export default LogDetailsPage;
