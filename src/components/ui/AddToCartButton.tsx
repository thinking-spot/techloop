"use client";

import { useCartStore } from "@/store/cart";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import { Device } from "@/lib/data";

export default function AddToCartButton({ product }: { product: Device }) {
    const { addItem } = useCartStore();
    const router = useRouter();

    const handleRentNow = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: parseInt(product.price),
            image: product.imageUrl
        });
        router.push("/checkout");
    };

    return (
        <Button
            size="lg"
            className="w-full mb-4 py-6 text-lg font-bold shadow-button/20 shadow-lg"
            onClick={handleRentNow}
        >
            Rent Now
        </Button>
    );
}
