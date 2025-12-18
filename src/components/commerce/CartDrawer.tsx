"use client";

import { useCartStore } from "@/store/cart";
import { X, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, total } = useCartStore();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
                onClick={closeCart}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-300">
                <div className="p-6 border-b border-[#F1F5F9] flex items-center justify-between">
                    <h2 className="text-lg font-bold text-headline flex items-center gap-2">
                        <ShoppingBag size={20} /> Your Bag
                    </h2>
                    <button
                        onClick={closeCart}
                        className="p-2 hover:bg-[#F8FAFC] rounded-full transition-colors text-paragraph hover:text-headline"
                    >
                        <X size={20} />
                    </button>
                </div>

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
                                                onClick={() => removeItem(item.id)}
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
            </div>
        </div>
    );
}
