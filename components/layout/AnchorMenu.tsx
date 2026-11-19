"use client";

import {useEffect, useState} from "react";

interface AnchorSection {
    id: string;
    label: string;
}

export default function AnchorMenu({sections}: {sections: AnchorSection[]}) {
    const [activeSection, setActiveSection] = useState(sections[0]?.id);

    useEffect(() => {
        const targets = sections
            .map(({id}) => document.getElementById(id))
            .filter((target): target is HTMLElement => target !== null);
        if (targets.length === 0) return;

        let frame: number | undefined;
        const update = () => {
            frame = undefined;
            const scrollRoot = document.documentElement;
            const activationLine = Math.min(160, window.innerHeight / 3);
            let current = targets[0];

            for (const target of targets) {
                if (target.getBoundingClientRect().top > activationLine) break;
                current = target;
            }

            if (scrollRoot.scrollHeight > window.innerHeight && scrollRoot.scrollHeight - window.scrollY <= window.innerHeight + 2) {
                const linkedSection = targets.find((target) =>
                    `#${target.id}` === window.location.hash &&
                    target.getBoundingClientRect().bottom > activationLine,
                );
                current = linkedSection ?? targets[targets.length - 1];
            }
            setActiveSection(current.id);
        };

        const scheduleUpdate = () => {
            if (frame === undefined) frame = requestAnimationFrame(update);
        };

        scheduleUpdate();
        window.addEventListener("scroll", scheduleUpdate, {passive: true});
        window.addEventListener("resize", scheduleUpdate);
        window.addEventListener("hashchange", scheduleUpdate);
        return () => {
            if (frame !== undefined) cancelAnimationFrame(frame);
            window.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
            window.removeEventListener("hashchange", scheduleUpdate);
        };
    }, [sections]);

    return (
        <nav aria-label="On this page" className="xl:sticky xl:top-24">
            <p className="meta-text mb-2 hidden xl:block">On this page</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 pb-2 xl:flex-col xl:gap-1 xl:pb-0">
                {sections.map(({id, label}) => (
                    <li key={id}>
                        <a href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}
                           className="flex min-h-11 items-center rounded-sm text-sm xl:min-h-9 text-muted-foreground hover:text-brand aria-[current=location]:font-semibold aria-[current=location]:text-brand xl:border-l xl:border-rule xl:pl-3 xl:aria-[current=location]:border-brand">
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
