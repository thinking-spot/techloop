"use client"

import * as React from "react"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export type ToastType = "success" | "error" | "info" | "default"

interface Toast {
    id: string
    title?: string
    description?: string
    type: ToastType
    duration: number
}

interface ToastContextType {
    toasts: Toast[]
    addToast: (toast: Omit<Toast, "id" | "duration"> & { duration?: number }) => void
    removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function useToast() {
    const context = React.useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<Toast[]>([])

    const addToast = React.useCallback(
        ({ title, description, type = "default", duration = 3000 }: Omit<Toast, "id" | "duration"> & { duration?: number }) => {
            const id = Math.random().toString(36).substring(2, 9)
            setToasts((prev) => [...prev, { id, title, description, type, duration }])
        },
        []
    )

    const removeToast = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <div className="fixed bottom-0 left-0 z-[100] flex flex-col gap-2 p-4 sm:max-w-[420px] w-full">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
                ))}
            </div>
        </ToastContext.Provider>
    )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onRemove()
        }, toast.duration)

        return () => clearTimeout(timer)
    }, [toast.duration, onRemove])

    const icons = {
        success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
        error: <AlertCircle className="h-5 w-5 text-red-500" />,
        info: <Info className="h-5 w-5 text-blue-500" />,
        default: null,
    }

    const bgColors = {
        success: "bg-white border-emerald-100",
        error: "bg-white border-red-100",
        info: "bg-white border-blue-100",
        default: "bg-white border-slate-200",
    }

    return (
        <div
            className={cn(
                "flex w-full items-start gap-4 rounded-lg border p-4 shadow-lg transition-all animate-in slide-in-from-left-full duration-300",
                bgColors[toast.type]
            )}
        >
            {icons[toast.type]}
            <div className="flex-1 space-y-1">
                {toast.title && <p className="font-medium text-sm text-slate-900">{toast.title}</p>}
                {toast.description && <p className="text-sm text-slate-500">{toast.description}</p>}
            </div>
            <button
                onClick={onRemove}
                className="rounded-md p-1 text-slate-400 hover:text-slate-900 transition-colors"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    )
}
