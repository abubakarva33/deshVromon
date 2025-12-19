import Link from 'next/link';
import { MapPin, TrendingUp, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DestinationGrid from '@/components/destinations/DestinationGrid';
import SearchBar from '@/components/shared/SearchBar';
import { Badge } from '@/components/ui/badge';
import destinations, { getDestinationTypes } from '@/data/destinations';
import { divisions, districts } from '@/data/districts';

export const metadata = {
    title: 'Explore Destinations | DeshVromon',
    description: 'Discover the most beautiful tourist destinations across Bangladesh',
};

export default function DestinationsPage() {
    const allDestinations = destinations;
    const types = getDestinationTypes();

    // Get some stats
    const totalDestinations = destinations.length;
    const totalDistricts = [...new Set(destinations.map(d => d.district))].length;

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl mx-auto text-center mb-10">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                            Explore Bangladesh
                        </h1>
                        <p className="text-xl text-secondary mb-8">
                            Discover {totalDestinations}+ amazing destinations across {totalDistricts} districts
                        </p>

                        <SearchBar
                            placeholder="Search destinations by name, type, or tags..."
                            showFilters={true}
                        />
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        <div className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-border">
                            <span className="text-sm">
                                <span className="font-bold text-accent-primary">{totalDestinations}</span> Places
                            </span>
                        </div>
                        <div className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-border">
                            <span className="text-sm">
                                <span className="font-bold text-accent-primary">{totalDistricts}</span> Districts
                            </span>
                        </div>
                        <div className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-border">
                            <span className="text-sm">
                                <span className="font-bold text-accent-primary">{types.length}</span> Categories
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="py-8 px-4 bg-secondary border-b border-border sticky top-16 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-3 items-center">
                        <span className="text-sm font-semibold text-muted flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            Filter by type:
                        </span>
                        <Button variant="outline" size="sm" className="font-medium">
                            All Destinations
                        </Button>
                        {types.map((type) => (
                            <Button
                                key={type}
                                variant="ghost"
                                size="sm"
                                className="capitalize"
                            >
                                {type}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4 bg-primary">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-foreground">
                            All Destinations ({totalDestinations})
                        </h2>
                        <select className="px-4 py-2 rounded-lg border border-border bg-secondary text-foreground">
                            <option>Sort by Hype</option>
                            <option>Sort by Rating</option>
                            <option>Sort by Name</option>
                        </select>
                    </div>

                    <DestinationGrid destinations={allDestinations} columns={3} />
                </div>
            </section>

            {/* Browse by District */}
            <section className="py-16 px-4 bg-secondary">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                        Browse by District
                    </h2>

                    {divisions.map((division) => {
                        const divisionDistricts = districts.filter(d => d.division === division.id);
                        if (divisionDistricts.length === 0) return null;

                        return (
                            <div key={division.id} className="mb-10">
                                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-accent-primary" />
                                    {division.name} Division ({division.nameBn})
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                    {divisionDistricts.map((district) => (
                                        <Link
                                            key={district.id}
                                            href={`/destinations/${district.slug}`}
                                            className="group"
                                        >
                                            <div className="p-4 rounded-lg border border-border bg-primary hover:border-accent-primary/50 hover:bg-hover transition-all">
                                                <h4 className="font-semibold text-foreground group-hover:text-accent-primary transition-colors mb-1">
                                                    {district.name}
                                                </h4>
                                                <p className="text-xs text-muted mb-2">{district.nameBn}</p>
                                                <Badge variant="secondary" className="text-xs">
                                                    {district.destinationsCount} places
                                                </Badge>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
