import type {ComponentProps} from "react";
import {ChevronDown} from "lucide-react";
import {cn} from "@/lib/utils";

export function NativeSelect({className, ...props}: ComponentProps<"select">) {
    return (
        <div data-slot="native-select-wrapper" className="relative w-full min-w-0">
            <select data-slot="native-select"
                    className={cn("h-11 w-full min-w-0 appearance-none truncate rounded-md border border-input bg-background py-1 pl-3 pr-9 text-base text-foreground sm:text-sm", className)}
                    {...props}/>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"/>
        </div>
    );
}
