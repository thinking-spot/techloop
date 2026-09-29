import { Accordion } from "@/components/ui/Accordion";
import { getFaqs } from "@/lib/faq";

interface FaqSectionProps {
    /** Which questions to show, in order. See lib/faq.ts. */
    ids: string[];
    heading?: string;
    className?: string;
}

/** A page's FAQ. The answers live in lib/faq.ts so every page tells the same story. */
export default function FaqSection({ ids, heading = "Common questions", className = "" }: FaqSectionProps) {
    const items = getFaqs(ids).map((faq) => ({ title: faq.question, content: faq.answer }));
    if (items.length === 0) return null;

    return (
        <section className={className}>
            <h2 className="font-display text-3xl font-bold text-headline md:text-4xl">{heading}</h2>
            <Accordion
                items={items}
                className="mt-8 rounded-2xl border border-[#F1F5F9] bg-white px-6 shadow-sm"
            />
        </section>
    );
}
