

import { cn } from "../../lib/utils";

export const Skeleton = ({ className }) => {
    return (
        <div
            className={cn(
                "animate-pulse rounded-xl bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700 bg-[length:200%_100%] animate-shimmer",
                className
            )}
        ></div>
    );
};
