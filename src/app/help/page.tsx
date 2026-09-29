import { Mail } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { buttonVariants } from "@/components/ui/Button";
import { getAllFaqs, type FaqTopic } from "@/lib/faq";
import { SUPPORT_EMAIL } from "@/lib/site-config";

const TOPICS: { id: FaqTopic; title: string }[] = [
    { id: "getting-started", title: "Getting started" },
    { id: "pricing", title: "Pricing and your deposit" },
    { id: "buying", title: "Buying a device" },
    { id: "swaps", title: "Swapping devices" },
    { id: "returns", title: "Returns and cancelling" },
];

export default function HelpPage() {
    const faqs = getAllFaqs();
    const groups = TOPICS.map((topic) => ({
        ...topic,
        items: faqs
            .filter((f) => f.topic === topic.id)
            .map((f) => ({ title: f.question, content: f.answer })),
    })).filter((group) => group.items.length > 0);

    return (
        <div className="bg-white min-h-screen pb-20">

            {/* Hero Section */}
            <section className="relative px-6 pt-10 md:px-12 lg:pt-20">
                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-[#BAE6FD]/40 bg-[linear-gradient(135deg,#F0F9FF_0%,#E6F4FE_50%,#F1F5F9_100%)] p-8 pb-12 pt-16 text-center shadow-sm md:p-20">
                    <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#3DA9FC]/5 blur-[100px]" />

                    <h1 className="relative mx-auto mb-6 font-display text-[44px] font-bold leading-[1.05] tracking-tight text-headline md:text-[54px]">
                        Help center
                    </h1>
                    <p className="relative mx-auto max-w-2xl text-[18px] leading-relaxed text-paragraph md:text-[20px]">
                        Straight answers about pricing, deposits, swaps and returns.
                    </p>
                </div>
            </section>

            {/* Questions, by topic */}
            <section className="mx-auto max-w-3xl space-y-12 px-6 py-20 md:px-0">
                {groups.map((group) => (
                    <div key={group.id}>
                        <h2 className="font-display text-2xl font-bold text-headline">{group.title}</h2>
                        <Accordion
                            items={group.items}
                            className="mt-4 rounded-2xl border border-[#F1F5F9] bg-white px-6 shadow-sm"
                        />
                    </div>
                ))}
            </section>

            {/* Contact */}
            {SUPPORT_EMAIL && (
                <section id="contact" className="scroll-mt-24 bg-[#F0F9FF] px-6 py-20 md:px-12">
                    <div className="mx-auto max-w-xl text-center">
                        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <Mail size={24} />
                        </div>
                        <h2 className="mb-3 font-display text-3xl font-bold text-headline">Still have a question?</h2>
                        <p className="mb-8 text-paragraph">Email us and a person will get back to you.</p>
                        <a
                            href={`mailto:${SUPPORT_EMAIL}`}
                            className={buttonVariants({ size: "lg" })}
                        >
                            {SUPPORT_EMAIL}
                        </a>
                    </div>
                </section>
            )}
        </div>
    );
}
