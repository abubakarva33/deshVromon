import Link from 'next/link';
import { Search, SlidersHorizontal, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PackageCard, { PackageGrid } from '@/components/packages/PackageCard';
import { packages } from '@/data/packages';

export const metadata = {
    title: 'Tour Packages | DeshVromon',
    description: 'Browse and book tour packages across Bangladesh',
};

export default function PackagesPage() {
    const featured = packages.filter(p => p.featured);
    const byDifficulty = {
        easy: packages.filter(p => p.difficulty === 'easy'),
        moderate: packages.filter(p => p.difficulty === 'moderate'),
        challenging: packages.filter(p => p.difficulty === 'challenging'),
    };

    return (
        <div className="min-h-screen bg-primary">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-green-900/20 dark:to-blue-900/20 pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                                Tour Packages
                            </span>
                        </h1>
                        <p className="text-xl text-secondary mb-8">
                            Handcrafted experiences for every type of traveler
                        </p>

                        {/* Search Bar */}
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                <input
                                    type="text"
                                    placeholder="Search by destination or package name..."
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
                            <div className="text-3xl font-bold text-green-600">{packages.length}</div>
                            <div className="text-sm text-muted">Packages</div>
                        </div>
                        <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-border">
                            <div className="text-3xl font-bold text-teal-600">{featured.length}</div>
                            <div className="text-sm text-muted">Featured</div>
                        </div>
                        <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-border">
                            <div className="text-3xl font-bold text-blue-600">₹3K-₹25K</div>
                            <div className="text-sm text-muted">Price Range</div>
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
                                    Beach Tours
                                </Badge>
                                <Badge variant="secondary" className="cursor-pointer hover:bg-accent-primary hover:text-white transition-colors">
                                    Hill Tracts
                                </Badge>
                                <Badge variant="secondary" className="cursor-pointer hover:bg-accent-primary hover:text-white transition-colors">
                                    Wildlife
                                </Badge>
                            </div>
                        </div>
                        <select className="px-4 py-2 rounded-lg border border-border bg-secondary text-foreground text-sm">
                            <option>Sort by: Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Duration: Shortest</option>
                            <option>Rating: High to Low</option>
                        </select>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="all" className="mb-12">
                        <TabsList className="mb-6">
                            <TabsTrigger value="all">
                                All Packages ({packages.length})
                            </TabsTrigger>
                            <TabsTrigger value="featured">
                                Featured ({featured.length})
                            </TabsTrigger>
                            <TabsTrigger value="easy">
                                Easy ({byDifficulty.easy.length})
                            </TabsTrigger>
                            <TabsTrigger value="challenging">
                                Challenging ({byDifficulty.challenging.length})
                            </TabsTrigger>
                        </TabsList>

                        {/* All Packages */}
                        <TabsContent value="all">
                            <PackageGrid packages={packages} columns={3} />
                        </TabsContent>

                        {/* Featured */}
                        <TabsContent value="featured">
                            <PackageGrid packages={featured} columns={3} />
                        </TabsContent>

                        {/* Easy */}
                        <TabsContent value="easy">
                            <PackageGrid packages={byDifficulty.easy} columns={3} />
                        </TabsContent>

                        {/* Challenging */}
                        <TabsContent value="challenging">
                            <PackageGrid packages={byDifficulty.challenging} columns={3} />
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-secondary">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Can't Find What You're Looking For?
                    </h2>
                    <p className="text-lg text-secondary mb-8">
                        Contact our travel experts to create a custom package tailored to your needs
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button size="lg" className="text-lg px-8">
                            Request Custom Package
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8">
                            Contact Us
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
