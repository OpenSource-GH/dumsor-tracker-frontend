// import ColorModeToggle from "@/components/colorModeToggle";
import { ColorModeToggle } from "@/components/color-mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center bg-slate-200 gap-y-4">
      <span className="flex justify-end h-10 w-[40%] items-center p-4 mt-2">
        <ColorModeToggle />
      </span>
      <Button>Check</Button>
      <Input
        className="w-[30%] text-gray-500"
        type="email"
        placeholder="Email"
      />
    </main>
  );
}
