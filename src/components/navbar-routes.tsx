import SignoutButton from "./auth/signout-button";
const NavbarRoutes = () => {
  return (
    <div className="ml-auto flex items-center gap-x-2">
      <SignoutButton />
    </div>
  );
};

export default NavbarRoutes;
