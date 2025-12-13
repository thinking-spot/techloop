"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import DeviceCard from "@/components/ui/DeviceCard";
import { devices, Device } from "@/lib/data";

// Extract unique categories and brands for filters
const allCategories = Array.from(new Set(devices.map(d => d.category)));
const allBrands = ["Meta", "Oura", "XREAL", "Apple", "Humane", "Whoop", "Samsung", "Nothing", "Brilliant"];

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

            // Brand (Naive check if name includes brand string)
            if (selectedBrands.length > 0) {
                const deviceBrand = allBrands.find(b => device.name.includes(b));
                if (!deviceBrand || !selectedBrands.includes(deviceBrand)) {
                    // Try mapping based on known IDs if name match fails, or just include if fuzzy match
                    const hasMatch = selectedBrands.some(brand => device.name.toLowerCase().includes(brand.toLowerCase()));
                    if (!hasMatch) return false;
                }
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
                    // Use review count as proxy for popularity
                    return (b.reviewCount || 0) - (a.reviewCount || 0);
            }
        });
    }, [searchQuery, selectedCategories, selectedBrands, selectedPriceRanges, sortBy]);

    const activeFiltersCount = selectedCategories.length + selectedBrands.length + selectedPriceRanges.length;

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setSelectedPriceRanges([]);
        setSearchQuery("");
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden px-6 py-4 flex items-center justify-between border-b border-[#F1F5F9] sticky top-16 bg-white z-30">
                <Button variant="secondary" onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)} className="flex items-center gap-2">
                    <SlidersHorizontal size={18} /> Filters {activeFiltersCount > 0 && <span className="bg-button text-white text-[10px] px-1.5 py-0.5 rounded-full">{activeFiltersCount}</span>}
                </Button>
                <div className="text-sm font-medium text-paragraph">{filteredDevices.length} Results</div>
            </div>

            <div className="flex flex-1 flex-col lg:flex-row">

                {/* Filters Sidebar */}
                <aside className={`
                    fixed inset-0 z-40 bg-white p-6 overflow-y-auto transition-transform duration-300 transform
                    lg:relative lg:transform-none lg:w-64 lg:flex-shrink-0 lg:border-r lg:border-[#F1F5F9] lg:h-auto lg:z-0
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
                    {/* Header & Search */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div>
                                <h1 className="font-display text-4xl font-bold text-headline mb-2">Find your perfect match</h1>
                                <p className="text-paragraph text-lg">Browse {devices.length} AI wearables available to ship today.</p>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto self-start md:self-end">
                                <div className="relative flex-1 md:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-paragraph/50" size={18} />
                                    <Input
                                        className="pl-10"
                                        placeholder="Search devices..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="relative min-w-[160px]">
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
                        </div>

                        {/* Active Filters Display */}
                        {activeFiltersCount > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedCategories.map(cat => (
                                    <div key={cat} className="bg-[#EFF6FF] text-button text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                        {cat} <button onClick={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}><X size={12} /></button>
                                    </div>
                                ))}
                                {selectedBrands.map(b => (
                                    <div key={b} className="bg-[#EFF6FF] text-button text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                        {b} <button onClick={() => toggleFilter(b, selectedBrands, setSelectedBrands)}><X size={12} /></button>
                                    </div>
                                ))}
                                {selectedPriceRanges.map(p => (
                                    <div key={p} className="bg-[#EFF6FF] text-button text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                        {p} <button onClick={() => toggleFilter(p, selectedPriceRanges, setSelectedPriceRanges)}><X size={12} /></button>
                                    </div>
                                ))}
                                <button onClick={clearAllFilters} className="text-xs text-paragraph hover:text-headline underline px-2">Clear All</button>
                            </div>
                        )}

                        {/* Grid */}
                        {filteredDevices.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                                {filteredDevices.map((device) => (
                                    <DeviceCard key={device.id} {...device} />
                                ))}
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
                    </div>
                </div>
            </div>
        </div>
    );
}
