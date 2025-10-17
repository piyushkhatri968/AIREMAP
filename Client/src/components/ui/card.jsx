import React from "react";
import { cn } from "../../lib/utils"

export const Card = ({ children, className }) => {
    return (
        <div
            className={cn(
                "rounded-lg border bg-card text-card-foreground shadow-sm",
                className
            )}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
            {children}
        </div>
    );
};

export const CardTitle = ({ children, className }) => {
    return (
        <h2
            className={cn(
                "text-2xl font-semibold leading-none tracking-tight",
                className
            )}
        >
            {children}
        </h2>
    );
};

export const CardDescription = ({ children, className }) => {
    return (
        <p className={cn("text-sm text-muted-foreground", className)}>
            {children}
        </p>
    );
};

export const CardContent = ({ children, className }) => {
    return <div className={cn("p-6 pt-0", className)}>{children}</div>;
};

export const CardFooter = ({ children, className }) => {
    return <div className={cn("flex items-center p-6 pt-0", className)}>{children}</div>;
};