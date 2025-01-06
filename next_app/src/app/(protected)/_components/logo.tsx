import { cn } from "@/lib/utils";
import Image from "next/image";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
const Logo = () => {
  return (
    <div className="flex space-x-2">
      <Image height="36" width="36" alt="logo" src="/logo.svg" />
      <div
        className={cn(
          "m-y-auto flex items-center text-3xl font-bold text-[color:hsl(30,100,46)]",
          font.className,
        )}
      >
        Learnly
      </div>
    </div>
  );
};

export default Logo;
