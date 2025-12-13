import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-6">
            <div className="w-full max-w-md rounded-card border border-[#F1F5F9] bg-white p-8 shadow-card md:p-12">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 font-display text-3xl font-bold text-headline">Reset Password</h1>
                    <p className="text-paragraph">Enter your email and we&apos;ll send you instructions to reset your password.</p>
                </div>

                <form className="space-y-4">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-headline" htmlFor="email">Email</label>
                        <Input id="email" type="email" placeholder="name@example.com" />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                        Send Reset Instructions
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/login" className="inline-flex items-center text-sm font-medium text-paragraph hover:text-headline transition-colors">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Log In
                    </Link>
                </div>
            </div>
        </div>
    );
}
