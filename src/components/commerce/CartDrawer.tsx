"use client";

import { useCartStore } from "@/store/cart";
import { ShoppingBag, ArrowRight, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/Sheet";
import { useToast } from "@/components/ui/Toast";

export default function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, total } = useCartStore();
    const { addToast } = useToast();

    const handleRemove = (id: string) => {
        removeItem(id);
        addToast({ title: "Removed", description: "Item removed from cart", type: "info", duration: 2000 });
    }

    return (
        <Sheet isOpen={isOpen} onClose={closeCart} side="right" className="w-full sm:max-w-md">
            <SheetHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
                <SheetTitle className="flex items-center gap-2">
                    <ShoppingBag size={20} /> Your Bag
                </SheetTitle>
                <SheetClose onClick={closeCart} className="static translate-y-0" />
            </SheetHeader>

            <SheetContent className="flex flex-col p-0">
                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="p-4 bg-[#F8FAFC] rounded-full text-paragraph/50">
                                <ShoppingBag size={32} />
                            </div>
                            <div>
                                <h3 className="text-headline font-semibold">Your bag is empty</h3>
                                <p className="text-sm text-paragraph mt-1">Start browsing to add items.</p>
                            </div>
                            <Button variant="secondary" onClick={closeCart}>
                                Browse Devices
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="h-20 w-20 bg-[#F8FAFC] rounded-lg border border-[#F1F5F9] relative flex-shrink-0 flex items-center justify-center overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-semibold text-headline text-sm">{item.name}</h4>
                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                className="text-paragraph hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <p className="text-xs text-paragraph mb-2">Monthly Rental</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-sm font-bold text-headline">${item.price}/mo</span>
                                            {item.quantity > 1 && (
                                                <span className="text-xs font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-600">x{item.quantity}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 border-t border-[#F1F5F9] bg-[#F8FAFC]">
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-paragraph">Subtotal</span>
                                <span className="font-semibold text-headline">${total()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-paragraph">Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-base pt-3 border-t border-[#E2E8F0]">
                                <span className="font-bold text-headline">Total due today</span>
                                <span className="font-bold text-headline">${total()}</span>
                            </div>
                        </div>
                        <Link href="/checkout" onClick={closeCart}>
                            <Button className="w-full flex items-center justify-center gap-2" size="lg">
                                Checkout <ArrowRight size={18} />
                            </Button>
                        </Link>
                        <p className="text-center text-xs text-paragraph mt-3">
                            Free returns & exchanges included.
                        </p>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
