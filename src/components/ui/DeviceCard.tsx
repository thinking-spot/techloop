"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Device } from "@/lib/data";
import { useCartStore } from "@/store/cart";

interface DeviceCardProps {
    device: Device;
}

export default function DeviceCard({ device }: DeviceCardProps) {
    const { addItem } = useCartStore();

    const handleRent = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if wrapped in link
        addItem({
            id: device.id,
            name: device.name,
            price: parseFloat(device.price),
            image: device.imageUrl,
        });
    };

    return (
        <div className="group relative flex flex-col rounded-card border border-[#F1F5F9] bg-white transition-all hover:border-button/30 hover:shadow-lg hover:-translate-y-1 overflow-hidden h-full">
            {/* Badge */}
            {device.badges && device.badges.length > 0 && (
                <div className="absolute left-3 top-3 z-10 rounded-full bg-headline px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                    {device.badges[0]}
                </div>
            )}

            {/* Image Area */}
            <Link href={`/product/${device.id}`} className="block">
                <div className="relative aspect-[4/3] w-full bg-[#F8FAFC] p-6 flex items-center justify-center overflow-hidden">
                    <Image
                        src={device.imageUrl}
                        alt={device.name}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </Link>

            {/* Content Area */}
            <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-current text-yellow-400" />
                    <span className="text-xs font-medium text-headline">{device.rating}</span>
                    <span className="text-xs text-paragraph">({device.reviewCount} reviews)</span>
                </div>

                <Link href={`/product/${device.id}`} className="block flex-1 group-hover:text-button transition-colors">
                    <h3 className="mb-1 text-lg font-bold text-headline">{device.name}</h3>
                    <p className="mb-4 line-clamp-2 text-xs text-paragraph">{device.description}</p>
                </Link>

                <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-[#F1F5F9]">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-headline">${device.price}</span>
                        <span className="text-[10px] font-medium text-paragraph uppercase tracking-wide">Per Month</span>
                    </div>

                    <Button
                        size="sm"
                        onClick={handleRent}
                        className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                    >
                        Rent Now
                    </Button>
                </div>
            </div>
        </div>
    );
}
