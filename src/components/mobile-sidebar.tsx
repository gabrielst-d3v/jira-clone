"use client";

import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { Sidebar } from "./sidebar";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="secondary" className="lg:hidden">
          <MenuIcon className="size-4 text-neutral-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <VisuallyHidden>
          <SheetTitle>Menu de Navegação</SheetTitle>
          <SheetDescription>Acesse as opções do sistema</SheetDescription>
        </VisuallyHidden>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
