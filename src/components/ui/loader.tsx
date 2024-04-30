import { TailSpin } from "react-loader-spinner";

type LoaderProps = {
  height: string;
  width: string;
  color: string;
};

function Loader({ height, width, color }: LoaderProps) {
  return (
    <TailSpin
      height={height}
      width={width}
      color={color}
      ariaLabel="tail-spin-loading"
      radius="1"
      visible={true}
    />
  );
}

export default Loader;