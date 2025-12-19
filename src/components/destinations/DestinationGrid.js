'use client';

import DestinationCard from './DestinationCard';

/**
 * DestinationGrid Component
 * Grid layout for displaying multiple destination cards
 */
export default function DestinationGrid({ destinations, variant = 'default', columns = 3 }) {
    if (!destinations || destinations.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted text-lg">No destinations found</p>
            </div>
        );
    }

    const gridCols = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    return (
        <div className={`grid ${gridCols[columns]} gap-6 animate-fade-in`}>
            {destinations.map((destination) => (
                <DestinationCard
                    key={destination.id}
                    destination={destination}
                    variant={variant}
                />
            ))}
        </div>
    );
}
