import { notFound } from "next/navigation";

// An internal component gallery: available while developing, a 404 in production.
export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
    if (process.env.NODE_ENV === "production") notFound();
    return children;
}
