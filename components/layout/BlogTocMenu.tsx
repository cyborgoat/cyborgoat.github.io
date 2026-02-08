"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  label: string;
  level: number;
}

interface BlogTocMenuProps {
  containerSelector?: string;
  className?: string;
}

export default function BlogTocMenu({
  containerSelector = "#post-content",
  className,
}: BlogTocMenuProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const headings = Array.from(
      container.querySelectorAll<HTMLElement>("h2, h3, h4"),
    ).filter((el) => el.id && el.textContent);

    const nextItems = headings.map((el) => ({
      id: el.id,
      label: el.textContent || "",
      level: Number(el.tagName.replace("H", "")),
    }));

    setItems(nextItems);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [containerSelector]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
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
      smoother.scrollTo(element, true, "top top");
      return;
    }
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const menu = useMemo(() => {
    if (items.length === 0) return null;
    return (
      <nav
        className={cn(
          "fixed left-6 top-24 z-40 hidden xl:block",
          "max-w-xs",
          className,
        )}
      >
        <div
          className="flex flex-col gap-2 rounded-lg border border-border/60 bg-background/80 p-3 backdrop-blur"
          onWheel={(event) => event.stopPropagation()}
        >
          <div className="text-xs font-semibold text-muted-foreground">
            On this page
          </div>
          <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={cn(
                  "block w-full text-left text-sm px-2 py-1.5 rounded-md transition-all",
                  "text-muted-foreground hover:text-foreground hover:bg-accent",
                  activeId === item.id &&
                    "text-foreground font-semibold bg-accent",
                  item.level === 3 && "pl-4",
                  item.level === 4 && "pl-6",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    );
  }, [items, activeId, className]);

  if (!isMounted || typeof document === "undefined") return null;
  if (!menu) return null;

  return createPortal(menu, document.body);
}
