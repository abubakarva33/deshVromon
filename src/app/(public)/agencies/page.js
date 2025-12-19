import Link from 'next/link';
import { Search, SlidersHorizontal, Award, MapPin, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AgencyCard, { AgencyGrid } from '@/components/agencies/AgencyCard';
import { agencies } from '@/data/agencies';

export const metadata = {
    title: 'Tour Agencies | DeshVromon',
    description: 'Find trusted tour operators and travel agencies across Bangladesh',
};

export default function AgenciesPage() {
    const featured = agencies.filter(a => a.featured);
    const topRated = agencies.filter(a => a.rating >= 4.5).slice(0, 6);
    const verified = agencies.filter(a => a.verified);

    // Group by specialization
    const bySpecialization = agencies.reduce((acc, agency) => {
        agency.specializations?.forEach(spec => {
            if (!acc[spec]) acc[spec] = [];
            acc[spec].push(agency);
        });
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-primary">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-orange-900/20 pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                                Tour Agencies
                            </span>
                        </h1>
                        <p className="text-xl text-secondary mb-8">
                            Connect with trusted travel operators for unforgettable experiences
                        </p>

                        {/* Search Bar */}
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                <input
                                    type="text"
                                    placeholder="Search agencies by name or specialization..."
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
                            <div className="text-3xl font-bold text-purple-600">{agencies.length}</div>
                            <div className="text-sm text-muted">Agencies</div>
                        </div>
                        <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-border">
                            <div className="text-3xl font-bold text-pink-600">{verified.length}</div>
                            <div className="text-sm text-muted">Verified</div>
                        </div>
                        <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-border">
                            <div className="text-3xl font-bold text-orange-600">{topRated.length}</div>
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
                        </div>
                        <select className="px-4 py-2 rounded-lg border border-border bg-secondary text-foreground text-sm">
                            <option>Sort by: Recommended</option>
                            <option>Rating: High to Low</option>
                            <option>Tours: Most Completed</option>
                            <option>Name: A to Z</option>
                        </select>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="all" className="mb-12">
                        <TabsList className="mb-6">
                            <TabsTrigger value="all">
                                All Agencies ({agencies.length})
                            </TabsTrigger>
                            <TabsTrigger value="verified">
                                Verified ({verified.length})
                            </TabsTrigger>
                            <TabsTrigger value="top-rated">
                                Top Rated ({topRated.length})
                            </TabsTrigger>
                        </TabsList>

                        {/* All Agencies */}
                        <TabsContent value="all">
                            <AgencyGrid agencies={agencies} columns={3} />
                        </TabsContent>

                        {/* Verified */}
                        <TabsContent value="verified">
                            <AgencyGrid agencies={verified} columns={3} />
                        </TabsContent>

                        {/* Top Rated */}
                        <TabsContent value="top-rated">
                            <AgencyGrid agencies={topRated} columns={3} />
                        </TabsContent>
                    </Tabs>

                    {/* Browse by Specialization */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-6">
                            Browse by Specialization
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Object.keys(bySpecialization).slice(0, 8).map((spec) => {
                                const count = bySpecialization[spec].length;

                                return (
                                    <Link
                                        key={spec}
                                        href={`/agencies?spec=${spec}`}
                                        className="p-4 rounded-lg border border-border bg-secondary hover:border-accent-primary hover:bg-accent-primary/5 transition-all group"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <Award className="w-4 h-4 text-accent-primary" />
                                            <span className="font-semibold text-foreground group-hover:text-accent-primary transition-colors">
                                                {spec}
                                            </span>
                                        </div>
                                        <div className="text-sm text-muted">
                                            {count} {count === 1 ? 'agency' : 'agencies'}
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
                        Are You a Tour Operator?
                    </h2>
                    <p className="text-lg text-secondary mb-8">
                        Join DeshVromon and showcase your tour packages to thousands of travelers
                    </p>
                    <Button size="lg" variant="outline" className="text-lg px-8">
                        Register Your Agency
                    </Button>
                </div>
            </section>
        </div>
    );
}
