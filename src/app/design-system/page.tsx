"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card"
import { Avatar } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { Skeleton } from "@/components/ui/Skeleton"
import { Modal } from "@/components/ui/Modal"
import { Select } from "@/components/ui/Select"
import { Accordion } from "@/components/ui/Accordion"
import { useToast } from "@/components/ui/Toast"
import { Tooltip } from "@/components/ui/Tooltip"
// We'll use a standard HTML button in place of the one from components/ui if it doesn't exist yet, 
// or I can assume it exists. Let's use standard button with classes for now to be safe,
// or check components/ui. Previous ls showed Button.tsx exists.
import { Button } from "@/components/ui/Button"

export default function DesignSystemPage() {
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [selectValue, setSelectValue] = React.useState("")
    const { addToast } = useToast()

    return (
        <div className="container mx-auto py-12 px-4 space-y-12">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">Design System</h1>
                <p className="text-lg text-slate-600">Verification page for Phase 1 UI components.</p>
            </div>

            {/* Cards */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Cards</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Simple Card</CardTitle>
                            <CardDescription>This is a basic card description.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card content goes here. It can be anything.</p>
                        </CardContent>
                        <CardFooter>
                            <Button>Action</Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>

            {/* Avatars & Badges */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Avatars & Badges</h2>
                <div className="flex flex-wrap gap-8 items-center">
                    <div className="flex items-center gap-4">
                        <Avatar src="https://github.com/shadcn.png" alt="@shadcn" />
                        <Avatar fallback="JD" />
                    </div>
                    <div className="flex gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="outline">Outline</Badge>
                    </div>
                </div>
            </section>

            {/* Interactive */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Interactive</h2>
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Modal */}
                    <Card>
                        <CardHeader><CardTitle>Modal</CardTitle></CardHeader>
                        <CardContent>
                            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
                            <Modal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                title="Example Modal"
                                description="This is a modal created with our new component."
                            >
                                <div className="space-y-4 pt-4">
                                    <p className="text-slate-600">Modals are great for focusing user attention.</p>
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                        <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
                                    </div>
                                </div>
                            </Modal>
                        </CardContent>
                    </Card>

                    {/* Toasts */}
                    <Card>
                        <CardHeader><CardTitle>Toasts</CardTitle></CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            <Button onClick={() => addToast({ title: "Success!", description: "Action completed successfully.", type: "success" })}>
                                Success Toast
                            </Button>
                            <Button variant="outline" onClick={() => addToast({ title: "Error", description: "Something went wrong.", type: "error" })}>
                                Error Toast
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Select */}
                    <Card className="overflow-visible">
                        <CardHeader><CardTitle>Select</CardTitle></CardHeader>
                        <CardContent>
                            <Select
                                options={[
                                    { label: "Option 1", value: "1" },
                                    { label: "Option 2", value: "2" },
                                    { label: "Option 3", value: "3" },
                                ]}
                                value={selectValue}
                                onChange={setSelectValue}
                            />
                        </CardContent>
                    </Card>

                    {/* Tooltip */}
                    <Card className="overflow-visible">
                        <CardHeader><CardTitle>Tooltip</CardTitle></CardHeader>
                        <CardContent>
                            <Tooltip content="This is a tooltip!">
                                <span className="underline decoration-dotted cursor-help">Hover me for a secret</span>
                            </Tooltip>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Accordion */}
            <section className="space-y-4 mb-20">
                <h2 className="text-2xl font-semibold">Accordion</h2>
                <Card>
                    <CardContent className="pt-6">
                        <Accordion
                            items={[
                                { title: "Is this accessible?", content: "Yes. It uses standard HTML button elements." },
                                { title: "Can I style it?", content: "Yes! It's built with Tailwind classes." },
                            ]}
                        />
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}
