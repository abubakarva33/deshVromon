'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HotelCard, { HotelGrid } from '@/components/hotels/HotelCard';
import FilterPanel from '@/components/shared/FilterPanel';

export default function HotelsList({ initialHotels }) {
    const [hotels, setHotels] = useState(initialHotels);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        priceRange: { min: 0, max: 100000 },
        rating: 0,
        amenities: [],
        district: '',
    });

    // Filter logic
    const filteredHotels = hotels.filter((hotel) => {
        // Search
        if (searchQuery && !hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) && !hotel.location.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        // Price
        if (hotel.pricePerNight && (hotel.pricePerNight < filters.priceRange.min || hotel.pricePerNight > filters.priceRange.max)) {
            return false;
        }
        // Rating
        if (filters.rating > 0 && hotel.rating < filters.rating) {
            return false;
        }
        // Amenities
        if (filters.amenities.length > 0) {
            const hotelAmenities = hotel.amenities || [];
            const hasAllAmenities = filters.amenities.every((a) =>
                hotelAmenities.some(ha => ha.toLowerCase().includes(a))
            );
            if (!hasAllAmenities) return false;
        }
        // District
        if (filters.district && hotel.district !== filters.district) {
            return false;
        }
        return true;
    });

    const featured = filteredHotels.filter(h => h.featured);
    const topRated = filteredHotels.filter(h => h.rating >= 4.5);

    return (
        <div>
            {/* Search Bar - Moved inside for state access */}
            <section className="relative bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-teal-900/20 pt-10 pb-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                            Hotels & Stays
                        </span>
                    </h1>
                    <p className="text-xl text-secondary mb-8">
                        Discover comfortable accommodations across Bangladesh
                    </p>
                    <div className="max-w-3xl mx-auto flex gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search hotels by name or location..."
                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-white dark:bg-gray-800 text-foreground focus:outline-none focus:ring-2 focus:ring-accent-primary"
                            />
                        </div>
                        <Button size="lg" className="px-8" onClick={() => { }}>
                            Search
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar Filters */}
                        <div className="lg:col-span-1">
                            <FilterPanel
                                filters={filters}
                                onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
                                onClear={() => setFilters({
                                    priceRange: { min: 0, max: 100000 },
                                    rating: 0,
                                    amenities: [],
                                    district: '',
                                })}
                            />
                        </div>

                        {/* Hotel Grid */}
                        <div className="lg:col-span-3">
                            <Tabs defaultValue="all" className="mb-8">
                                <TabsList className="mb-6">
                                    <TabsTrigger value="all">All Hotels ({filteredHotels.length})</TabsTrigger>
                                    <TabsTrigger value="featured">Featured ({featured.length})</TabsTrigger>
                                    <TabsTrigger value="top-rated">Top Rated ({topRated.length})</TabsTrigger>
                                </TabsList>

                                <TabsContent value="all">
                                    <HotelGrid hotels={filteredHotels} columns={3} />
                                </TabsContent>
                                <TabsContent value="featured">
                                    <HotelGrid hotels={featured} columns={3} />
                                </TabsContent>
                                <TabsContent value="top-rated">
                                    <HotelGrid hotels={topRated} columns={3} />
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
