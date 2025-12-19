"use client"

import * as React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/Sheet"
import { Package, Truck, CreditCard, Calendar } from "lucide-react"

interface OrderDetailsSheetProps {
    isOpen: boolean
    onClose: () => void
}

export default function OrderDetailsSheet({ isOpen, onClose }: OrderDetailsSheetProps) {
    return (
        <Sheet isOpen={isOpen} onClose={onClose} side="right" className="w-full sm:max-w-lg">
            <SheetHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
                <SheetTitle>Manage Rental</SheetTitle>
                <SheetClose onClick={onClose} className="static translate-y-0" />
            </SheetHeader>

            <SheetContent className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6 space-y-6">

                {/* Device Snapshot */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
                    <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Package className="text-slate-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">Ray-Ban Meta</h3>
                        <p className="text-sm text-slate-500">Wayfarer Matte Black</p>
                        <span className="inline-block mt-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Active</span>
                    </div>
                </div>

                {/* Shipping Status */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <h4 className="font-semibold flex items-center gap-2 text-slate-900">
                        <Truck size={18} /> Shipping Status
                    </h4>
                    <div className="relative pl-4 border-l-2 border-slate-100 space-y-6">
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white ring-1 ring-green-100" />
                            <p className="text-sm font-medium text-slate-900">Delivered</p>
                            <p className="text-xs text-slate-500">Dec 2, 2025 - 2:30 PM</p>
                        </div>
                        <div className="relative opacity-50">
                            <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-slate-300 border-2 border-white" />
                            <p className="text-sm font-medium text-slate-900">Out for Delivery</p>
                            <p className="text-xs text-slate-500">Dec 2, 2025 - 8:00 AM</p>
                        </div>
                    </div>
                </div>

                {/* Billing */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <h4 className="font-semibold flex items-center gap-2 text-slate-900">
                        <CreditCard size={18} /> Billing
                    </h4>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Payment Method</span>
                        <span className="font-medium text-slate-900">Visa ending in 4242</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Monthly Total</span>
                        <span className="font-bold text-slate-900">$29.00</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 mt-2">
                        <Calendar size={14} />
                        Next payment due on <strong>Jan 2, 2026</strong>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <button className="w-full py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50">
                        Report Issue
                    </button>
                    <button className="w-full py-3 bg-white border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50">
                        Cancel Subscription
                    </button>
                </div>

            </SheetContent>
        </Sheet>
    )
}
