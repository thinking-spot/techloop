import { InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Check } from "lucide-react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, id, ...props }, ref) => {
        // Ensure we have an ID for the label
        const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className="flex items-center gap-3">
                <div className="relative flex items-center">
                    <input
                        type="checkbox"
                        id={inputId}
                        ref={ref}
                        className={twMerge(
                            clsx(
                                "peer h-5 w-5 appearance-none rounded border-2 border-headline bg-white transition-all checked:bg-button checked:border-button hover:border-button focus:outline-none focus:ring-2 focus:ring-button focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            ),
                            className
                        )}
                        {...props}
                    />
                    <Check
                        size={14}
                        strokeWidth={3}
                        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                    />
                </div>
                {label && (
                    <label htmlFor={inputId} className="cursor-pointer select-none text-sm font-medium text-headline">
                        {label}
                    </label>
                )}
            </div>
        );
    }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
