"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { XCircle, HelpCircle, ArrowLeft } from "lucide-react";

export default function CheckoutCancelPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="bg-white max-w-md w-full rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                    <XCircle size={32} />
                </div>

                <h1 className="text-2xl font-display font-bold text-headline mb-3">
                    Payment Cancelled
                </h1>

                <p className="text-paragraph mb-8 leading-relaxed">
                    Your checkout process was cancelled and you haven&apos;t been charged. Don&apos;t worry, your cart is safe.
                </p>

                <div className="space-y-3">
                    <Link href="/checkout">
                        <Button className="w-full" size="lg">
                            Return to Checkout
                        </Button>
                    </Link>

                    <Link href="/help">
                        <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                            <HelpCircle size={18} /> specific issue? Contact Support
                        </Button>
                    </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                    <Link href="/" className="text-sm font-medium text-paragraph hover:text-headline flex items-center justify-center gap-1">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
