import { Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

import { Command, CommandInput } from "@/components/ui/command";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between py-4 px-2">
      <div className="flex items-center gap-2 pr-2">
        <Menu className="rounded-full cursor-pointer hover:bg-accent" />
        <span className="fontdiner-label">OpenStream</span>
      </div>
      <div>
        <Command className="rounded-lg border shadow-md md:min-w-[450px]">
          <CommandInput placeholder="Search..." />
        </Command>
      </div>
      <ThemeToggle />
    </nav>
  );
}
