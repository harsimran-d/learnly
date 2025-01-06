const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[hsl(30_100_75)] to-[hsl(25_100_50)]">
      {children}
    </div>
  );
};

export default AuthLayout;
