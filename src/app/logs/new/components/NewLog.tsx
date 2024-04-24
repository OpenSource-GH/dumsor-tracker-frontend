import CreateLogForm from "./CreateLogForm";

const NewLog = () => {
  return (
    <div className="w-full h-full py-12 px-6">
      <div className="flex items-center justify-between gap-0">
        <h1 className="text-3xl font-semibold">Record Power Outage</h1>
        <div className="w-12 h-12 grid place-content-center rounded-full border-2 border-gray-500">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center gap-2">
        <h3 className="text-sm text-[#4E5BA6]">21st January, 2024</h3>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="yes"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-circle"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <h3 className="text-sm text-[#4E5BA6]">6.36am</h3>
      </div>
      <div>
        <CreateLogForm />
      </div>
    </div>
  );
};

export default NewLog;
