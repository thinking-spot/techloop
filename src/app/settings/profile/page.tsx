"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Mail, Phone, MapPin, Loader2, Ruler } from "lucide-react";
import { useEffect, useState, useActionState } from "react";
import { getProfile } from "@/app/actions/get-profile";
import { updateProfile } from "@/app/actions/update-profile";
import { useToast } from "@/components/ui/Toast";

export default function ProfileSettingsPage() {
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);

    // Server Action for updating
    const [state, action, isPending] = useActionState(updateProfile, { success: false, message: "" });

    useEffect(() => {
        async function loadProfile() {
            const data = await getProfile();
            if (data) {
                setProfile(data);
            }
            setIsLoading(false);
        }
        loadProfile();
    }, []);

    // Handle Server Action feedback
    useEffect(() => {
        if (state.message) {
            addToast({
                title: state.success ? "Success" : "Error",
                description: state.message,
                type: state.success ? "success" : "error",
            });
        }
    }, [state, addToast]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-slate-400" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-headline">Profile Settings</h2>
                <p className="text-paragraph">Manage your personal information and preferences.</p>
            </div>

            {/* Avatar Section - STILL MOCK FOR NOW */}
            <div className="bg-white p-6 rounded-xl border border-[#F1F5F9] shadow-sm flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 overflow-hidden">
                    {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                        <User size={40} />
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-headline">Profile Photo</h3>
                    <p className="text-sm text-paragraph mb-3">Update your photo.</p>
                    <div className="flex gap-3">
                        <button type="button" className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm font-semibold text-headline hover:bg-[#F8FAFC]">
                            Upload New
                        </button>
                    </div>
                </div>
            </div>

            {/* Personal Info Form */}
            <div className="bg-white p-6 rounded-xl border border-[#F1F5F9] shadow-sm">
                <h3 className="text-lg font-bold text-headline mb-6">Personal Information</h3>
                <form action={action} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-headline mb-1">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-paragraph/50">
                                    <User size={18} />
                                </div>
                                <Input name="fullName" defaultValue={profile?.full_name || ""} className="pl-10" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-headline mb-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-paragraph/50">
                                    <Mail size={18} />
                                </div>
                                <Input defaultValue={profile?.email || ""} type="email" className="pl-10 bg-slate-50 text-slate-500" disabled />
                            </div>
                            <p className="text-xs text-paragraph mt-1">Email cannot be changed.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-headline mb-1">Phone Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-paragraph/50">
                                    <Phone size={18} />
                                </div>
                                <Input name="phoneNumber" defaultValue={profile?.phone_number || ""} type="tel" className="pl-10" placeholder="+1 (555) 000-0000" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-headline mb-1">Shipping Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-paragraph/50">
                                    <MapPin size={18} />
                                </div>
                                <Input name="shippingAddress" defaultValue={profile?.shipping_address || ""} className="pl-10" placeholder="123 Tech Loop Blvd" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-[#F1F5F9]">
                        <h4 className="text-lg font-bold text-headline mb-4 flex items-center gap-2">
                            <Ruler size={20} className="text-[#3DA9FC]" /> My Fit
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-headline mb-1">Ring Size</label>
                                <div className="relative">
                                    <select
                                        name="ringSize"
                                        defaultValue={profile?.ring_size || ""}
                                        className="w-full h-10 pl-3 pr-10 rounded-md border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-[#3DA9FC] focus:outline-none appearance-none"
                                    >
                                        <option value="">Select size...</option>
                                        <option value="6">Size 6</option>
                                        <option value="7">Size 7</option>
                                        <option value="8">Size 8</option>
                                        <option value="9">Size 9</option>
                                        <option value="10">Size 10</option>
                                        <option value="11">Size 11</option>
                                        <option value="12">Size 12</option>
                                        <option value="13">Size 13</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                                <p className="text-xs text-paragraph mt-1">For Oura Ring & Samsung Galaxy Ring.</p>
                            </div>

                            <div className="flex items-start gap-3 mt-1">
                                <input
                                    type="checkbox"
                                    name="hasSizingKit"
                                    id="hasSizingKit"
                                    defaultChecked={profile?.has_sizing_kit}
                                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#3DA9FC] focus:ring-[#3DA9FC]"
                                />
                                <label htmlFor="hasSizingKit" className="text-sm">
                                    <span className="font-medium text-headline block">I have a Sizing Kit</span>
                                    <span className="text-paragraph">I already own a sizing kit and know my size.</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-[#F1F5F9] flex justify-end">
                        <Button disabled={isPending}>
                            {isPending ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
