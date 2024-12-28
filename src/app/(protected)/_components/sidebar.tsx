import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-white shadow-sm">
      <div className="mx-auto flex flex-col items-center p-4">
        <Logo />
      </div>
      <div className="flex w-full flex-col">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
