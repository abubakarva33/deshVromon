'use client';

import { useState } from 'react';
import { Search, X, TrendingUp, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * GlobalSearch Component
 * Searchable overlay for finding destinations, hotels, packages, events, stories
 */
export default function GlobalSearch({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({
        destinations: [],
        hotels: [],
        packages: [],
        events: [],
        stories: [],
    });
    const router = useRouter();

    // Simulated search - replace with actual API call
    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);

        if (searchQuery.length < 2) {
            setResults({
                destinations: [],
                hotels: [],
                packages: [],
                events: [],
                stories: [],
            });
            return;
        }

        // Mock search results - replace with actual search logic
        const mockResults = {
            destinations: [
                { id: '1', type: 'destination', name: "Cox's Bazar Beach", location: "Cox's Bazar" },
                { id: '2', type: 'destination', name: 'Sundarbans', location: 'Khulna' },
            ],
            hotels: [
                { id: '1', type: 'hotel', name: 'Sea Pearl Beach Resort', location: "Cox's Bazar" },
            ],
            packages: [
                { id: '1', type: 'package', name: "Cox's Bazar Beach Paradise", price: 10000 },
            ],
            events: [
                { id: '1', type: 'event', name: 'Pohela Boishakh', date: '2025-04-14' },
            ],
            stories: [
                { id: '1', type: 'story', title: 'Sunset at Inani Beach', author: 'Ahmed Rahman' },
            ],
        };

        setResults(mockResults);
    };

    const handleResultClick = (result) => {
        const routes = {
            destination: `/destinations/${result.location?.toLowerCase().replace(/\s+/g, '-')}/${result.id}`,
            hotel: `/hotels/${result.id}`,
            package: `/packages/${result.id}`,
            event: `/events/${result.id}`,
            story: `/stories/${result.id}`,
        };

        const route = routes[result.type];
        if (route) {
            router.push(route);
            onClose();
        }
    };

    if (!isOpen) return null;

    const totalResults = Object.values(results).reduce((acc, arr) => acc + arr.length, 0);

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="max-w-3xl mx-auto mt-20 px-4" onClick={(e) => e.stopPropagation()}>
                <div className="bg-primary border border-border rounded-2xl shadow-2xl overflow-hidden">
                    {/* Search Input */}
                    <div className="p-6 border-b border-border">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search destinations, hotels, packages, events, stories..."
                                className="w-full pl-12 pr-12 py-3 rounded-xl border border-border bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-accent-primary"
                                autoFocus
                            />
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-hover rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-muted" />
                            </button>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="max-h-[60vh] overflow-y-auto">
                        {query.length === 0 ? (
                            // Recent/Popular searches
                            <div className="p-6">
                                <h3 className="text-sm font-semibold text-muted uppercase mb-3">
                                    Popular Searches
                                </h3>
                                <div className="space-y-2">
                                    {['Cox\'s Bazar', 'Sundarbans', 'Bandarban', 'Sylhet'].map((term) => (
                                        <button
                                            key={term}
                                            onClick={() => handleSearch(term)}
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-hover transition-colors w-full text-left"
                                        >
                                            <TrendingUp className="w-4 h-4 text-accent-primary" />
                                            <span className="text-sm">{term}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : totalResults === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-muted">No results found for "{query}"</p>
                            </div>
                        ) : (
                            <div className="p-6 space-y-6">
                                {/* Destinations */}
                                {results.destinations.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-muted uppercase mb-3">
                                            Destinations ({results.destinations.length})
                                        </h3>
                                        <div className="space-y-1">
                                            {results.destinations.map((dest) => (
                                                <button
                                                    key={dest.id}
                                                    onClick={() => handleResultClick(dest)}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-hover transition-colors w-full text-left"
                                                >
                                                    <MapPin className="w-4 h-4 text-accent-primary" />
                                                    <div className="flex-1">
                                                        <div className="font-medium text-foreground">{dest.name}</div>
                                                        <div className="text-xs text-muted">{dest.location}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Hotels */}
                                {results.hotels.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-muted uppercase mb-3">
                                            Hotels ({results.hotels.length})
                                        </h3>
                                        <div className="space-y-1">
                                            {results.hotels.map((hotel) => (
                                                <button
                                                    key={hotel.id}
                                                    onClick={() => handleResultClick(hotel)}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-hover transition-colors w-full text-left"
                                                >
                                                    <div className="w-4 h-4 text-blue-500">🏨</div>
                                                    <div className="flex-1">
                                                        <div className="font-medium text-foreground">{hotel.name}</div>
                                                        <div className="text-xs text-muted">{hotel.location}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Packages */}
                                {results.packages.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-muted uppercase mb-3">
                                            Tour Packages ({results.packages.length})
                                        </h3>
                                        <div className="space-y-1">
                                            {results.packages.map((pkg) => (
                                                <button
                                                    key={pkg.id}
                                                    onClick={() => handleResultClick(pkg)}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-hover transition-colors w-full text-left"
                                                >
                                                    <div className="w-4 h-4 text-green-500">🎒</div>
                                                    <div className="flex-1">
                                                        <div className="font-medium text-foreground">{pkg.name}</div>
                                                        <div className="text-xs text-muted">৳{pkg.price?.toLocaleString()}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Events */}
                                {results.events.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-muted uppercase mb-3">
                                            Events ({results.events.length})
                                        </h3>
                                        <div className="space-y-1">
                                            {results.events.map((event) => (
                                                <button
                                                    key={event.id}
                                                    onClick={() => handleResultClick(event)}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-hover transition-colors w-full text-left"
                                                >
                                                    <div className="w-4 h-4 text-purple-500">📅</div>
                                                    <div className="flex-1">
                                                        <div className="font-medium text-foreground">{event.name}</div>
                                                        <div className="text-xs text-muted">{event.date}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Stories */}
                                {results.stories.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-muted uppercase mb-3">
                                            Stories ({results.stories.length})
                                        </h3>
                                        <div className="space-y-1">
                                            {results.stories.map((story) => (
                                                <button
                                                    key={story.id}
                                                    onClick={() => handleResultClick(story)}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-hover transition-colors w-full text-left"
                                                >
                                                    <div className="w-4 h-4 text-orange-500">📝</div>
                                                    <div className="flex-1">
                                                        <div className="font-medium text-foreground">{story.title}</div>
                                                        <div className="text-xs text-muted">by {story.author}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-3 border-t border-border bg-secondary">
                        <p className="text-xs text-muted text-center">
                            Press <kbd className="px-2 py-1 bg-hover rounded">ESC</kbd> to close
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
