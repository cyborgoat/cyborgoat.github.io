"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button"; // Assuming you might have a Button component from shadcn/ui or similar
import { Moon, Sun } from "lucide-react"; // Using lucide-react for icons, adjust if you use something else

export function ThemeToggleButton() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost" // Or "outline" or your preferred style
      size="icon"     // For a compact icon button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
