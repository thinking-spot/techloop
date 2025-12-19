"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    description?: string
    children: React.ReactNode
    className?: string
}

function Modal({ isOpen, onClose, title, description, children, className }: ModalProps) {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div
                className={cn(
                    "relative w-full max-w-lg transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all sm:my-8",
                    "animate-in fade-in zoom-in-95 duration-200",
                    className
                )}
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                        {title && <h3 className="text-lg font-semibold leading-6 text-slate-900">{title}</h3>}
                        {description && <p className="text-sm text-slate-500">{description}</p>}
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 hover:bg-slate-100 transition-colors"
                    >
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export { Modal }
