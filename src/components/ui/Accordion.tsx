"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItemProps {
    title: string
    children: React.ReactNode
    isOpen?: boolean
    onClick?: () => void
    disabled?: boolean
}

function AccordionItem({ title, children, isOpen, onClick }: AccordionItemProps) {
    return (
        <div className="border-b">
            <button
                type="button"
                onClick={onClick}
                className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline w-full text-left"
            >
                {title}
                <ChevronDown
                    className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-200 text-slate-500",
                        isOpen && "rotate-180"
                    )}
                />
            </button>
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
                )}
            >
                <div className="text-sm text-slate-600">{children}</div>
            </div>
        </div>
    )
}


interface AccordionProps {
    items: { title: string; content: React.ReactNode }[]
    className?: string
}

function Accordion({ items, className }: AccordionProps) {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null)

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className={cn("w-full", className)}>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    isOpen={openIndex === index}
                    onClick={() => handleToggle(index)}
                >
                    {item.content}
                </AccordionItem>
            ))}
        </div>
    )
}

export { Accordion }
