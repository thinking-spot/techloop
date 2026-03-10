'use client'

import { useState, useMemo } from "react";

const DEVICES = [
    { name: "Meta Ray-Ban Smart Glasses", retail: 299, monthly: 45, category: "Smart Glasses" },
    { name: "XREAL Air 2 Pro", retail: 399, monthly: 48, category: "Smart Glasses" },
    { name: "Oura Ring Gen 4", retail: 349, monthly: 38, category: "Smart Ring" },
    { name: "Samsung Galaxy Ring", retail: 399, monthly: 42, category: "Smart Ring" },
    { name: "Brilliant Labs Frame", retail: 349, monthly: 39, category: "Smart Glasses" },
    { name: "Nothing Ear", retail: 149, monthly: 18, category: "AI Earbuds" },
    { name: "Custom Device", retail: 399, monthly: 42, category: "Custom" },
];

const BUYOUT_SCHEDULE = [
    { months: 3, pct: 0.60 },
    { months: 6, pct: 0.45 },
    { months: 9, pct: 0.35 },
    { months: 12, pct: 0.30 },
];

function getBuyoutPct(months) {
    if (months <= 3) return 0.60;
    if (months <= 6) return 0.60 + ((0.45 - 0.60) / 3) * (months - 3);
    if (months <= 9) return 0.45 + ((0.35 - 0.45) / 3) * (months - 6);
    if (months <= 12) return 0.35 + ((0.30 - 0.35) / 3) * (months - 9);
    return 0.30;
}

function Pill({ active, onClick, children }) {
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
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                letterSpacing: "0.01em",
            }}
        >
            {children}
        </button>
    );
}

function Slider({ value, onChange, min, max, step, label, unit, prefix }) {
    const pct = ((value - min) / (max - min)) * 100;
    return (
        <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <span style={{ color: "#8ba3c0", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</span>
                <span style={{ color: "#fff", fontSize: 22, fontWeight: 700, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                    {prefix}{value.toLocaleString()}{unit}
                </span>
            </div>
            <input
                type="range"
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

function StatCard({ label, value, sub, highlight, small }) {
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
            <div style={{ color: highlight ? "#00D4FF" : "#fff", fontSize: small ? 22 : 28, fontWeight: 800, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", lineHeight: 1.1 }}>{value}</div>
            {sub && <div style={{ color: "#6b8bb5", fontSize: 12, marginTop: 5, lineHeight: 1.4 }}>{sub}</div>}
        </div>
    );
}

function BarCompare({ label, amount, maxAmount, color, icon }) {
    const pct = Math.min((amount / maxAmount) * 100, 100);
    return (
        <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ color: "#c0d0e4", fontSize: 14, fontWeight: 600 }}>{icon} {label}</span>
                <span style={{ color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>${amount.toLocaleString()}</span>
            </div>
            <div style={{ height: 10, background: "#0f2136", borderRadius: 999, overflow: "hidden" }}>
                <div
                    style={{
                        height: "100%",
                        width: `${pct}%`,
                        background: color,
                        borderRadius: 999,
                        transition: "width .5s cubic-bezier(.4,0,.2,1)",
                    }}
                />
            </div>
        </div>
    );
}

export default function RentVsBuyCalculator() {
    const [selectedIdx, setSelectedIdx] = useState(1);
    const [months, setMonths] = useState(6);
    const [customRetail, setCustomRetail] = useState(399);
    const [tab, setTab] = useState("compare");

    const device = DEVICES[selectedIdx];
    const retail = selectedIdx === DEVICES.length - 1 ? customRetail : device.retail;
    const monthlyRent = selectedIdx === DEVICES.length - 1 ? Math.round(customRetail * 0.12) : device.monthly;

    const calc = useMemo(() => {
        const totalRent = monthlyRent * months;
        const buyoutPct = getBuyoutPct(months);
        const buyoutPrice = Math.round(retail * buyoutPct);
        const totalRentToOwn = totalRent + buyoutPrice;
        const rentToOwnDiff = totalRentToOwn - retail;
        const rentToOwnPctDiff = ((totalRentToOwn - retail) / retail) * 100;
        const breakEvenMonth = Math.ceil(retail / monthlyRent);
        const costPerDay = (monthlyRent / 30).toFixed(2);

        // If buying 3 devices to find the right one
        const tryThreeBuy = retail * 3;
        const tryThreeRent = monthlyRent * 3 * 2; // 2 months each for 3 devices

        // Financing comparison (Affirm/Klarna 15% APR, 12 mo)
        const financingMonthly = (retail * (1 + 0.15)) / 12;
        const financingTotal = Math.round(financingMonthly * 12);

        return {
            totalRent,
            buyoutPct,
            buyoutPrice,
            totalRentToOwn,
            rentToOwnDiff,
            rentToOwnPctDiff,
            breakEvenMonth,
            costPerDay,
            tryThreeBuy,
            tryThreeRent,
            financingTotal,
            financingMonthly: Math.round(financingMonthly),
        };
    }, [monthlyRent, months, retail]);

    const maxBar = Math.max(retail, calc.totalRent, calc.totalRentToOwn, calc.tryThreeBuy);

    return (
        <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: "#070f1b", minHeight: "100vh", padding: "32px 12px", borderRadius: "12px" }}>
            <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: #00D4FF;
          border: 3px solid #0A1F44;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(0,212,255,0.4);
        }
        input[type=range]::-moz-range-thumb {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: #00D4FF;
          border: 3px solid #0A1F44;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(0,212,255,0.4);
        }
        ::selection { background: rgba(0,212,255,0.3); }
        * { box-sizing: border-box; }
      `}</style>

            <div style={{ maxWidth: 720, margin: "0 auto" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 36 }}>
                    <div style={{ display: "inline-block", background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 999, padding: "5px 16px", fontSize: 12, color: "#00D4FF", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>
                        Interactive Calculator
                    </div>
                    <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: "0 0 8px", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                        Rent vs Buy
                    </h2>
                    <p style={{ color: "#6b8bb5", fontSize: 15, margin: 0, maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.5 }}>
                        Adjust the device and rental period to see exactly how renting with Techloop compares to buying outright.
                    </p>
                </div>

                {/* Device Selector */}
                <div style={{ background: "rgba(10,31,68,0.5)", border: "1px solid #152a4a", borderRadius: 18, padding: "24px 24px 18px", marginBottom: 20 }}>
                    <div style={{ color: "#6b8bb5", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Select Device</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {DEVICES.map((d, i) => (
                            <Pill key={i} active={selectedIdx === i} onClick={() => setSelectedIdx(i)}>
                                {d.name}
                            </Pill>
                        ))}
                    </div>
                    {selectedIdx === DEVICES.length - 1 && (
                        <div style={{ marginTop: 18 }}>
                            <Slider label="Custom Retail Price" value={customRetail} onChange={setCustomRetail} min={99} max={1299} step={10} prefix="$" unit="" />
                        </div>
                    )}
                </div>

                {/* Sliders */}
                <div style={{ background: "rgba(10,31,68,0.5)", border: "1px solid #152a4a", borderRadius: 18, padding: "24px 24px 8px", marginBottom: 20 }}>
                    <Slider label="Rental Duration" value={months} onChange={setMonths} min={1} max={18} prefix="" unit=" months" />
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 10 }}>
                        <StatCard small label="Retail Price" value={`$${retail}`} />
                        <StatCard small label="Monthly Rent" value={`$${monthlyRent}/mo`} />
                        <StatCard small label="Cost Per Day" value={`$${calc.costPerDay}`} sub="less than a coffee" />
                    </div>
                </div>

                {/* Tab Nav */}
                <div style={{ display: "flex", gap: 6, marginBottom: 20, background: "rgba(10,31,68,0.4)", padding: 4, borderRadius: 12 }}>
                    {[
                        { key: "compare", label: "Rent vs Buy" },
                        { key: "own", label: "Rent-to-Own" },
                        { key: "multi", label: "Try Multiple" },
                    ].map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            style={{
                                flex: 1,
                                padding: "10px 0",
                                borderRadius: 10,
                                border: "none",
                                background: tab === t.key ? "rgba(0,212,255,0.12)" : "transparent",
                                color: tab === t.key ? "#00D4FF" : "#6b8bb5",
                                fontSize: 13,
                                fontWeight: tab === t.key ? 700 : 500,
                                cursor: "pointer",
                                transition: "all .2s",
                                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                            }}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Compare Tab */}
                {tab === "compare" && (
                    <div style={{ background: "rgba(10,31,68,0.5)", border: "1px solid #152a4a", borderRadius: 18, padding: 24 }}>
                        <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: "0 0 20px", letterSpacing: "-0.01em" }}>
                            {months}-Month Cost Comparison
                        </h3>
                        <BarCompare label="Buy Retail" amount={retail} maxAmount={maxBar} color="#3b5998" icon="🛒" />
                        <BarCompare label={`Rent ${months} mo`} amount={calc.totalRent} maxAmount={maxBar} color="#00D4FF" icon="🔄" />
                        <BarCompare label="Rent-to-Own" amount={calc.totalRentToOwn} maxAmount={maxBar} color="#00e88f" icon="🎯" />
                        <BarCompare label={`Financing (15% APR)`} amount={calc.financingTotal} maxAmount={maxBar} color="#ff6b6b" icon="💳" />

                        <div style={{ borderTop: "1px solid #1a2e4a", marginTop: 22, paddingTop: 20, display: "flex", gap: 14, flexWrap: "wrap" }}>
                            <StatCard
                                highlight
                                label="You Save (Renting)"
                                value={calc.totalRent < retail ? `$${(retail - calc.totalRent).toLocaleString()}` : `$0`}
                                sub={calc.totalRent < retail ? `${months} months of flexibility for less than retail` : `You've rented past the retail price — consider buying`}
                            />
                            <StatCard
                                label="Break-Even Month"
                                value={`Month ${calc.breakEvenMonth}`}
                                sub={months < calc.breakEvenMonth ? "You're under — renting is cheaper right now" : "You've passed break-even — consider rent-to-own"}
                            />
                        </div>

                        {/* Verdict */}
                        <div style={{
                            marginTop: 20,
                            background: months <= calc.breakEvenMonth ? "rgba(0,212,255,0.06)" : "rgba(0,232,143,0.06)",
                            border: months <= calc.breakEvenMonth ? "1px solid rgba(0,212,255,0.2)" : "1px solid rgba(0,232,143,0.2)",
                            borderRadius: 12,
                            padding: "16px 20px",
                        }}>
                            <div style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                                {months <= 3
                                    ? "💡 Verdict: Renting is significantly cheaper"
                                    : months <= calc.breakEvenMonth
                                        ? "💡 Verdict: Renting still makes sense"
                                        : "💡 Verdict: Consider buying or using rent-to-own"}
                            </div>
                            <div style={{ color: "#8ba3c0", fontSize: 13, lineHeight: 1.5 }}>
                                {months <= 3
                                    ? `At ${months} month${months > 1 ? "s" : ""}, you've only spent $${calc.totalRent} vs $${retail} to buy. That's $${retail - calc.totalRent} saved — and you've had zero commitment.`
                                    : months <= calc.breakEvenMonth
                                        ? `You've spent $${calc.totalRent} over ${months} months, still under the $${retail} retail price. Plus, you've had the flexibility to swap or return at any time.`
                                        : `At ${months} months, you've spent $${calc.totalRent} — which exceeds the $${retail} retail price. The rent-to-own buyout at $${calc.buyoutPrice} brings your total to $${calc.totalRentToOwn}. If you love this device, buying now saves you money long-term.`}
                            </div>
                        </div>
                    </div>
                )}

                {/* Rent-to-Own Tab */}
                {tab === "own" && (
                    <div style={{ background: "rgba(10,31,68,0.5)", border: "1px solid #152a4a", borderRadius: 18, padding: 24 }}>
                        <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: "0 0 6px" }}>Rent-to-Own Breakdown</h3>
                        <p style={{ color: "#6b8bb5", fontSize: 13, margin: "0 0 22px", lineHeight: 1.5 }}>
                            Your monthly payments build credit toward ownership. The longer you rent, the less you pay to keep it.
                        </p>

                        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 22 }}>
                            <StatCard highlight label="Rental Paid" value={`$${calc.totalRent}`} sub={`${months} × $${monthlyRent}/mo`} />
                            <StatCard label="Buyout Price" value={`$${calc.buyoutPrice}`} sub={`${Math.round(calc.buyoutPct * 100)}% of $${retail} retail`} />
                            <StatCard label="Total to Own" value={`$${calc.totalRentToOwn}`} sub={calc.rentToOwnDiff > 0 ? `$${Math.abs(calc.rentToOwnDiff)} more than retail` : `$${Math.abs(calc.rentToOwnDiff)} less than retail`} />
                        </div>

                        {/* Buyout timeline */}
                        <div style={{ color: "#6b8bb5", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Buyout Schedule</div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                            {BUYOUT_SCHEDULE.map((b) => {
                                const paid = monthlyRent * b.months;
                                const buyout = Math.round(retail * b.pct);
                                const total = paid + buyout;
                                const isActive = months >= b.months;
                                return (
                                    <div
                                        key={b.months}
                                        style={{
                                            background: isActive ? "rgba(0,232,143,0.06)" : "rgba(14,35,64,0.5)",
                                            border: isActive ? "1px solid rgba(0,232,143,0.25)" : "1px solid #1a2e4a",
                                            borderRadius: 12,
                                            padding: "14px 12px",
                                            textAlign: "center",
                                            opacity: isActive ? 1 : 0.5,
                                            transition: "all .3s",
                                        }}
                                    >
                                        <div style={{ color: isActive ? "#00e88f" : "#6b8bb5", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{b.months} mo</div>
                                        <div style={{ color: "#fff", fontSize: 17, fontWeight: 800 }}>${buyout}</div>
                                        <div style={{ color: "#6b8bb5", fontSize: 11, marginTop: 4 }}>buyout</div>
                                        <div style={{ color: "#6b8bb5", fontSize: 11, marginTop: 2 }}>${total} total</div>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{
                            marginTop: 20,
                            background: "rgba(0,232,143,0.06)",
                            border: "1px solid rgba(0,232,143,0.2)",
                            borderRadius: 12,
                            padding: "16px 20px",
                        }}>
                            <div style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                                🎯 The Sweet Spot: Months 4–8
                            </div>
                            <div style={{ color: "#8ba3c0", fontSize: 13, lineHeight: 1.5 }}>
                                Most Techloop users buy between months 4 and 8. You've had enough time to fully test the device, and the total cost stays close to retail. Before month 4, you're still discovering. After month 8, you've likely already decided — so don't wait.
                            </div>
                        </div>
                    </div>
                )}

                {/* Try Multiple Tab */}
                {tab === "multi" && (
                    <div style={{ background: "rgba(10,31,68,0.5)", border: "1px solid #152a4a", borderRadius: 18, padding: 24 }}>
                        <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: "0 0 6px" }}>Try 3 Devices Before You Decide</h3>
                        <p style={{ color: "#6b8bb5", fontSize: 13, margin: "0 0 22px", lineHeight: 1.5 }}>
                            Most people try 2–3 devices before finding the right one. Here's the cost of exploring with Techloop vs buying each one.
                        </p>

                        <BarCompare label="Buy All 3 Retail" amount={calc.tryThreeBuy} maxAmount={calc.tryThreeBuy} color="#ff6b6b" icon="🛒" />
                        <BarCompare label="Rent 3 via Techloop (2 mo each)" amount={calc.tryThreeRent} maxAmount={calc.tryThreeBuy} color="#00D4FF" icon="🔄" />

                        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 20 }}>
                            <StatCard
                                highlight
                                label="You Save"
                                value={`$${(calc.tryThreeBuy - calc.tryThreeRent).toLocaleString()}`}
                                sub={`${Math.round(((calc.tryThreeBuy - calc.tryThreeRent) / calc.tryThreeBuy) * 100)}% less than buying all three`}
                            />
                            <StatCard
                                label="Explorer Plan"
                                value="$84/mo"
                                sub="Rent 2 devices at once. Compare side by side."
                            />
                        </div>

                        <div style={{
                            marginTop: 20,
                            background: "rgba(0,212,255,0.06)",
                            border: "1px solid rgba(0,212,255,0.2)",
                            borderRadius: 12,
                            padding: "16px 20px",
                        }}>
                            <div style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                                📊 Example: Finding Your Smart Glasses
                            </div>
                            <div style={{ color: "#8ba3c0", fontSize: 13, lineHeight: 1.6 }}>
                                <strong style={{ color: "#c0d0e4" }}>Month 1–2:</strong> Try XREAL Air 2 Pro ($48/mo × 2 = $96)<br />
                                <strong style={{ color: "#c0d0e4" }}>Month 3–4:</strong> Swap to Meta Ray-Ban ($45/mo × 2 = $90)<br />
                                <strong style={{ color: "#c0d0e4" }}>Month 5–6:</strong> Swap to Brilliant Labs Frame ($39/mo × 2 = $78)<br />
                                <strong style={{ color: "#c0d0e4" }}>Total spent:</strong> $264 to try all three<br />
                                <strong style={{ color: "#c0d0e4" }}>vs. buying all three:</strong> $1,047<br />
                                <strong style={{ color: "#00D4FF" }}>Saved: $783</strong>
                            </div>
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div style={{ textAlign: "center", marginTop: 28, marginBottom: 12 }}>
                    <a
                        href="https://trytechloop.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-block",
                            background: "linear-gradient(135deg, #00D4FF 0%, #0090b0 100%)",
                            color: "#0A1F44",
                            padding: "14px 36px",
                            borderRadius: 999,
                            fontSize: 15,
                            fontWeight: 800,
                            textDecoration: "none",
                            letterSpacing: "0.02em",
                            boxShadow: "0 4px 20px rgba(0,212,255,0.3)",
                            transition: "transform .15s",
                        }}
                    >
                        Start Your Risk-Free Trial →
                    </a>
                    <div style={{ color: "#4a6a8f", fontSize: 12, marginTop: 10 }}>
                        Starting at $42/month · Cancel anytime · Brand new devices
                    </div>
                </div>
            </div>
        </div>
    );
}
