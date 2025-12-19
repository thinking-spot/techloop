"use client"

import * as React from "react"
import { Eye, EyeOff, Lock } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    showStrength?: boolean
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, showStrength = false, onChange, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false)
        const [strength, setStrength] = React.useState(0)

        const calculateStrength = (val: string) => {
            let score = 0
            if (val.length > 5) score += 1
            if (val.length > 8) score += 1
            if (/[A-Z]/.test(val)) score += 1
            if (/[0-9]/.test(val)) score += 1
            if (/[^A-Za-z0-9]/.test(val)) score += 1
            return score
        }

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (showStrength) {
                setStrength(calculateStrength(e.target.value))
            }
            onChange?.(e)
        }

        const strengthColor = () => {
            if (strength <= 2) return "bg-red-500"
            if (strength <= 4) return "bg-yellow-500"
            return "bg-green-500"
        }

        const strengthLabel = () => {
            if (strength <= 2) return "Weak"
            if (strength <= 4) return "Medium"
            return "Strong"
        }

        return (
            <div className="space-y-2">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-paragraph/50 z-10">
                        <Lock size={18} />
                    </div>

                    <Input
                        type={showPassword ? "text" : "password"}
                        className={cn("pl-10 pr-10", className)}
                        ref={ref}
                        onChange={handleChange}
                        {...props}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-paragraph/50 hover:text-headline transition-colors z-10"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {showStrength && props.value && (props.value as string).length > 0 && (
                    <div className="space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className={cn("h-full transition-all duration-300", strengthColor())}
                                style={{ width: `${(strength / 5) * 100}%` }}
                            />
                        </div>
                        <p className="text-xs text-right text-paragraph">
                            Strength: <span className={cn("font-medium", strength <= 2 ? "text-red-500" : strength <= 4 ? "text-yellow-500" : "text-green-500")}>{strengthLabel()}</span>
                        </p>
                    </div>
                )}
            </div>
        )
    }
)
PasswordInput.displayName = "PasswordInput"
