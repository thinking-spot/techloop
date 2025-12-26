"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Mail, Phone, MapPin } from "lucide-react";

export default function ProfileSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-headline">Profile Settings</h2>
                <p className="text-paragraph">Manage your personal information and preferences.</p>
            </div>

            {/* Avatar Section */}
            <div className="bg-white p-6 rounded-xl border border-[#F1F5F9] shadow-sm flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                    <User size={40} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-headline">Profile Photo</h3>
                    <p className="text-sm text-paragraph mb-3">Update your photo.</p>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm font-semibold text-headline hover:bg-[#F8FAFC]">
                            Upload New
                        </button>
                        <button className="px-4 py-2 text-red-600 text-sm font-semibold hover:bg-red-50 rounded-lg">
                            Remove
                        </button>
                    </div>
                </div>
            </div>

            {/* Personal Info Form */}
            <div className="bg-white p-6 rounded-xl border border-[#F1F5F9] shadow-sm">
                <h3 className="text-lg font-bold text-headline mb-6">Personal Information</h3>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-headline mb-1">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-paragraph/50">
                                    <User size={18} />
                                </div>
                                <Input defaultValue="James Test" className="pl-10" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-headline mb-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-paragraph/50">
                                    <Mail size={18} />
                                </div>
                                <Input defaultValue="james@example.com" type="email" className="pl-10" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-headline mb-1">Phone Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-paragraph/50">
                                    <Phone size={18} />
                                </div>
                                <Input defaultValue="+1 (555) 000-0000" type="tel" className="pl-10" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-headline mb-1">Shipping Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-paragraph/50">
                                    <MapPin size={18} />
                                </div>
                                <Input defaultValue="123 Tech Loop Blvd, San Francisco, CA" className="pl-10" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-[#F1F5F9] flex justify-end">
                        <Button>Save Changes</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
