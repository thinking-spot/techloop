"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";
import { ArrowLeft, Lock, CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("submitting");
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus("success");
    }

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>
                <h2 className="mt-6 text-center text-3xl font-display font-bold text-headline">
                    Set new password
                </h2>
                <p className="mt-2 text-center text-sm text-paragraph">
                    Your new password must be different from previously used passwords.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">

                    {status === "success" ? (
                        <div className="text-center space-y-6 animate-in fade-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                                <CheckCircle2 size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-headline mb-2">Password reset successful</h3>
                                <p className="text-sm text-paragraph">
                                    Your password has been updated. You can now use it to sign in.
                                </p>
                            </div>
                            <Link href="/login">
                                <Button className="w-full">Back to Sign in</Button>
                            </Link>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-headline mb-1">
                                    New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-paragraph/50">
                                        <Lock size={18} />
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="pl-10"
                                        placeholder="••••••••"
                                        minLength={8}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-headline mb-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-paragraph/50">
                                        <Lock size={18} />
                                    </div>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        className="pl-10"
                                        placeholder="••••••••"
                                        minLength={8}
                                    />
                                </div>
                            </div>

                            <div>
                                <Button type="submit" className="w-full" disabled={status === "submitting"}>
                                    {status === "submitting" ? "Resetting..." : "Reset Password"}
                                </Button>
                            </div>
                        </form>
                    )}

                    {status !== "success" && (
                        <div className="mt-6 text-center">
                            <Link href="/login" className="font-medium text-sm text-paragraph hover:text-headline flex items-center justify-center gap-2">
                                <ArrowLeft size={16} /> Back to Sign in
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
