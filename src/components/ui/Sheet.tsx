"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SheetProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    side?: "left" | "right"
    className?: string
}

function Sheet({ isOpen, onClose, children, side = "right", className }: SheetProps) {
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        if (isOpen) {
            document.body.style.overflow = "hidden"
            window.addEventListener("keydown", handleEsc)
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            window.removeEventListener("keydown", handleEsc)
            document.body.style.overflow = "unset"
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div
                className={cn(
                    "relative flex flex-col bg-white shadow-2xl transition-all duration-300 ease-in-out h-full",
                    side === "right" ? "ml-auto border-l animate-in slide-in-from-right" : "mr-auto border-r animate-in slide-in-from-left",
                    "w-full max-w-md", // Default width
                    className
                )}
            >
                {children}
            </div>
        </div>
    )
}

function SheetContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex-1 overflow-y-auto p-6", className)}>
            {children}
        </div>
    )
}

function SheetHeader({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex flex-col space-y-2 p-6 border-b", className)}>
            {children}
        </div>
    )
}

function SheetTitle({ className, children }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2 className={cn("text-lg font-semibold text-slate-900", className)}>
            {children}
        </h2>
    )
}

// Helper trigger button not strictly needed if state is controlled externally, but good for completeness
const SheetTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
    <button ref={ref} className={cn(className)} {...props} />
))
SheetTrigger.displayName = "SheetTrigger"

// Close button helper
function SheetClose({ onClick, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            onClick={onClick}
            className={cn("absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100", className)}
            {...props}
        >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
        </button>
    )
}


export { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose }
