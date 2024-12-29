"use client";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUIStore } from "@/store/ui-store";
import Sidebar from "./sidebar";

export const MobileSidebar = () => {
  const { isSheetOpen, openSheet, closeSheet } = useUIStore();
  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={(open) => (open ? openSheet() : closeSheet())}
    >
      <SheetTrigger className="transition hover:opacity-50 md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="bg-white p-0">
        <SheetTitle className="sr-only">Mobile Sidebar</SheetTitle>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
