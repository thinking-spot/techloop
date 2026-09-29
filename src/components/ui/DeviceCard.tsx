"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import PrimaryCta from "@/components/ui/PrimaryCta";
import { Device } from "@/lib/data";
import { isLaunchDevice } from "@/lib/site-config";
import { useCartStore } from "@/store/cart";
import { WishlistButton } from "@/components/commerce/WishlistButton";
import { useToast } from "@/components/ui/Toast";

interface DeviceCardProps {
    device?: Device;
    // Support individual props for flexibility if full device object isn't present (e.g. from wishlist store)
    id?: string;
    name?: string;
    price?: number | string;
    image?: string;
    category?: string;
}

export default function DeviceCard(props: DeviceCardProps) {
    const { addItem } = useCartStore();
    const { addToast } = useToast();

    // Normalizing props
    const id = props.device?.id || props.id;
    const name = props.device?.name || props.name;
    const priceStr = props.device?.price || props.price?.toString();
    const price = parseFloat(priceStr || "0");
    const image = props.device?.imageUrl || props.image;
    const msrp = props.device?.msrp;
    const description = props.device?.description || "";
    const category = props.device?.category || props.category || "Tech";

    if (!id || !name || !image) return null;

    // Launch devices are the ones we plan to stock first. Everything else is
    // "Coming soon": visitors can ask to be notified, but can't rent it.
    const available = isLaunchDevice(id);

    const handleRent = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem({
            id,
            name,
            price,
            image,
        });
        addToast({ title: "Added to Cart", description: `${name} added to your bag.`, type: "success" });
    };

    return (
        <div className="group relative flex flex-col rounded-card border border-[#F1F5F9] bg-white transition-all hover:border-button/30 hover:shadow-lg hover:-translate-y-1 overflow-hidden h-full">
            {/* Status */}
            <div
                className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                    available ? "bg-headline text-white" : "bg-slate-100 text-slate-600"
                }`}
            >
                {available ? "Launch device" : "Coming soon"}
            </div>

            {/* Wishlist Button */}
            <div className="absolute right-3 top-3 z-10">
                <WishlistButton
                    item={{ id, name, price, image, category }}
                    className="shadow-sm bg-white/90 backdrop-blur-sm"
                />
            </div>

            {/* Image Area */}
            <Link href={`/product/${id}`} className="block">
                <div className="relative aspect-[4/3] w-full bg-[#F8FAFC] p-6 flex items-center justify-center overflow-hidden">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </Link>

            {/* Content Area */}
            <div className="flex flex-1 flex-col p-5">
                <Link href={`/product/${id}`} className="block flex-1 group-hover:text-button transition-colors">
                    <h3 className="mb-1 text-lg font-bold text-headline">{name}</h3>
                    <p className="mb-4 line-clamp-2 text-xs text-paragraph">{description}</p>
                </Link>

                <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-[#F1F5F9]">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-headline">
                            ${price}
                            <span className="text-sm font-medium text-paragraph">/mo</span>
                        </span>
                        {msrp && (
                            <span className="text-xs text-paragraph">Retail ${msrp}</span>
                        )}
                    </div>

                    <PrimaryCta
                        device={{ id, name }}
                        location="device_card"
                        size="sm"
                        forceWaitlist={!available}
                        label={available ? "Join waitlist" : "Notify me"}
                        className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-opacity"
                        liveCta={
                            <Button
                                size="sm"
                                onClick={handleRent}
                                className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                            >
                                Rent Now
                            </Button>
                        }
                    />
                </div>
            </div>
        </div>
    );
}
