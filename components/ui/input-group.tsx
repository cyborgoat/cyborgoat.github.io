import type {ComponentProps} from "react";
import {cn} from "@/lib/utils";

export function InputGroup({className, ...props}: ComponentProps<"div">) {
    return (
        <div data-slot="input-group" role="group"
             className={cn("flex h-11 min-w-0 items-center rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background", className)}
             {...props}/>
    );
}

export function InputGroupAddon({className, ...props}: ComponentProps<"div">) {
    return <div data-slot="input-group-addon" className={cn("flex shrink-0 items-center pl-3 text-muted-foreground [&>svg]:size-4", className)} {...props}/>;
}

export function InputGroupInput({className, ...props}: ComponentProps<"input">) {
    return (
        <input data-slot="input-group-control"
               className={cn("h-full w-full min-w-0 bg-transparent px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none sm:text-sm", className)}
               {...props}/>
    );
}
