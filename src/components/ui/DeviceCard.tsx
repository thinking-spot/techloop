import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "./Button";

interface DeviceCardProps {
    id: string;
    name: string;
    category: string;
    price: string;
    description: string;
    imageUrl: string;
    rating?: number;
    reviewCount?: number;
    badges?: string[];
}

export default function DeviceCard({ id, name, category, price, description, imageUrl, rating, reviewCount, badges }: DeviceCardProps) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-card bg-white border border-[#F1F5F9] shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
            <div className="relative aspect-[4/3] bg-[#F8FAFC] overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {badges && badges.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {badges.slice(0, 2).map(badge => (
                            <span key={badge} className="inline-block bg-headline/90 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm">
                                {badge}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="flex justify-between items-start mb-1">
                    <div className="text-xs font-medium uppercase tracking-wider text-paragraph">
                        {category}
                    </div>
                    {rating && (
                        <div className="flex items-center gap-1 text-xs font-medium text-headline">
                            <Star size={12} fill="currentColor" className="text-yellow-400" />
                            {rating} <span className="text-paragraph/60">({reviewCount})</span>
                        </div>
                    )}
                </div>

                <h3 className="mb-2 text-xl font-medium text-headline group-hover:text-button transition-colors">
                    {name}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-paragraph line-clamp-2">
                    {description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-semibold text-button">
                        ${price}<span className="text-sm font-normal text-paragraph">/mo</span>
                    </span>
                    <Link href={`/product/${id}`}>
                        <Button variant="secondary" size="sm" className="!px-4 !py-2">
                            Rent
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
