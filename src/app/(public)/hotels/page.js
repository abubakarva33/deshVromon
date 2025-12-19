import Link from 'next/link';
import { Search, SlidersHorizontal, Star, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HotelCard, { HotelGrid } from '@/components/hotels/HotelCard';
import { hotels } from '@/data/hotels';
import { districts } from '@/data/districts';

export const metadata = {
    title: 'Hotels & Accommodation | DeshVromon',
    description: 'Find the best hotels and accommodations across Bangladesh',
};

export default function HotelsPage() {
    // Group hotels by district
    const hotelsByDistrict = hotels.reduce((acc, hotel) => {
        if (!acc[hotel.district]) {
            acc[hotel.district] = [];
        }
        acc[hotel.district].push(hotel);
        return acc;
    }, {});

    const featured = hotels.filter(h => h.featured);
    const topRated = hotels.filter(h => h.rating >= 4.5).slice(0, 6);

    return (
        <div className="min-h-screen bg-primary">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-teal-900/20 pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                                Hotels & Stays
                            </span>
                        </h1>
                        <p className="text-xl text-secondary mb-8">
                            Discover comfortable accommodations across Bangladesh
                        </p>

                        {/* Search Bar */}
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                <input
                                    type="text"
                                    placeholder="Search hotels by name or location..."
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-white dark:bg-gray-800 text-foreground focus:outline-none focus:ring-2 focus:ring-accent-primary"
                                />
                            </div>
                            <Button size="lg" className="px-8">
                                Search
                            </Button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                        <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-border">
                            <div className="text-3xl font-bold text-blue-600">{hotels.length}</div>
                            <div className="text-sm text-muted">Hotels</div>
                        </div>
                        <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-border">
                            <div className="text-3xl font-bold text-cyan-600">{Object.keys(hotelsByDistrict).length}</div>
                            <div className="text-sm text-muted">Districts</div>
                        </div>
                        <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-border">
                            <div className="text-3xl font-bold text-teal-600">{topRated.length}</div>
                            <div className="text-sm text-muted">Top Rated</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Filters */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" className="gap-2">
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </Button>
                            <div className="hidden md:flex items-center gap-2">
                                <Badge variant="secondary" className="cursor-pointer hover:bg-accent-primary hover:text-white transition-colors">
                                    Price: Low to High
                                </Badge>
                                <Badge variant="secondary" className="cursor-pointer hover:bg-accent-primary hover:text-white transition-colors">
                                    Rating: 4+
                                </Badge>
                                <Badge variant="secondary" className="cursor-pointer hover:bg-accent-primary hover:text-white transition-colors">
                                    Free WiFi
                                </Badge>
                            </div>
                        </div>
                        <select className="px-4 py-2 rounded-lg border border-border bg-secondary text-foreground text-sm">
                            <option>Sort by: Recommended</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Rating: High to Low</option>
                            <option>Name: A to Z</option>
                        </select>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="all" className="mb-12">
                        <TabsList className="mb-6">
                            <TabsTrigger value="all">
                                All Hotels ({hotels.length})
                            </TabsTrigger>
                            <TabsTrigger value="featured">
                                Featured ({featured.length})
                            </TabsTrigger>
                            <TabsTrigger value="top-rated">
                                Top Rated ({topRated.length})
                            </TabsTrigger>
                        </TabsList>

                        {/* All Hotels */}
                        <TabsContent value="all">
                            <HotelGrid hotels={hotels} columns={3} />
                        </TabsContent>

                        {/* Featured Hotels */}
                        <TabsContent value="featured">
                            {featured.length > 0 ? (
                                <HotelGrid hotels={featured} columns={3} />
                            ) : (
                                <div className="text-center py-12 bg-secondary rounded-xl border border-border">
                                    <p className="text-muted">No featured hotels at the moment</p>
                                </div>
                            )}
                        </TabsContent>

                        {/* Top Rated */}
                        <TabsContent value="top-rated">
                            <HotelGrid hotels={topRated} columns={3} />
                        </TabsContent>
                    </Tabs>

                    {/* Browse by District */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-6">
                            Browse by District
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Object.keys(hotelsByDistrict).map((districtId) => {
                                const district = districts.find(d => d.id === districtId);
                                const count = hotelsByDistrict[districtId].length;

                                return (
                                    <Link
                                        key={districtId}
                                        href={`/hotels?district=${districtId}`}
                                        className="p-4 rounded-lg border border-border bg-secondary hover:border-accent-primary hover:bg-accent-primary/5 transition-all group"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <MapPin className="w-4 h-4 text-accent-primary" />
                                            <span className="font-semibold text-foreground group-hover:text-accent-primary transition-colors">
                                                {district?.name || districtId}
                                            </span>
                                        </div>
                                        <div className="text-sm text-muted">
                                            {count} hotel{count !== 1 ? 's' : ''}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-secondary">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Own a Hotel or Guest House?
                    </h2>
                    <p className="text-lg text-secondary mb-8">
                        List your property on DeshVromon and reach thousands of travelers
                    </p>
                    <Button size="lg" variant="outline" className="text-lg px-8">
                        List Your Property
                    </Button>
                </div>
            </section>
        </div>
    );
}
