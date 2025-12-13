"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ChevronDown, X, HelpCircle, ArrowLeftRight, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import DeviceCard from "@/components/ui/DeviceCard";
import { devices, Device } from "@/lib/data";
import Link from "next/link";

// Extract unique categories and brands for filters
const allCategories = Array.from(new Set(devices.map(d => d.category)));
const allBrands = ["Meta", "Oura", "XREAL", "Apple", "Humane", "Whoop", "Samsung", "Nothing", "Brilliant", "Rabbit"];
const allUseCases = ["Productivity", "Fitness & Health", "Entertainment", "Communication", "Developer", "AI Assistant"];

const priceRanges = [
    { label: "Under $25/mo", min: 0, max: 25 },
    { label: "$25 - $50/mo", min: 25, max: 50 },
    { label: "$50 - $100/mo", min: 50, max: 100 },
    { label: "$100+/mo", min: 100, max: 9999 },
];

export default function BrowsePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
    const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("popular");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Toggle filter helper
    const toggleFilter = (item: string, current: string[], setter: (val: string[]) => void) => {
        if (current.includes(item)) {
            setter(current.filter(i => i !== item));
        } else {
            setter([...current, item]);
        }
    };

    // Filter Logic
    const filteredDevices = useMemo(() => {
        return devices.filter(device => {
            const price = parseInt(device.price);

            // Search
            if (searchQuery && !device.name.toLowerCase().includes(searchQuery.toLowerCase()) && !device.description.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }

            // Category
            if (selectedCategories.length > 0 && !selectedCategories.includes(device.category)) {
                return false;
            }

            // Use Case
            if (selectedUseCases.length > 0) {
                if (!device.useCase?.some(use => selectedUseCases.includes(use))) return false;
            }

            // Brand
            if (selectedBrands.length > 0) {
                const hasMatch = selectedBrands.some(brand => device.name.toLowerCase().includes(brand.toLowerCase()));
                if (!hasMatch) return false;
            }

            // Price
            if (selectedPriceRanges.length > 0) {
                const matchesPrice = selectedPriceRanges.some(rangeLabel => {
                    const range = priceRanges.find(r => r.label === rangeLabel);
                    if (!range) return false;
                    return price >= range.min && price < range.max;
                });
                if (!matchesPrice) return false;
            }

            return true;
        }).sort((a, b) => {
            const priceA = parseInt(a.price);
            const priceB = parseInt(b.price);

            switch (sortBy) {
                case "price-low": return priceA - priceB;
                case "price-high": return priceB - priceA;
                case "rating": return (b.rating || 0) - (a.rating || 0);
                case "popular":
                default:
                    return (b.reviewCount || 0) - (a.reviewCount || 0);
            }
        });
    }, [searchQuery, selectedCategories, selectedBrands, selectedPriceRanges, selectedUseCases, sortBy]);

    const activeFiltersCount = selectedCategories.length + selectedBrands.length + selectedPriceRanges.length + selectedUseCases.length;

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setSelectedPriceRanges([]);
        setSelectedUseCases([]);
        setSearchQuery("");
    };

    // Helper to render interspersed blocks
    const renderDeviceGrid = () => {
        const items = [];
        let deviceIndex = 0;

        // Block 1: Quiz (after 6 items)
        // Block 2: Compare (after 12 items)
        // Block 3: Upsell (after 18 items)

        const devicesToRender = filteredDevices;

        // We will slice the array into chunks to insert blocks
        // But doing it robustly inside a map is hard. Let's just push to a new array.

        for (let i = 0; i < devicesToRender.length; i++) {
            items.push(<DeviceCard key={devicesToRender[i].id} {...devicesToRender[i]} />);

            // Insert Quiz Block after 6th item
            if (i === 5) {
                items.push(
                    <div key="quiz-block" className="col-span-full bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6 my-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#3DA9FC] text-white rounded-full flex items-center justify-center shrink-0">
                                <HelpCircle size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-headline">Not sure which device is right for you?</h3>
                                <p className="text-paragraph">Take our 60-second quiz and we&apos;ll recommend your perfect match.</p>
                            </div>
                        </div>
                        <Button size="lg" className="whitespace-nowrap">Take Device Quiz <ArrowRight className="ml-2 w-4 h-4" /></Button>
                    </div>
                );
            }

            // Insert Compare Block after 12th item
            if (i === 11) {
                items.push(
                    <div key="compare-block" className="col-span-full bg-white rounded-2xl p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 my-4 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                                <ArrowLeftRight size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-headline">Can&apos;t decide between two devices?</h3>
                                <p className="text-paragraph">See them side-by-side: specs, pricing, and real user reviews.</p>
                            </div>
                        </div>
                        <Button variant="secondary" className="whitespace-nowrap">Compare Devices <ArrowRight className="ml-2 w-4 h-4" /></Button>
                    </div>
                );
            }

            // Insert Upsell Block after 17th item (approx)
            if (i === 17) {
                items.push(
                    <div key="upsell-block" className="col-span-full bg-headline text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 my-4 shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center shrink-0">
                                <Layers size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Want to try multiple devices?</h3>
                                <p className="text-white/80">Explorer plan lets you rent 2 devices at once for $84/month.</p>
                            </div>
                        </div>
                        <Button className="whitespace-nowrap bg-white text-headline hover:bg-white/90 border-0 relative z-10">See Explorer Plan</Button>
                    </div>
                );
            }
        }
        return items;
    };


    return (
        <div className="bg-white min-h-screen flex flex-col">

            {/* Page Header */}
            <div className="bg-[#F8FAFC] border-b border-[#F1F5F9] px-6 py-12 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-headline mb-4">Find your perfect AI wearable</h1>
                    <p className="text-xl text-paragraph max-w-2xl mb-8">
                        Browse 20+ devices across 6 categories. All brand new. All swappable. All available to ship today.
                    </p>

                    <div className="flex flex-wrap gap-4 md:gap-8 text-sm font-medium text-paragraph/80">
                        <span className="flex items-center gap-2">📦 Free 2-3 day shipping</span>
                        <span className="flex items-center gap-2">🔄 4 free swaps per year</span>
                        <span className="flex items-center gap-2">⭐ 4+ star average rating</span>
                        <span className="flex items-center gap-2">✅ 98% deposit refund rate</span>
                    </div>
                </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden px-6 py-4 flex items-center justify-between border-b border-[#F1F5F9] sticky top-16 bg-white z-30 shadow-sm">
                <Button variant="secondary" onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)} className="flex items-center gap-2">
                    <SlidersHorizontal size={18} /> Filters {activeFiltersCount > 0 && <span className="bg-button text-white text-[10px] px-1.5 py-0.5 rounded-full">{activeFiltersCount}</span>}
                </Button>
                <div className="text-sm font-medium text-paragraph">{filteredDevices.length} Results</div>
            </div>

            <div className="flex flex-1 flex-col lg:flex-row max-w-[1600px] mx-auto w-full">

                {/* Filters Sidebar */}
                <aside className={`
                    fixed inset-0 z-40 bg-white p-6 overflow-y-auto transition-transform duration-300 transform
                    lg:relative lg:transform-none lg:w-72 lg:flex-shrink-0 lg:border-r lg:border-[#F1F5F9] lg:h-auto lg:z-0 lg:py-10 lg:px-8
                    ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal size={20} className="text-headline" />
                            <h2 className="font-display font-medium text-xl text-headline">Filters</h2>
                        </div>
                        <button onClick={() => setMobileFiltersOpen(false)} className="lg:hidden text-paragraph hover:text-headline">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-8">
                        {/* Use Cases */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-headline mb-4">Use Case</h3>
                            <div className="space-y-3">
                                {allUseCases.map((use) => (
                                    <Checkbox
                                        key={use}
                                        label={use}
                                        checked={selectedUseCases.includes(use)}
                                        onChange={() => toggleFilter(use, selectedUseCases, setSelectedUseCases)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-headline mb-4">Category</h3>
                            <div className="space-y-3">
                                {allCategories.map((cat) => (
                                    <Checkbox
                                        key={cat}
                                        label={cat}
                                        checked={selectedCategories.includes(cat)}
                                        onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Brands */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-headline mb-4">Brand</h3>
                            <div className="space-y-3">
                                {allBrands.map((brand) => (
                                    <Checkbox
                                        key={brand}
                                        label={brand}
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-headline mb-4">Price / Month</h3>
                            <div className="space-y-3">
                                {priceRanges.map((range) => (
                                    <Checkbox
                                        key={range.label}
                                        label={range.label}
                                        checked={selectedPriceRanges.includes(range.label)}
                                        onChange={() => toggleFilter(range.label, selectedPriceRanges, setSelectedPriceRanges)}
                                    />
                                ))}
                            </div>
                        </div>

                        {activeFiltersCount > 0 && (
                            <button
                                onClick={clearAllFilters}
                                className="text-sm text-button font-medium hover:underline w-full text-left"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 px-6 py-8 md:px-12">

                    {/* Active Filters & Search Row */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
                        {/* Search Input */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-paragraph/50" size={18} />
                            <Input
                                className="pl-10"
                                placeholder="Search by name, feature, or brand..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Sort */}
                        <div className="relative min-w-[180px] self-end md:self-auto">
                            <select
                                className="w-full appearance-none bg-white border border-[#E2E8F0] text-paragraph text-sm rounded-lg px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-button/20 focus:border-button cursor-pointer"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="popular">Most Popular</option>
                                <option value="rating">Highest Rated</option>
                                <option value="price-low">Lowest Price</option>
                                <option value="price-high">Highest Price</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-paragraph/50 pointer-events-none" size={16} />
                        </div>
                    </div>

                    {/* Active Chips */}
                    {activeFiltersCount > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {[...selectedUseCases, ...selectedCategories, ...selectedBrands, ...selectedPriceRanges].map((f, i) => (
                                <div key={i} className="bg-[#EFF6FF] text-button text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                    {f}
                                    {/* Naive removal for chips, better to lookup type, but acceptable for now */}
                                    <button onClick={() => {
                                        if (selectedUseCases.includes(f)) toggleFilter(f, selectedUseCases, setSelectedUseCases);
                                        else if (selectedCategories.includes(f)) toggleFilter(f, selectedCategories, setSelectedCategories);
                                        else if (selectedBrands.includes(f)) toggleFilter(f, selectedBrands, setSelectedBrands);
                                        else if (selectedPriceRanges.includes(f)) toggleFilter(f, selectedPriceRanges, setSelectedPriceRanges);
                                    }}><X size={12} /></button>
                                </div>
                            ))}
                            <button onClick={clearAllFilters} className="text-xs text-paragraph hover:text-headline underline px-2">Clear All</button>
                        </div>
                    )}


                    {/* Grid with Interspersed Blocks */}
                    {filteredDevices.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                            {renderDeviceGrid()}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9]">
                            <h3 className="text-xl font-bold text-headline mb-2">No devices found</h3>
                            <p className="text-paragraph mb-6">Try adjusting your filters or search terms.</p>
                            <Button onClick={clearAllFilters}>View All Devices</Button>
                        </div>
                    )}

                    {filteredDevices.length > 0 && (
                        <div className="mt-12 text-center text-sm text-paragraph/60">
                            Showing {filteredDevices.length} of {devices.length} devices
                        </div>
                    )}

                    {/* SEO / Category Guides */}
                    <div className="mt-20 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="font-display text-xl font-bold text-headline mb-4">Smart Glasses Buying Guide</h3>
                            <p className="text-sm text-paragraph mb-4">Not sure which smart glasses are right for you?</p>
                            <ul className="space-y-3 text-sm text-paragraph">
                                <li><strong>Camera Glasses (Meta Ray-Ban):</strong> Best for content creators and POV video.</li>
                                <li><strong>AR Display Glasses (XREAL):</strong> Best for productivity, gaming, and watching movies on a giant virtual screen.</li>
                                <li><strong>Developer Glasses (Brilliant Labs):</strong> Best for hackers wanting to build custom AI features.</li>
                            </ul>
                            <Link href="/help" className="text-sm font-bold text-button mt-4 inline-block hover:underline">Read full guide →</Link>
                        </div>
                        <div>
                            <h3 className="font-display text-xl font-bold text-headline mb-4">Smart Rings Buying Guide</h3>
                            <p className="text-sm text-paragraph mb-4">Oura vs Samsung: Which is right for you?</p>
                            <ul className="space-y-3 text-sm text-paragraph">
                                <li><strong>Choose Oura if:</strong> You want accurate sleep tracking and have an iPhone.</li>
                                <li><strong>Choose Samsung Gallery Ring if:</strong> You have a Galaxy phone and want no subscription fees.</li>
                            </ul>
                            <div className="mt-4 text-sm bg-blue-50 text-blue-800 p-3 rounded-lg inline-block">
                                <strong>Tip:</strong> Rent both on our Explorer plan to compare side-by-side.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
