import { auth, signOut } from "@/lib/auth";
const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      Settings Page {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut({ redirect: true, redirectTo: "/login" });
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default SettingsPage;
