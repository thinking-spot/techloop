import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-6">
            <div className="w-full max-w-md rounded-card border border-[#F1F5F9] bg-white p-8 shadow-card md:p-12">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 font-display text-3xl font-bold text-headline">Create an account</h1>
                    <p className="text-paragraph">Start renting the future of technology.</p>
                </div>

                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-headline" htmlFor="firstName">First name</label>
                            <Input id="firstName" placeholder="Jane" />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-headline" htmlFor="lastName">Last name</label>
                            <Input id="lastName" placeholder="Doe" />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-headline" htmlFor="email">Email</label>
                        <Input id="email" type="email" placeholder="name@example.com" />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-headline" htmlFor="password">Password</label>
                        <Input id="password" type="password" placeholder="Create a password" />
                        <p className="mt-1 text-xs text-paragraph">Must be at least 8 characters</p>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                        Create Account
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-paragraph">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-button hover:underline">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
