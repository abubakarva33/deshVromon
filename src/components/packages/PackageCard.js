import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Users, TrendingUp, MapPin, Zap } from 'lucide-react';
import { Badge } from '../ui/badge';

/**
 * PackageCard Component
 * Displays tour package preview with image, duration, price, and destinations
 */
export default function PackageCard({ package: pkg, variant = 'default' }) {
    const {
        id,
        name,
        image,
        duration,
        price,
        destinations,
        difficulty,
        groupSize,
        agencyName,
        rating,
        featured,
    } = pkg;

    const packageUrl = `/packages/${id}`;

    const difficultyColors = {
        easy: 'bg-green-500/10 text-green-700 border-green-500/20',
        moderate: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
        challenging: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
        difficult: 'bg-red-500/10 text-red-700 border-red-500/20',
    };

    if (variant === 'compact') {
        return (
            <Link href={packageUrl} className="group block">
                <div className="flex gap-4 p-4 rounded-lg border border-border hover:border-accent-primary/50 transition-smooth bg-secondary">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={image || '/images/placeholder-package.jpg'}
                            alt={name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-accent-primary transition-colors">
                            {name}
                        </h3>
                        <p className="text-sm text-muted mb-2">{duration}</p>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="font-bold text-accent-primary">
                                ৳{price?.toLocaleString()}
                            </span>
                            <span className="text-muted">{destinations?.length} places</span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={packageUrl} className="group block">
            <div className="card-hover rounded-xl border border-border overflow-hidden bg-secondary h-full flex flex-col">
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden bg-muted">
                    <Image
                        src={image || '/images/placeholder-package.jpg'}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {featured && (
                        <div className="absolute top-3 left-3">
                            <Badge className="bg-orange-500 text-white border-0 gap-1">
                                <Zap className="w-3 h-3" />
                                Featured
                            </Badge>
                        </div>
                    )}

                    {/* Difficulty Badge */}
                    <div className="absolute top-3 right-3">
                        <Badge className={`${difficultyColors[difficulty]} capitalize border`}>
                            {difficulty}
                        </Badge>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-accent-primary transition-colors line-clamp-2">
                        {name}
                    </h3>

                    {/* Duration & Destinations */}
                    <div className="flex items-center gap-4 mb-3 text-sm text-secondary">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{destinations?.length} destinations</span>
                        </div>
                    </div>

                    {/* Destinations List */}
                    {destinations && destinations.length > 0 && (
                        <div className="mb-3">
                            <div className="text-xs text-muted mb-1">Includes:</div>
                            <div className="flex flex-wrap gap-1.5">
                                {destinations.slice(0, 3).map((dest, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs px-2 py-0.5 rounded-md bg-hover text-muted"
                                    >
                                        {dest}
                                    </span>
                                ))}
                                {destinations.length > 3 && (
                                    <span className="text-xs px-2 py-0.5 rounded-md bg-hover text-muted">
                                        +{destinations.length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Group Size */}
                    {groupSize && (
                        <div className="flex items-center gap-1.5 text-sm text-secondary mb-4">
                            <Users className="w-4 h-4" />
                            <span>Max {groupSize} people</span>
                        </div>
                    )}

                    {/* Agency & Price */}
                    <div className="mt-auto pt-3 border-t border-border">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted">By {agencyName}</span>
                            {rating && (
                                <span className="text-xs text-muted flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    {rating} rating
                                </span>
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-xs text-muted">Starting from</div>
                                <div className="text-xl font-bold text-accent-primary">
                                    ৳{price?.toLocaleString()}
                                    <span className="text-sm font-normal text-muted">/person</span>
                                </div>
                            </div>
                            <div className="text-sm font-semibold text-accent-primary group-hover:underline">
                                Book Now →
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

/**
 * PackageGrid Component
 * Grid layout for multiple packages
 */
export function PackageGrid({ packages, columns = 3 }) {
    if (!packages || packages.length === 0) {
        return (
            <div className="text-center py-12 bg-secondary rounded-xl border border-border">
                <p className="text-muted">No packages found</p>
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
            {packages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
            ))}
        </div>
    );
}
