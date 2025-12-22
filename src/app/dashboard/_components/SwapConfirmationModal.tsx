"use client"

import { Modal } from "@/components/ui/Modal"
import { Button } from "@/components/ui/Button"
import { RefreshCcw, ArrowRight, Truck } from "lucide-react"
import Image from "next/image"

interface SwapConfirmationModalProps {
    isOpen: boolean
    onClose: () => void
    device: { name: string; image: string } | null
}

export default function SwapConfirmationModal({ isOpen, onClose, device }: SwapConfirmationModalProps) {
    if (!device) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Confirm Swap"
        >
            <div className="space-y-6">
                <div className="flex items-center gap-4 py-4">
                    <div className="flex-1 text-center space-y-2 opacity-60">
                        <div className="w-16 h-16 bg-slate-100 rounded-lg mx-auto flex items-center justify-center">
                            <Image
                                src="https://placehold.co/100x100?text=Ray-Ban"
                                alt="Current"
                                width={64}
                                height={64}
                                className="opacity-50"
                            />
                        </div>
                        <p className="text-xs font-medium">Current Device</p>
                    </div>

                    <div className="flex flex-col items-center text-button">
                        <RefreshCcw size={24} />
                        <ArrowRight size={16} className="mt-1" />
                    </div>

                    <div className="flex-1 text-center space-y-2">
                        <div className="w-16 h-16 bg-blue-50 border-2 border-button rounded-lg mx-auto flex items-center justify-center relative overflow-hidden">
                            <Image
                                src={device.image}
                                alt={device.name}
                                width={64}
                                height={64}
                                className="object-cover"
                            />
                        </div>
                        <p className="text-xs font-bold text-headline">{device.name}</p>
                    </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
                    <h4 className="font-bold text-headline text-sm flex items-center gap-2">
                        <Truck size={16} /> What happens next?
                    </h4>
                    <ul className="text-xs text-paragraph space-y-2">
                        <li className="flex gap-2">
                            <div className="w-4 h-4 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">1</div>
                            <span>We ship your <strong>{device.name}</strong> today (Arrives in 2 days).</span>
                        </li>
                        <li className="flex gap-2">
                            <div className="w-4 h-4 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">2</div>
                            <span>Return your current device within 7 days using the prepaid label in the box.</span>
                        </li>
                        <li className="flex gap-2">
                            <div className="w-4 h-4 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">3</div>
                            <span>Your monthly billing date remains the same.</span>
                        </li>
                    </ul>
                </div>

                <div className="flex gap-3">
                    <Button variant="secondary" className="flex-1" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button className="flex-1">
                        Confirm Swap
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
