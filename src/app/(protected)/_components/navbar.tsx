import NavbarRoutes from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";
import { auth } from "@/lib/auth";
import { CustomSession } from "@/auth.config";

const Navbar = async () => {
  const session = (await auth()) as CustomSession;
  let isTeacher = false;
  if (session?.user?.role == "teacher") {
    isTeacher = true;
  }
  console.log(isTeacher);
  return (
    <div className="flex h-full items-center border-b bg-white p-4 shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
