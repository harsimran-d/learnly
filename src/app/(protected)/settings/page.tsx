import SignoutButton from "@/components/auth/signout-button";
import { auth } from "@/lib/auth";
const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      Settings Page {JSON.stringify(session)}
      <SignoutButton />
    </div>
  );
};

export default SettingsPage;
