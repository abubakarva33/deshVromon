'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

/**
 * FilterPanel Component
 * Reusable filter sidebar for listings pages
 */
export default function FilterPanel({ filters, onFilterChange, onClear }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <Button
                variant="outline"
                className="lg:hidden gap-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
            </Button>

            {/* Filter Panel */}
            <div
                className={`
          fixed lg:relative inset-0 lg:inset-auto z-40 lg:z-0
          ${isOpen ? 'block' : 'hidden lg:block'}
        `}
            >
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black/50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />

                {/* Panel */}
                <div className="fixed lg:relative right-0 top-0 bottom-0 w-80 lg:w-full bg-primary lg:bg-transparent border-l lg:border-0 border-border overflow-y-auto">
                    <div className="p-6 lg:p-0 space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between lg:hidden">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <button onClick={() => setIsOpen(false)}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Price Range */}
                        {filters.priceRange && (
                            <div className="p-4 rounded-xl border border-border bg-secondary">
                                <h3 className="font-semibold mb-3">Price Range</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm text-muted">Min Price (৳)</label>
                                        <input
                                            type="number"
                                            value={filters.priceRange.min}
                                            onChange={(e) =>
                                                onFilterChange('priceRange', {
                                                    ...filters.priceRange,
                                                    min: parseInt(e.target.value) || 0,
                                                })
                                            }
                                            className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-primary text-foreground"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted">Max Price (৳)</label>
                                        <input
                                            type="number"
                                            value={filters.priceRange.max}
                                            onChange={(e) =>
                                                onFilterChange('priceRange', {
                                                    ...filters.priceRange,
                                                    max: parseInt(e.target.value) || 100000,
                                                })
                                            }
                                            className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-primary text-foreground"
                                            placeholder="100000"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Rating Filter */}
                        {filters.rating !== undefined && (
                            <div className="p-4 rounded-xl border border-border bg-secondary">
                                <h3 className="font-semibold mb-3">Minimum Rating</h3>
                                <div className="space-y-2">
                                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                                        <label key={rating} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="rating"
                                                checked={filters.rating === rating}
                                                onChange={() => onFilterChange('rating', rating)}
                                                className="w-4 h-4 text-accent-primary"
                                            />
                                            <span className="text-sm">{rating}+ Stars</span>
                                        </label>
                                    ))}
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="rating"
                                            checked={filters.rating === 0}
                                            onChange={() => onFilterChange('rating', 0)}
                                            className="w-4 h-4 text-accent-primary"
                                        />
                                        <span className="text-sm">Any Rating</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Amenities/Features */}
                        {filters.amenities && (
                            <div className="p-4 rounded-xl border border-border bg-secondary">
                                <h3 className="font-semibold mb-3">Amenities</h3>
                                <div className="space-y-2">
                                    {['wifi', 'parking', 'restaurant', 'pool', 'gym', 'spa'].map((amenity) => (
                                        <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters.amenities.includes(amenity)}
                                                onChange={(e) => {
                                                    const newAmenities = e.target.checked
                                                        ? [...filters.amenities, amenity]
                                                        : filters.amenities.filter((a) => a !== amenity);
                                                    onFilterChange('amenities', newAmenities);
                                                }}
                                                className="w-4 h-4 text-accent-primary rounded"
                                            />
                                            <span className="text-sm capitalize">{amenity}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* District Filter */}
                        {filters.district && (
                            <div className="p-4 rounded-xl border border-border bg-secondary">
                                <h3 className="font-semibold mb-3">District</h3>
                                <select
                                    value={filters.district}
                                    onChange={(e) => onFilterChange('district', e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-border bg-primary text-foreground"
                                >
                                    <option value="">All Districts</option>
                                    <option value="coxs-bazar">Cox's Bazar</option>
                                    <option value="bandarban">Bandarban</option>
                                    <option value="sylhet">Sylhet</option>
                                    <option value="khulna">Khulna</option>
                                    <option value="dhaka">Dhaka</option>
                                    <option value="chittagong">Chittagong</option>
                                </select>
                            </div>
                        )}

                        {/* Clear Filters */}
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                                onClear();
                                setIsOpen(false);
                            }}
                        >
                            Clear All Filters
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
