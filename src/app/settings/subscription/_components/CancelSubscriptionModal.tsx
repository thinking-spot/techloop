"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/Modal"
import { Button } from "@/components/ui/Button"
import { AlertTriangle, PauseCircle, PackageX } from "lucide-react"

interface CancelSubscriptionModalProps {
    isOpen: boolean
    onClose: () => void
}

type Step = "confirm" | "reason" | "done"

export default function CancelSubscriptionModal({ isOpen, onClose }: CancelSubscriptionModalProps) {
    const [step, setStep] = useState<Step>("confirm")
    const [reason, setReason] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Reset state when opening
    const handleClose = () => {
        setStep("confirm")
        setReason("")
        onClose()
    }

    const handleCancelSubscription = async () => {
        setIsSubmitting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setStep("done")
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={step === "done" ? "Subscription Cancelled" : "Cancel Subscription"}
            description={step === "done" ? "" : "We&apos;re sorry to see you go."}
        >
            {step === "confirm" && (
                <div className="space-y-6">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                        <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
                        <div className="space-y-1">
                            <h4 className="font-bold text-amber-900 text-sm">You have an active rental</h4>
                            <p className="text-amber-800/80 text-sm">
                                Cancelling your subscription will require you to return your <strong>Meta Ray-Ban</strong> within 14 days.
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-3">
                        <div className="flex items-center gap-2 text-blue-800 font-bold">
                            <PauseCircle size={20} />
                            <h4>Need a break? Pause instead.</h4>
                        </div>
                        <p className="text-blue-700/80 text-sm">
                            Keep your device for just <strong>$10/mo</strong> and resume your full subscription whenever you&apos;re ready. No need to ship anything back.
                        </p>
                        <Button variant="secondary" className="w-full bg-white border-blue-200 text-blue-700 hover:bg-blue-50">
                            Pause Subscription (Save Item)
                        </Button>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button variant="secondary" className="flex-1" onClick={handleClose}>
                            Keep Plan
                        </Button>
                        <button
                            onClick={() => setStep("reason")}
                            className="flex-1 px-4 py-2 text-red-600 text-sm font-semibold hover:bg-red-50 rounded-lg transition-colors"
                        >
                            Continue to Cancel
                        </button>
                    </div>
                </div>
            )}

            {step === "reason" && (
                <div className="space-y-6">
                    <div className="space-y-3">
                        <p className="text-sm font-medium text-headline">Why are you cancelling?</p>
                        <div className="space-y-2">
                            {[
                                "Too expensive",
                                "Not using the device enough",
                                "Going to buy the device instead",
                                "Switching to a competitor",
                                "Other"
                            ].map((r) => (
                                <label
                                    key={r}
                                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${reason === r
                                        ? "border-button bg-blue-50 text-headline"
                                        : "border-slate-200 hover:border-slate-300 text-paragraph"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="reason"
                                        value={r}
                                        checked={reason === r}
                                        onChange={(e) => setReason(e.target.value)}
                                        className="w-4 h-4 text-button border-slate-300 focus:ring-button"
                                    />
                                    <span className="text-sm">{r}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2 border-t border-slate-100">
                        <Button variant="secondary" className="flex-1" onClick={() => setStep("confirm")}>
                            Back
                        </Button>
                        <Button
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white shadow-none"
                            disabled={!reason || isSubmitting}
                            onClick={handleCancelSubscription}
                        >
                            {isSubmitting ? "Cancelling..." : "Confirm Cancellation"}
                        </Button>
                    </div>
                </div>
            )}

            {step === "done" && (
                <div className="text-center space-y-6 py-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-500">
                        <PackageX size={32} />
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-headline text-lg">Your subscription is cancelled</h4>
                        <p className="text-paragraph text-sm max-w-xs mx-auto">
                            Your access ends on <strong>Dec 30, 2025</strong>. We&apos;ve emailed you a return label for your device.
                        </p>
                    </div>
                    <Button className="w-full" onClick={handleClose}>
                        Close
                    </Button>
                </div>
            )}
        </Modal>
    )
}
