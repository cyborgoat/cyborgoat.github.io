// components/ui/3d-card.tsx
"use client";

import {cn} from "@/lib/utils"; // Assuming you have this utility
import React, {
    createContext,
    ElementType,
    forwardRef,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import {motion, MotionProps, useMotionValue, useSpring, useTransform,} from "framer-motion";

// --- Context Definition ---
interface MouseEnterContextType {
    isInside: boolean;
    setIsInside: React.Dispatch<React.SetStateAction<boolean>>;
}

const MouseEnterContext = createContext<MouseEnterContextType | undefined>(
    undefined
);

export const CardContainer = ({
                                  children,
                                  className,
                                  containerClassName,
                              }: {
    children?: ReactNode;
    className?: string;
    containerClassName?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInside, setIsInside] = useState<boolean>(false);

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const {left, top, width, height} = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        rotateX.set(-y);
        rotateY.set(x);
    };

    const handleMouseEnter = () => {
        setIsInside(true);
    };
    const handleMouseLeave = () => {
        setIsInside(false);
        rotateX.set(0);
        rotateY.set(0);
    };

    const springConfig = {stiffness: 150, damping: 20, mass: 1};
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    return (
        <MouseEnterContext.Provider value={{isInside, setIsInside}}>
            <div
                className={cn(
                    // ***** REDUCED PADDING HERE *****
                    "py-6 flex items-center justify-center", // Reduced from py-10
                    // ******************************
                    containerClassName
                )}
                style={{perspective: "1000px"}}
            >
                <motion.div
                    ref={containerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={cn(
                        "flex items-center justify-center relative transition-all duration-200 ease-linear",
                        className
                    )}
                    style={{
                        transformStyle: "preserve-3d",
                        rotateX: rotateXSpring,
                        rotateY: rotateYSpring,
                    }}
                >
                    {children}
                </motion.div>
            </div>
        </MouseEnterContext.Provider>
    );
};


// --- CardBody Component (Reduced Width) ---
export const CardBody = ({
                             children,
                             className,
                         }: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                // ***** REDUCED WIDTH HERE *****
                "h-auto min-h-[300px] w-full sm:w-[28rem] [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]", // Changed from sm:w-[30rem]
                // ****************************

                // Base card appearance & hover effects (including shining border setup)
                "relative group/card rounded-xl border border-black/[0.1] dark:border-white/[0.2] bg-background",
                "dark:hover:shadow-2xl dark:hover:shadow-primary/[0.25] hover:shadow-xl hover:brightness-[1.02] transition-all duration-300",
                "before:content-[''] before:absolute before:-z-10 before:inset-0 before:rounded-[inherit]",
                "before:bg-[conic-gradient(from_var(--border-angle),_theme(colors.slate.400),_theme(colors.primary)_5%,_theme(colors.primary)_10%,_theme(colors.slate.400)_20%)] dark:before:bg-[conic-gradient(from_var(--border-angle),_theme(colors.slate.700),_theme(colors.primary)_5%,_theme(colors.primary)_10%,_theme(colors.slate.700)_20%)]",
                "before:opacity-0 group-hover/card:before:opacity-100 before:transition-opacity before:duration-500",
                "before:[animation:rotate-border_3s_linear_infinite_paused] group-hover/card:before:[animation-play-state:running]",
                "before:[--border-angle:0deg]",

                className
            )}
            style={
                {"--border-angle": "0deg"} as React.CSSProperties
            }
        >
            {/* Inner padding container */}
            <div className="relative z-10 p-6 h-full flex flex-col">
                {children}
            </div>
        </div>
    );
};
type CardItemProps = {
    as?: ElementType;
    children: React.ReactNode;
    className?: string;
    translateX?: number | string;
    translateY?: number | string;
    translateZ?: number | string;
    rotateX?: number | string;
    rotateY?: number | string;
    rotateZ?: number | string;
    // Ensure any custom props needed by 'as' components (like href for Link) are allowed
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // Allow other props like href, target, etc.
} & MotionProps; // Include MotionProps for motion-specific attributes

export const CardItem = forwardRef<HTMLElement, CardItemProps>(
    (
        {
            as: Tag = "div", // Default Tag is 'div'
            children,
            className,
            translateX = 0,
            translateY = 0,
            translateZ = 0,
            rotateX = 0,
            rotateY = 0,
            rotateZ = 0,
            ...rest // Capture remaining props (like href, target, onClick)
        },
        ref // Forwarded ref
    ) => {
        const {isInside} = useMouseEnter();

        // Motion values for smooth transitions
        const x = useMotionValue(0);
        const y = useMotionValue(0);

        // Update motion values based on hover state
        useEffect(() => {
            x.set(isInside ? Number(translateX) : 0);
            y.set(isInside ? Number(translateY) : 0);
        }, [isInside, translateX, translateY, x, y]);

        // Spring animations for translation
        const springConfig = {stiffness: 100, damping: 15, mass: 0.1};
        const translateXSpring = useSpring(x, springConfig);
        const translateYSpring = useSpring(y, springConfig);

        // Compute the transform style string
        const transform = useTransform(
            [translateXSpring, translateYSpring],
            ([currentX, currentY]) =>
                `translateX(${currentX}px) translateY(${currentY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
        );

        // Create a dynamic motion component based on the 'as' prop
        const MotionComponent = motion(Tag);

        return (
            <MotionComponent
                ref={ref} // Apply the forwarded ref here
                className={cn("w-fit", className)} // Base styles + custom classes
                style={{
                    transformStyle: "preserve-3d", // Needed for children if they also have transforms
                    transform: transform, // Apply the animated transform
                }}
                {...rest} // Spread the rest of the props (IMPORTANT: including href)
            >
                {children}
            </MotionComponent>
        );
    }
);

CardItem.displayName = "CardItem";


// --- Hook Definition ---
export const useMouseEnter = (): MouseEnterContextType => {
    const context = useContext(MouseEnterContext);
    if (context === undefined) {
        throw new Error("useMouseEnter must be used within a CardContainer");
    }
    return context;
};