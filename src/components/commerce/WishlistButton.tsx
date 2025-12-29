"use client"

import * as React from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWishlistStore, WishlistItem } from "@/store/wishlist"
import { useToast } from "@/components/ui/Toast"

interface WishlistButtonProps {
    item: WishlistItem
    className?: string
}

export function WishlistButton({ item, className }: WishlistButtonProps) {
    const { addItem, removeItem, isInWishlist } = useWishlistStore()
    const { addToast } = useToast()
    const isSaved = isInWishlist(item.id)

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (isSaved) {
            removeItem(item.id)
            addToast({ title: "Removed from Wishlist", type: "info", duration: 1500 })
        } else {
            addItem(item)
            addToast({ title: "Saved to Wishlist", type: "success", duration: 1500 })
        }
    }

    return (
        <button
            onClick={toggleWishlist}
            className={cn(
                "rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border",
                isSaved
                    ? "bg-slate-100 text-headline border-headline hover:bg-slate-200"
                    : "bg-slate-100 text-slate-400 border-transparent hover:bg-slate-200 hover:text-slate-600",
                className
            )}
            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
        >
            <Heart
                className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    isSaved && "fill-current scale-110"
                )}
            />
        </button>
    )
}
