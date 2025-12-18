"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>
                <h2 className="mt-6 text-center text-3xl font-display font-bold text-headline">
                    Reset your password
                </h2>
                <p className="mt-2 text-center text-sm text-paragraph">
                    Enter your email properly and we&apos;ll send you instructions to reset your password.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
                    <form className="space-y-6" action="/login">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-headline mb-1">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-paragraph/50">
                                    <Mail size={18} />
                                </div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="pl-10"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <Button type="submit" className="w-full">
                                Send Reset Link
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/login" className="font-medium text-sm text-paragraph hover:text-headline flex items-center justify-center gap-2">
                            <ArrowLeft size={16} /> Back to Sign in
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
