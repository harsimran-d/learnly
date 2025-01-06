"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function SignupButton() {
  const router = useRouter();
  return (
    <Button
      variant="secondary"
      onClick={() => {
        router.push("/register");
      }}
    >
      Get Started
    </Button>
  );
}
