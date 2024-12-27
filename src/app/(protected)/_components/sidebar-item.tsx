"use client";

import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";

import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}
const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const closeSheet = useUIStore((state) => state.closeSheet);

  const pathname = usePathname();
  const router = useRouter();
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  return (
    <button
      className={cn(
        "flex items-center gap-x-2 pl-6 text-sm font-[500] text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-900",
        isActive &&
          "bg-[color:hsl(30,100,90)] text-[color:hsl(30,100,50)] hover:bg-[color:hsl(30,100,90)] hover:text-[color:hsl(30,100,50)]",
      )}
      onClick={() => {
        closeSheet();
        router.push(href);
      }}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={28} />
        <span className="text-lg">{label}</span>
      </div>
      <div
        className={cn(
          "ml-auto h-full border-2 border-[color:hsl(24,100,50)] opacity-0",
          isActive && "opacity-100",
        )}
      />
    </button>
  );
};

export default SidebarItem;
