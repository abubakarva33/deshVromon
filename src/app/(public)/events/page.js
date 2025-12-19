import Link from 'next/link';
import { Search, SlidersHorizontal, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventCard, { EventGrid } from '@/components/events/EventCard';
import { events } from '@/data/events';

export const metadata = {
    title: 'Travel Events & Festivals | DeshVromon',
    description: 'Discover upcoming travel events, festivals, and cultural celebrations across Bangladesh',
};

export default function EventsPage() {
    const byType = {
        festival: events.filter(e => e.type === 'festival'),
        cultural: events.filter(e => e.type === 'cultural'),
        seasonal: events.filter(e => e.type === 'seasonal'),
        religious: events.filter(e => e.type === 'religious'),
    };

    const upcoming = events.filter(e => new Date(e.date) > new Date());
    const featured = events.filter(e => e.featured);

    return (
        <div className="min-h-screen bg-primary">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-pink-900/20 pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Events & Festivals
                            </span>
                        </h1>
                        <p className="text-xl text-secondary mb-8">
                            Experience Bangladesh's rich cultural heritage and seasonal celebrations
                        </p>

                        {/* Search Bar */}
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                <input
                                    type="text"
                                    placeholder="Search events by name or location..."
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
                            <div className="text-3xl font-bold text-indigo-600">{events.length}</div>
                            <div className="text-sm text-muted">Events</div>
                        </div>
                        <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-border">
                            <div className="text-3xl font-bold text-purple-600">{upcoming.length}</div>
                            <div className="text-sm text-muted">Upcoming</div>
                        </div>
                        <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-border">
                            <div className="text-3xl font-bold text-pink-600">{Object.keys(byType).length}</div>
                            <div className="text-sm text-muted">Categories</div>
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
                            <option>Sort by: Date</option>
                            <option>Sort by: Name</option>
                            <option>Sort by: Location</option>
                        </select>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="all" className="mb-12">
                        <TabsList className="mb-6">
                            <TabsTrigger value="all">
                                All Events ({events.length})
                            </TabsTrigger>
                            <TabsTrigger value="upcoming">
                                Upcoming ({upcoming.length})
                            </TabsTrigger>
                            <TabsTrigger value="festivals">
                                Festivals ({byType.festival.length})
                            </TabsTrigger>
                            <TabsTrigger value="cultural">
                                Cultural ({byType.cultural.length})
                            </TabsTrigger>
                        </TabsList>

                        {/* All Events */}
                        <TabsContent value="all">
                            <EventGrid events={events} columns={3} />
                        </TabsContent>

                        {/* Upcoming */}
                        <TabsContent value="upcoming">
                            <EventGrid events={upcoming} columns={3} />
                        </TabsContent>

                        {/* Festivals */}
                        <TabsContent value="festivals">
                            <EventGrid events={byType.festival} columns={3} />
                        </TabsContent>

                        {/* Cultural */}
                        <TabsContent value="cultural">
                            <EventGrid events={byType.cultural} columns={3} />
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-secondary">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Plan Your Visit Around Events
                    </h2>
                    <p className="text-lg text-secondary mb-8">
                        Create custom travel plans that include these amazing festivals and events
                    </p>
                    <Button size="lg" className="text-lg px-8">
                        <CalendarIcon className="w-5 h-5 mr-2" />
                        Create Travel Plan
                    </Button>
                </div>
            </section>
        </div>
    );
}
