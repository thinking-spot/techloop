import { InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={twMerge(
                    clsx(
                        "flex h-12 w-full rounded-lg border-2 border-[#E5E7EB] bg-white px-4 text-base text-headline placeholder:text-paragraph/50 transition-all focus:border-button focus:outline-none focus:ring-4 focus:ring-button/10 disabled:cursor-not-allowed disabled:bg-[#F9FAFB] disabled:text-paragraph/50",
                        {
                            "border-error focus:border-error focus:ring-error/10": error,
                        }
                    ),
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export { Input };
