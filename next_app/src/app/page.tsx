import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import SignupButton from "@/components/auth/signup-button";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[hsl(30_100_75)] to-[hsl(25_100_50)]">
      <div className="space-y-6 text-center">
        <div className="flex justify-center space-x-2">
          <Image height="48" width="48" alt="logo" src="/logo.svg" />
          <h1
            className={cn(
              "text-6xl font-semibold text-white drop-shadow-lg",
              font.className,
            )}
          >
            Learnly
          </h1>
        </div>
        <p className="text-lg text-white">
          Empowering You to Master Coding Through Building.
        </p>
        <div className="flex flex-col items-center justify-center">
          <SignupButton />
          <LoginButton>
            <Button
              variant="link"
              className="font-light text-[color:hsl(240,100,95)]"
            >
              Already have an account?
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
