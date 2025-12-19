import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, Clock, Users, ChevronLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { events } from '@/data/events';
import EventCard from '@/components/events/EventCard';

export async function generateStaticParams() {
    return events.map((event) => ({
        id: event.id,
    }));
}

export async function generateMetadata({ params }) {
    const event = events.find(e => e.id === params.id);

    if (!event) {
        return {
            title: 'Event Not Found | DeshVromon',
        };
    }

    return {
        title: `${event.name} | DeshVromon Events`,
        description: event.description,
    };
}

export default function EventDetailPage({ params }) {
    const event = events.find(e => e.id === params.id);

    if (!event) {
        notFound();
    }

    const {
        name,
        nameBn,
        date,
        location,
        district,
        type,
        image,
        description,
        longDescription,
        highlights,
        bestTimeToVisit,
        howToReach,
        tips,
        relatedDestinations,
    } = event;

    const eventDate = new Date(date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Get similar events
    const similarEvents = events
        .filter(e => e.id !== event.id && (e.type === type || e.district === district))
        .slice(0, 3);

    const typeColors = {
        festival: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
        cultural: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
        seasonal: 'bg-green-500/10 text-green-700 border-green-500/20',
        religious: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
    };

    return (
        <div className="min-h-screen bg-primary">
            {/* Back Button */}
            <div className="sticky top-0 z-10 bg-primary/95 backdrop-blur-sm border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/events">
                        <Button variant="ghost" size="sm">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Events
                        </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                    </Button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Hero Image */}
                <div className="relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden bg-muted mb-8">
                    {image ? (
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20" />
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Header */}
                        <div className="mb-6">
                            <Badge className={`${typeColors[type]} capitalize border mb-3`}>
                                {type}
                            </Badge>
                            <h1 className="text-4xl font-bold text-foreground mb-2">{name}</h1>
                            {nameBn && (
                                <p className="text-2xl text-secondary mb-4">{nameBn}</p>
                            )}

                            <div className="flex flex-wrap items-center gap-4 text-secondary">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>{formattedDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    <span>{location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-foreground mb-4">About This Event</h2>
                            <p className="text-secondary leading-relaxed mb-4">{description}</p>
                            {longDescription && (
                                <p className="text-secondary leading-relaxed">{longDescription}</p>
                            )}
                        </div>

                        {/* Highlights */}
                        {highlights && highlights.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-foreground mb-4">Highlights</h2>
                                <ul className="space-y-2">
                                    {highlights.map((highlight, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="w-2 h-2 rounded-full bg-accent-primary mt-2 flex-shrink-0" />
                                            <span className="text-secondary">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Best Time to Visit */}
                        {bestTimeToVisit && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-foreground mb-4">Best Time to Visit</h2>
                                <p className="text-secondary leading-relaxed">{bestTimeToVisit}</p>
                            </div>
                        )}

                        {/* How to Reach */}
                        {howToReach && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-foreground mb-4">How to Reach</h2>
                                <p className="text-secondary leading-relaxed">{howToReach}</p>
                            </div>
                        )}

                        {/* Tips */}
                        {tips && tips.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-foreground mb-4">Travel Tips</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {tips.map((tip, idx) => (
                                        <div key={idx} className="p-4 rounded-lg bg-secondary border border-border">
                                            <p className="text-sm text-secondary">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            {/* Quick Info */}
                            <div className="p-6 rounded-xl border border-border bg-secondary mb-6">
                                <h3 className="font-bold mb-4">Event Details</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted">Date</span>
                                        <span className="font-medium">
                                            {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted">Location</span>
                                        <span className="font-medium capitalize">{district?.replace('-', ' ')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted">Type</span>
                                        <span className="font-medium capitalize">{type}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-6 rounded-xl border border-border bg-secondary">
                                <Button className="w-full mb-3">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Add to My Plans
                                </Button>
                                <Button variant="outline" className="w-full">
                                    View Related Packages
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Events */}
                {similarEvents.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-6">
                            Similar Events
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {similarEvents.map((e) => (
                                <EventCard key={e.id} event={e} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
