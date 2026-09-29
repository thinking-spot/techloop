import Link from "next/link";
import { priceSummary, usd } from "@/lib/pricing";
import type { Device } from "@/lib/data";

interface PriceListProps {
    heading: string;
    /** Devices to list. Anything without an MSRP is skipped. */
    devices: Device[];
    className?: string;
}

/** Every price in one table, so nothing is hidden behind a plan. */
export default function PriceList({ heading, devices, className = "" }: PriceListProps) {
    const rows = devices
        .filter((d): d is Device & { msrp: number } => typeof d.msrp === "number")
        .map((d) => ({ device: d, p: priceSummary(d.msrp) }));

    if (rows.length === 0) return null;

    return (
        <div className={className}>
            <h3 className="mb-4 text-xl font-bold text-headline">{heading}</h3>
            <div className="overflow-x-auto rounded-2xl border border-[#F1F5F9] bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#F8FAFC] text-paragraph">
                        <tr>
                            <th scope="col" className="px-4 py-3 font-medium">Device</th>
                            <th scope="col" className="hidden px-4 py-3 text-right font-medium sm:table-cell">Retail</th>
                            <th scope="col" className="px-4 py-3 text-right font-medium">Per month</th>
                            <th scope="col" className="px-4 py-3 text-right font-medium">To start</th>
                            <th scope="col" className="hidden px-4 py-3 text-right font-medium sm:table-cell">Own it after 3 months</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                        {rows.map(({ device, p }) => (
                            <tr key={device.id}>
                                <th scope="row" className="px-4 py-3 font-medium text-headline">
                                    <Link href={`/product/${device.id}`} className="hover:text-button">
                                        {device.name}
                                    </Link>
                                </th>
                                <td className="hidden px-4 py-3 text-right text-paragraph sm:table-cell">{usd(p.msrp)}</td>
                                <td className="px-4 py-3 text-right font-bold text-headline">{usd(p.monthlyRate)}</td>
                                <td className="px-4 py-3 text-right text-paragraph">{usd(p.dueToday)}</td>
                                <td className="hidden px-4 py-3 text-right text-paragraph sm:table-cell">{usd(p.buyoutAfterCredits)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-2 text-xs text-paragraph">
                &quot;To start&quot; is your first month plus the refundable deposit.
            </p>
        </div>
    );
}
