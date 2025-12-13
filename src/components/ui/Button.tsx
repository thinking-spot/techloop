import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tertiary";
    size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={twMerge(
                    clsx(
                        "inline-flex items-center justify-center rounded-button font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-button focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
                        {
                            "bg-button text-button-text hover:bg-[#2D8FDC] active:bg-[#1D7FCC] shadow-sm hover:shadow-md hover:-translate-y-[1px]":
                                variant === "primary",
                            "bg-white text-headline border-2 border-headline hover:bg-[#F8FAFC] active:bg-[#F1F5F9]":
                                variant === "secondary",
                            "bg-transparent text-button hover:text-[#2D8FDC] active:text-[#1D7FCC] underline hover:no-underline":
                                variant === "tertiary",
                            "px-3 py-1.5 text-sm": size === "sm",
                            "px-6 py-3 text-base": size === "md",
                            "px-8 py-4 text-lg": size === "lg",
                        }
                    ),
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };
