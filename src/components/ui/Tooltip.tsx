"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
    content: React.ReactNode
    children: React.ReactNode
    delayDuration?: number
}

function Tooltip({ content, children, delayDuration = 200 }: TooltipProps) {
    const [isVisible, setIsVisible] = React.useState(false)
    const timeoutRef = React.useRef<NodeJS.Timeout>(null)

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true)
        }, delayDuration)
    }

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        setIsVisible(false)
    }

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {isVisible && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50">
                    <div className="bg-slate-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                        {content}
                        {/* Triangle arrow */}
                        <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                    </div>
                </div>
            )}
        </div>
    )
}

export { Tooltip }
