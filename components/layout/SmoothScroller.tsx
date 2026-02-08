"use client";

import React, { useRef } from 'react';
import gsap from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger and ScrollSmoother plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothScrollerProps {
  children: React.ReactNode;
}

export default function SmoothScroller({ children }: SmoothScrollerProps) {
  const main = useRef<HTMLDivElement>(null);
  const smoother = useRef<ScrollSmoother | null>(null);

  useGSAP(
    () => {
      ScrollTrigger.normalizeScroll(true);
      gsap.ticker.lagSmoothing(0);
      smoother.current = ScrollSmoother.create({
        smooth: 1.1,
        effects: true,
        smoothTouch: 0,
        ignoreMobileResize: true,
      });
      (window as unknown as { __smoother?: ScrollSmoother }).__smoother = smoother.current;
      ScrollTrigger.refresh();

      gsap.utils.toArray<HTMLElement>(".fade-on-scroll").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 35%",
              scrub: true,
            },
          }
        );
      });

      return () => {
        smoother.current?.kill();
        smoother.current = null;
        (window as unknown as { __smoother?: ScrollSmoother }).__smoother = undefined;
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    {
      scope: main,
    }
  );

  return (
    <div id="smooth-wrapper" ref={main}>
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}
