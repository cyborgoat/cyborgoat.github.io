"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  label: string;
  level: number;
}

export default function BlogTocMenu() {
  const [activeId, setActiveId] = useState<string>("");
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const container = document.getElementById("post-content");
    if (!container) return;

    const updateItems = () => {
      const headings = Array.from(
        container.querySelectorAll<HTMLElement>("h2, h3, h4"),
      ).filter((el) => el.id && el.textContent);

      const nextItems = headings.map((el) => ({
        id: el.id,
        label: el.textContent || "",
        level: Number(el.tagName.replace("H", "")),
      }));

      setItems((previous) =>
        previous.length === nextItems.length &&
        previous.every((item, index) =>
          item.id === nextItems[index].id &&
          item.label === nextItems[index].label &&
          item.level === nextItems[index].level,
        )
          ? previous
          : nextItems,
      );
    };

    // Read headings after the article has committed, including on client navigation.
    let frame = requestAnimationFrame(updateItems);
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateItems);
    });
    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["id"],
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

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

    items.forEach((item) => {
      const heading = document.getElementById(item.id);
      if (heading) observer.observe(heading);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="sticky top-20 max-h-[calc(100dvh-9rem)] overflow-y-auto border-l border-rule pl-4 pr-2">
      <p className="meta-text mb-3">On this page</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${encodeURIComponent(item.id)}`}
               aria-current={activeId === item.id ? "location" : undefined}
               className={cn(
                 "block break-words text-sm text-muted-foreground hover:text-brand aria-[current=location]:font-semibold aria-[current=location]:text-brand",
                 item.level === 3 && "pl-3",
                 item.level === 4 && "pl-5",
               )}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
