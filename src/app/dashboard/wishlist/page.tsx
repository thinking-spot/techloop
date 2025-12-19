"use client"

import { useWishlistStore } from "@/store/wishlist"
import DeviceCard from "@/components/ui/DeviceCard"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Heart } from "lucide-react"

export default function WishlistPage() {
    const { items } = useWishlistStore()

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
                <div className="p-4 bg-slate-100 rounded-full text-slate-400">
                    <Heart size={48} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Your wishlist is empty</h2>
                    <p className="text-slate-500 mt-2">Save items you want to rent later.</p>
                </div>
                <Link href="/browse">
                    <Button>Browse Devices</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">My Wishlist</h1>
                    <p className="text-slate-500">
                        {items.length} {items.length === 1 ? 'item' : 'items'} saved
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <DeviceCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                        category={item.category}
                    />
                ))}
            </div>
        </div>
    )
}
