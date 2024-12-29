import NavbarRoutes from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";
import { auth } from "@/lib/auth";
import { CustomSession } from "@/auth.config";

const Navbar = async () => {
  const session = (await auth()) as CustomSession;
  let isTeacher = false;
  if (session?.user?.role == "TEACHER") {
    isTeacher = true;
  }
  console.log(isTeacher);
  return (
    <div className="flex h-full items-center border-b bg-white p-2 shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
