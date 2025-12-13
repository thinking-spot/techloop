import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-6">
            <div className="w-full max-w-md rounded-card border border-[#F1F5F9] bg-white p-8 shadow-card md:p-12">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 font-display text-3xl font-bold text-headline">Welcome back</h1>
                    <p className="text-paragraph">Enter your details to access your account.</p>
                </div>

                <form className="space-y-4">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-headline" htmlFor="email">Email</label>
                        <Input id="email" type="email" placeholder="name@example.com" />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-sm font-medium text-headline" htmlFor="password">Password</label>
                            <Link href="/forgot-password" className="text-sm font-medium text-button hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <Input id="password" type="password" placeholder="••••••••" />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                        Log In
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-paragraph">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="font-semibold text-button hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
