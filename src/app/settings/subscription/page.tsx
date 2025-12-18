import { CreditCard, CheckCircle, AlertTriangle } from "lucide-react";

export default function SubscriptionSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-headline">Subscription & Billing</h2>
                <p className="text-paragraph">Manage your plan and payment methods.</p>
            </div>

            {/* Active Plan */}
            <div className="bg-white p-6 rounded-xl border border-button/20 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <CreditCard size={120} />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Active</span>
                            <span className="text-sm text-paragraph">Billed monthly</span>
                        </div>
                        <h3 className="text-xl font-bold text-headline">Explorer Plan</h3>
                        <p className="text-sm text-paragraph">Includes 1 active device + 4 swaps/year</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-headline">$48<span className="text-sm font-normal text-paragraph">/mo</span></p>
                        <p className="text-xs text-paragraph">Next billing: Dec 30, 2025</p>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#F1F5F9] flex gap-3">
                    <button className="px-4 py-2 bg-button text-white rounded-lg text-sm font-semibold hover:bg-button-hover shadow-button">
                        Upgrade Plan
                    </button>
                    <button className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm font-semibold text-headline hover:bg-[#F8FAFC]">
                        Pause Subscription
                    </button>
                    <button className="px-4 py-2 text-red-600 text-sm font-semibold hover:bg-red-50 rounded-lg ml-auto">
                        Cancel
                    </button>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white p-6 rounded-xl border border-[#F1F5F9] shadow-sm">
                <h3 className="text-lg font-bold text-headline mb-4">Payment Methods</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-[#E2E8F0] rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-12 bg-slate-100 rounded flex items-center justify-center text-xs font-bold text-slate-500">
                                VISA
                            </div>
                            <div>
                                <p className="text-sm font-bold text-headline">•••• 4242</p>
                                <p className="text-xs text-paragraph">Expires 12/28</p>
                            </div>
                        </div>
                        <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded">Default</span>
                    </div>

                    <button className="w-full py-3 border border-dashed border-slate-300 rounded-lg text-sm font-medium text-paragraph hover:text-headline hover:border-slate-400 transition-colors flex items-center justify-center gap-2">
                        + Add Payment Method
                    </button>
                </div>
            </div>
        </div>
    );
}
