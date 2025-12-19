import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Badge } from '../ui/badge';

/**
 * EventCard Component
 * Displays travel event preview with date, location, and type
 */
export default function EventCard({ event, variant = 'default' }) {
    const {
        id,
        name,
        date,
        location,
        type,
        image,
        description,
        featured,
    } = event;

    const eventUrl = `/events/${id}`;

    const typeColors = {
        festival: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
        cultural: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
        seasonal: 'bg-green-500/10 text-green-700 border-green-500/20',
        religious: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
    };

    // Format date
    const eventDate = new Date(date);
    const monthShort = eventDate.toLocaleString('en', { month: 'short' });
    const day = eventDate.getDate();

    if (variant === 'compact') {
        return (
            <Link href={eventUrl} className="group block">
                <div className="flex gap-4 p-4 rounded-lg border border-border hover:border-accent-primary/50 transition-smooth bg-secondary">
                    <div className="flex-shrink-0 w-16 text-center">
                        <div className="bg-accent-primary text-white rounded-lg p-2">
                            <div className="text-2xl font-bold leading-none">{day}</div>
                            <div className="text-xs uppercase">{monthShort}</div>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-accent-primary transition-colors">
                            {name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted mt-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{location}</span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={eventUrl} className="group block">
            <div className="card-hover rounded-xl border border-border overflow-hidden bg-secondary h-full flex flex-col">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-muted">
                    {image ? (
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20" />
                    )}

                    {/* Date Badge */}
                    <div className="absolute top-3 left-3">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 text-center min-w-[60px]">
                            <div className="text-2xl font-bold text-foreground leading-none">{day}</div>
                            <div className="text-xs text-muted uppercase">{monthShort}</div>
                        </div>
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-3 right-3">
                        <Badge className={`${typeColors[type]} capitalize border`}>
                            {type}
                        </Badge>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-accent-primary transition-colors line-clamp-2">
                        {name}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-secondary mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{location}</span>
                    </div>

                    {/* Description */}
                    {description && (
                        <p className="text-sm text-muted line-clamp-2 mb-4">
                            {description}
                        </p>
                    )}

                    {/* Footer */}
                    <div className="mt-auto pt-3 border-t border-border">
                        <div className="text-sm font-semibold text-accent-primary group-hover:underline">
                            Learn More →
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

/**
 * EventGrid Component
 * Grid layout for multiple events
 */
export function EventGrid({ events, columns = 3 }) {
    if (!events || events.length === 0) {
        return (
            <div className="text-center py-12 bg-secondary rounded-xl border border-border">
                <p className="text-muted">No events found</p>
            </div>
        );
    }

    const gridCols = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <div className={`grid ${gridCols[columns]} gap-6`}>
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
}
