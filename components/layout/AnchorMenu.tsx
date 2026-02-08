"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface AnchorSection {
  id: string;
  label: string;
}

interface AnchorMenuProps {
  sections?: AnchorSection[];
  position?: "fixed" | "sticky";
  className?: string;
}

export default function AnchorMenu({
  sections = [],
  position = "sticky",
  className,
}: AnchorMenuProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sections]);

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const smoother = (
        window as unknown as {
          __smoother?: {
            scrollTo: (
              target: string | Element,
              smooth?: boolean,
              position?: string,
            ) => void;
          };
        }
      ).__smoother;
      if (smoother) {
        smoother.scrollTo(element, true, "center center");
        return;
      }
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (sections.length === 0) {
    return null;
  }

  const menu = (
    <nav
      className={cn(
        position === "fixed"
          ? "fixed left-4 top-20 z-40"
          : "sticky top-24 z-30",
        "max-w-xs",
        className,
      )}
    >
      <div
        className="flex flex-col gap-2"
        onWheel={(event) => event.stopPropagation()}
      >
        <div className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className={cn(
                "block text-sm px-3 py-1.5 rounded-md transition-all duration-200",
                "text-muted-foreground hover:text-foreground hover:bg-accent",
                activeSection === section.id &&
                  "text-foreground font-semibold bg-accent",
              )}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );

  if (position === "fixed") {
    if (!isMounted || typeof document === "undefined") return null;
    return createPortal(menu, document.body);
  }

  return menu;
}
