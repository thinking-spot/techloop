"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { PRICING, monthlyRate, deposit, dueToday, buyoutPrice, buyoutSchedule, usd } from "@/lib/pricing";
import {
    rentThenReturnTotal,
    rentThenBuyTotal,
    extraOverRetail,
    breakEvenMonth,
    trialComparison,
} from "@/lib/rent-vs-buy";

export type CalculatorDevice = { id: string; name: string; msrp: number };

interface Props {
    devices: CalculatorDevice[];
    /** Three devices for the "try more than one" example. */
    trialDevices: CalculatorDevice[];
    ctaHref: string;
    ctaLabel: string;
    footnote: string;
}

const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const TRIAL_MONTHS_EACH = 2;

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: "7px 16px",
                borderRadius: 999,
                border: active ? "2px solid #00D4FF" : "1.5px solid #1e3a5f",
                background: active ? "rgba(0,212,255,0.12)" : "transparent",
                color: active ? "#00D4FF" : "#8ba3c0",
                fontSize: 13,
                fontWeight: active ? 700 : 500,
                cursor: "pointer",
                transition: "all .2s",
                fontFamily: FONT,
                letterSpacing: "0.01em",
            }}
        >
            {children}
        </button>
    );
}

function Slider({
    value, onChange, min, max, step, label, unit, prefix,
}: {
    value: number; onChange: (v: number) => void; min: number; max: number;
    step?: number; label: string; unit: string; prefix: string;
}) {
    const pct = ((value - min) / (max - min)) * 100;
    return (
        <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <span style={{ color: "#8ba3c0", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</span>
                <span style={{ color: "#fff", fontSize: 22, fontWeight: 700, fontFamily: FONT }}>
                    {prefix}{value.toLocaleString()}{unit}
                </span>
            </div>
            <input
                type="range"
                aria-label={label}
                min={min}
                max={max}
                step={step || 1}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{
                    width: "100%",
                    height: 6,
                    appearance: "none",
                    WebkitAppearance: "none",
                    borderRadius: 999,
                    background: `linear-gradient(90deg, #00D4FF ${pct}%, #1e3a5f ${pct}%)`,
                    outline: "none",
                    cursor: "pointer",
                }}
            />
        </div>
    );
}

function StatCard({
    label, value, sub, highlight, small,
}: { label: string; value: string; sub?: string; highlight?: boolean; small?: boolean }) {
    return (
        <div
            style={{
                background: highlight ? "linear-gradient(145deg, rgba(0,212,255,0.10) 0%, rgba(0,212,255,0.03) 100%)" : "rgba(14,35,64,0.7)",
                border: highlight ? "1.5px solid rgba(0,212,255,0.35)" : "1px solid #1a2e4a",
                borderRadius: 14,
                padding: small ? "16px 18px" : "22px 24px",
                flex: 1,
                minWidth: small ? 120 : 150,
            }}
        >
            <div style={{ color: "#6b8bb5", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
            <div style={{ color: highlight ? "#00D4FF" : "#fff", fontSize: small ? 22 : 28, fontWeight: 800, fontFamily: FONT, lineHeight: 1.1 }}>{value}</div>
            {sub && <div style={{ color: "#6b8bb5", fontSize: 12, marginTop: 5, lineHeight: 1.4 }}>{sub}</div>}
        </div>
    );
}

function BarCompare({
    label, amount, maxAmount, color, icon,
}: { label: string; amount: number; maxAmount: number; color: string; icon: string }) {
    const pct = Math.min((amount / maxAmount) * 100, 100);
    return (
        <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ color: "#c0d0e4", fontSize: 14, fontWeight: 600 }}>{icon} {label}</span>
                <span style={{ color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: FONT }}>{usd(amount)}</span>
            </div>
            <div style={{ height: 10, background: "#0f2136", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 999, transition: "width .5s cubic-bezier(.4,0,.2,1)" }} />
            </div>
        </div>
    );
}

const PANEL = { background: "rgba(10,31,68,0.5)", border: "1px solid #152a4a", borderRadius: 18 } as const;
const LABEL = { color: "#6b8bb5", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" } as const;

export default function RentVsBuyCalculatorClient({ devices, trialDevices, ctaHref, ctaLabel, footnote }: Props) {
    const custom = devices.length; // the last pill is "Custom price"
    const [selectedIdx, setSelectedIdx] = useState(Math.min(2, devices.length - 1));
    const [months, setMonths] = useState(6);
    const [customRetail, setCustomRetail] = useState(399);
    const [tab, setTab] = useState<"compare" | "own" | "multi">("compare");

    const isCustom = selectedIdx === custom;
    const msrp = isCustom ? customRetail : devices[selectedIdx].msrp;
    const rate = monthlyRate(msrp);
    const dep = deposit(msrp);

    const returnTotal = rentThenReturnTotal(msrp, months);
    const buyTotal = rentThenBuyTotal(msrp, months);
    const extra = extraOverRetail(msrp, months);
    const breakEven = breakEvenMonth(msrp);
    const buyout = buyoutPrice(msrp, months);
    const withinCredit = months <= PRICING.creditedPayments;
    const maxBar = Math.max(msrp, returnTotal, buyTotal);

    const trial = trialComparison(trialDevices.map((d) => d.msrp), TRIAL_MONTHS_EACH);
    const monthsLabel = (n: number) => `${n} month${n === 1 ? "" : "s"}`;

    return (
        <div style={{ fontFamily: FONT, background: "#070f1b", padding: "32px 12px", borderRadius: 12 }}>
            <style>{`
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px; border-radius: 50%; background: #00D4FF; border: 3px solid #0A1F44; cursor: pointer; box-shadow: 0 0 12px rgba(0,212,255,0.4); }
        input[type=range]::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: #00D4FF; border: 3px solid #0A1F44; cursor: pointer; box-shadow: 0 0 12px rgba(0,212,255,0.4); }
        ::selection { background: rgba(0,212,255,0.3); }
        * { box-sizing: border-box; }
      `}</style>

            <div style={{ maxWidth: 720, margin: "0 auto" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 36 }}>
                    <div style={{ display: "inline-block", background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 999, padding: "5px 16px", fontSize: 12, color: "#00D4FF", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>
                        Interactive Calculator
                    </div>
                    <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: "0 0 8px", lineHeight: 1.2, letterSpacing: "-0.01em" }}>Rent vs Buy</h2>
                    <p style={{ color: "#6b8bb5", fontSize: 15, margin: "0 auto", maxWidth: 480, lineHeight: 1.5 }}>
                        Pick a device and how long you&apos;d rent it to see how renting with Techloop compares to buying outright.
                    </p>
                </div>

                {/* Device selector */}
                <div style={{ ...PANEL, padding: "24px 24px 18px", marginBottom: 20 }}>
                    <div style={{ ...LABEL, marginBottom: 12 }}>Select device</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {devices.map((d, i) => (
                            <Pill key={d.id} active={selectedIdx === i} onClick={() => setSelectedIdx(i)}>{d.name}</Pill>
                        ))}
                        <Pill active={isCustom} onClick={() => setSelectedIdx(custom)}>Custom price</Pill>
                    </div>
                    {isCustom && (
                        <div style={{ marginTop: 18 }}>
                            <Slider label="Retail price" value={customRetail} onChange={setCustomRetail} min={99} max={1299} step={10} prefix="$" unit="" />
                        </div>
                    )}
                </div>

                {/* Rental period */}
                <div style={{ ...PANEL, padding: "24px 24px 8px", marginBottom: 20 }}>
                    <Slider label="Rental duration" value={months} onChange={setMonths} min={1} max={18} prefix="" unit={` month${months === 1 ? "" : "s"}`} />
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 10 }}>
                        <StatCard small label="Retail price" value={usd(msrp)} />
                        <StatCard small label="Monthly rent" value={`${usd(rate)}/mo`} />
                        <StatCard small label="To start" value={usd(dueToday(msrp))} sub={`${usd(rate)} + ${usd(dep)} refundable deposit`} />
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: "flex", gap: 6, marginBottom: 20, background: "rgba(10,31,68,0.4)", padding: 4, borderRadius: 12 }}>
                    {([
                        { key: "compare", label: "Rent vs Buy" },
                        { key: "own", label: "Rent-to-Own" },
                        { key: "multi", label: "Try More Than One" },
                    ] as const).map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            style={{
                                flex: 1, padding: "10px 0", borderRadius: 10, border: "none",
                                background: tab === t.key ? "rgba(0,212,255,0.12)" : "transparent",
                                color: tab === t.key ? "#00D4FF" : "#6b8bb5",
                                fontSize: 13, fontWeight: tab === t.key ? 700 : 500,
                                cursor: "pointer", transition: "all .2s", fontFamily: FONT,
                            }}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Rent vs buy */}
                {tab === "compare" && (
                    <div style={{ ...PANEL, padding: 24 }}>
                        <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: "0 0 20px", letterSpacing: "-0.01em" }}>
                            What {monthsLabel(months)} costs
                        </h3>
                        <BarCompare label="Buy at retail" amount={msrp} maxAmount={maxBar} color="#3b5998" icon="🛒" />
                        <BarCompare label={`Rent ${monthsLabel(months)}, then return`} amount={returnTotal} maxAmount={maxBar} color="#00D4FF" icon="🔄" />
                        <BarCompare label={`Rent ${monthsLabel(months)}, then buy`} amount={buyTotal} maxAmount={maxBar} color="#00e88f" icon="🎯" />

                        <div style={{ borderTop: "1px solid #1a2e4a", marginTop: 22, paddingTop: 20, display: "flex", gap: 14, flexWrap: "wrap" }}>
                            <StatCard
                                highlight
                                label="Cost to try"
                                value={usd(returnTotal)}
                                sub="Rent only. Your deposit comes back when you return the device."
                            />
                            <StatCard
                                label="Rent alone hits retail"
                                value={`Month ${breakEven}`}
                                sub="After this, you've paid the full price in rent without owning it."
                            />
                        </div>

                        <div style={{
                            marginTop: 20,
                            background: withinCredit ? "rgba(0,232,143,0.06)" : "rgba(255,180,0,0.06)",
                            border: withinCredit ? "1px solid rgba(0,232,143,0.2)" : "1px solid rgba(255,180,0,0.25)",
                            borderRadius: 12, padding: "16px 20px",
                        }}>
                            <div style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                                {withinCredit
                                    ? "💡 Renting first doesn't cost extra if you buy"
                                    : `💡 Buying after month ${PRICING.creditedPayments} costs more than retail`}
                            </div>
                            <div style={{ color: "#8ba3c0", fontSize: 13, lineHeight: 1.5 }}>
                                {withinCredit
                                    ? `Rent for ${monthsLabel(months)} and then buy, and you pay ${usd(buyTotal)} in total: exactly the retail price. Rent and return it, and you pay ${usd(returnTotal)}.`
                                    : `Payments stop counting toward the price after month ${PRICING.creditedPayments}. Renting ${monthsLabel(months)} and then buying costs ${usd(buyTotal)}, which is ${usd(extra)} more than the ${usd(msrp)} retail price. If you already know you want it, buy by month ${PRICING.creditedPayments}.`}
                            </div>
                        </div>
                    </div>
                )}

                {/* Rent-to-own */}
                {tab === "own" && (
                    <div style={{ ...PANEL, padding: 24 }}>
                        <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: "0 0 6px" }}>Rent-to-own breakdown</h3>
                        <p style={{ color: "#6b8bb5", fontSize: 13, margin: "0 0 22px", lineHeight: 1.5 }}>
                            Your deposit and your first {PRICING.creditedPayments} monthly payments count toward the retail price.
                        </p>

                        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 22 }}>
                            <StatCard highlight label="Rent paid" value={usd(rate * months)} sub={`${months} × ${usd(rate)}/mo`} />
                            <StatCard label="Buyout price" value={usd(buyout)} sub={`Retail ${usd(msrp)} minus your credit`} />
                            <StatCard
                                label="Total to own"
                                value={usd(buyTotal)}
                                sub={extra > 0 ? `${usd(extra)} more than retail` : "Exactly the retail price"}
                            />
                        </div>

                        <div style={{ ...LABEL, marginBottom: 14 }}>Buyout schedule</div>
                        <div style={{ display: "grid", gridTemplateColumns: `repeat(${PRICING.creditedPayments}, 1fr)`, gap: 10 }}>
                            {buyoutSchedule(msrp).map((step) => {
                                const isActive = Math.min(months, PRICING.creditedPayments) === step.paymentsMade;
                                const last = step.paymentsMade === PRICING.creditedPayments;
                                return (
                                    <div
                                        key={step.paymentsMade}
                                        style={{
                                            background: isActive ? "rgba(0,232,143,0.06)" : "rgba(14,35,64,0.5)",
                                            border: isActive ? "1px solid rgba(0,232,143,0.25)" : "1px solid #1a2e4a",
                                            borderRadius: 12, padding: "14px 12px", textAlign: "center",
                                            opacity: isActive ? 1 : 0.6, transition: "all .3s",
                                        }}
                                    >
                                        <div style={{ color: isActive ? "#00e88f" : "#6b8bb5", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                                            {step.paymentsMade}{last ? "+" : ""} mo
                                        </div>
                                        <div style={{ color: "#fff", fontSize: 17, fontWeight: 800 }}>{usd(step.buyout)}</div>
                                        <div style={{ color: "#6b8bb5", fontSize: 11, marginTop: 4 }}>to buy</div>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ marginTop: 20, background: "rgba(0,232,143,0.06)", border: "1px solid rgba(0,232,143,0.2)", borderRadius: 12, padding: "16px 20px" }}>
                            <div style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                                🎯 Buy within {PRICING.creditedPayments} months to pay exactly retail
                            </div>
                            <div style={{ color: "#8ba3c0", fontSize: 13, lineHeight: 1.5 }}>
                                Every payment up to month {PRICING.creditedPayments} counts toward owning the device. After that, more rent doesn&apos;t
                                lower the buyout, so if you already know it&apos;s a keeper, don&apos;t wait.
                            </div>
                        </div>
                    </div>
                )}

                {/* Try more than one */}
                {tab === "multi" && (
                    <div style={{ ...PANEL, padding: 24 }}>
                        <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: "0 0 6px" }}>Try {trialDevices.length} devices in turn</h3>
                        <p style={{ color: "#6b8bb5", fontSize: 13, margin: "0 0 22px", lineHeight: 1.5 }}>
                            Rent one, swap to the next after your first 30 days, and so on. Here&apos;s what trying {trialDevices.length} smart glasses
                            costs, {TRIAL_MONTHS_EACH} months each, compared with buying all {trialDevices.length}.
                        </p>

                        <BarCompare label={`Buy all ${trialDevices.length}`} amount={trial.buyAll} maxAmount={trial.buyAll} color="#ff6b6b" icon="🛒" />
                        <BarCompare label={`Rent all ${trialDevices.length} (${TRIAL_MONTHS_EACH} months each)`} amount={trial.rent} maxAmount={trial.buyAll} color="#00D4FF" icon="🔄" />

                        <div style={{ marginTop: 20, background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 12, padding: "16px 20px" }}>
                            <div style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 4 }}>📊 Example: finding your smart glasses</div>
                            <div style={{ color: "#8ba3c0", fontSize: 13, lineHeight: 1.6 }}>
                                {trialDevices.map((d, i) => (
                                    <div key={d.id}>
                                        <strong style={{ color: "#c0d0e4" }}>Months {i * TRIAL_MONTHS_EACH + 1}–{(i + 1) * TRIAL_MONTHS_EACH}:</strong>{" "}
                                        {d.name} ({usd(monthlyRate(d.msrp))}/mo × {TRIAL_MONTHS_EACH} = {usd(monthlyRate(d.msrp) * TRIAL_MONTHS_EACH)})
                                    </div>
                                ))}
                                <div style={{ marginTop: 6 }}>
                                    <strong style={{ color: "#c0d0e4" }}>Rent for all {trialDevices.length}:</strong> {usd(trial.rent)}
                                    {" · "}
                                    <strong style={{ color: "#c0d0e4" }}>Buying all {trialDevices.length}:</strong> {usd(trial.buyAll)}
                                </div>
                                <div style={{ marginTop: 6, color: "#6b8bb5" }}>
                                    You&apos;d have tried all {trialDevices.length} and own none. Credit stays with the device that earned it, so a swap
                                    restarts your progress toward owning.
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div style={{ textAlign: "center", marginTop: 28, marginBottom: 12 }}>
                    <Link
                        href={ctaHref}
                        style={{
                            display: "inline-block",
                            background: "linear-gradient(135deg, #00D4FF 0%, #0090b0 100%)",
                            color: "#0A1F44", padding: "14px 36px", borderRadius: 999,
                            fontSize: 15, fontWeight: 800, textDecoration: "none", letterSpacing: "0.02em",
                            boxShadow: "0 4px 20px rgba(0,212,255,0.3)",
                        }}
                    >
                        {ctaLabel}
                    </Link>
                    <div style={{ color: "#4a6a8f", fontSize: 12, marginTop: 10 }}>{footnote}</div>
                </div>
            </div>
        </div>
    );
}
