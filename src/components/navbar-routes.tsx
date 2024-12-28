"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SignoutButton from "./auth/signout-button";

const NavbarRoutes = () => {
  const pathName = usePathname();

  const isTeacherPage = pathName?.startsWith("/teacher");
  const isPlayerPage = pathName?.includes("/chapter");

  return (
    <div className="ml-auto flex items-center gap-x-2">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/dashboard">
          <Button variant="ghost">
            <LogOut className="m4-2 h-4 w-4" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button variant="ghost">Teacher Mode</Button>
        </Link>
      )}

      <SignoutButton />
    </div>
  );
};

export default NavbarRoutes;
