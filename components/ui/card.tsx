import type {ComponentProps} from "react";
import {cn} from "@/lib/utils";

export function Card({className, ...props}: ComponentProps<"div">) {
    return <div data-slot="card" className={cn("flex flex-col gap-3 rounded-xl border border-rule bg-card py-5 text-card-foreground", className)} {...props}/>;
}

export function CardHeader({className, ...props}: ComponentProps<"div">) {
    return <div data-slot="card-header" className={cn("px-5", className)} {...props}/>;
}

export function CardContent({className, ...props}: ComponentProps<"div">) {
    return <div data-slot="card-content" className={cn("px-5", className)} {...props}/>;
}

export function CardFooter({className, ...props}: ComponentProps<"div">) {
    return <div data-slot="card-footer" className={cn("mt-auto px-5", className)} {...props}/>;
}
