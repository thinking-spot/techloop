"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import Logo from "@/components/ui/Logo";
import { ArrowRight, Key, Mail, User } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function SignupPage() {
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        accessCode: ""
    });

    const isCodeValid = formData.accessCode.length > 0; // Simple validation for now

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        addToast({ title: "Account Created", description: "Welcome to TechLoop!", type: "success" });
        // In a real app, redirect here
    };

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
                    <form className="space-y-6" onSubmit={handleSignup}>
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
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-headline mb-1">
                                Password
                            </label>
                            <PasswordInput // Lock icon is internal to this component now
                                id="password"
                                name="password"
                                required
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                showStrength
                            />
                        </div>

                        <div>
                            <label htmlFor="accessCode" className="block text-sm font-medium text-headline mb-1">
                                Early Access Code
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-paragraph/50">
                                    <Key size={18} />
                                </div>
                                <Input
                                    id="accessCode"
                                    name="accessCode"
                                    type="text"
                                    required
                                    className="pl-10 uppercase tracking-widest font-mono"
                                    value={formData.accessCode}
                                    onChange={(e) => setFormData({ ...formData, accessCode: e.target.value.toUpperCase() })}
                                />
                            </div>
                            <div className="mt-2 text-center text-xs text-paragraph">
                                Don&apos;t have a code? <Link href="/waitlist" className="text-button hover:underline font-medium">Join the Waitlist</Link>
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="w-full flex justify-center items-center gap-2"
                                disabled={isLoading || !isCodeValid}
                                title={!isCodeValid ? "Please enter a valid access code" : ""}
                            >
                                {isLoading ? "Creating..." : "Create Account"}
                                {!isLoading && <ArrowRight size={16} />}
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
