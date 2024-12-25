"use client";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
export const Social = () => {
  return (
    <div className="flex w-full flex-col items-center gap-y-2">
      <Button size="lg" className="w-full" variant="outline">
        <FcGoogle className="!h-5 !w-5" />
        <span>Continue with Google</span>
      </Button>
      <Button size="lg" className="w-full" variant="outline">
        <FaGithub className="!h-5 !w-5" />
        <span>Continue with GitHub</span>
      </Button>
    </div>
  );
};
