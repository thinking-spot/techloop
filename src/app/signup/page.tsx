"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";
import { ArrowRight, Mail, Lock, User } from "lucide-react";

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>
                <h2 className="mt-6 text-center text-3xl font-display font-bold text-headline">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-paragraph">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-button hover:text-button/80">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
                    <form className="space-y-6" action="/dashboard">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-headline mb-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-paragraph/50">
                                    <User size={18} />
                                </div>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="pl-10"
                                    placeholder="Jane Doe"
                                />
                            </div>
                        </div>

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
                            <label htmlFor="password" className="block text-sm font-medium text-headline mb-1">
                                Password
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
                                />
                            </div>
                            <p className="mt-2 text-xs text-paragraph">
                                Must be at least 8 characters.
                            </p>
                        </div>

                        <div>
                            <Button type="submit" className="w-full flex justify-center items-center gap-2">
                                Create Account <ArrowRight size={16} />
                            </Button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-xs text-paragraph">
                        By signing up, you agree to our{" "}
                        <Link href="/terms" className="font-medium hover:text-headline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="font-medium hover:text-headline">
                            Privacy Policy
                        </Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}
