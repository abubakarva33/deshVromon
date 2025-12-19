import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Award, TrendingUp, BadgeCheck } from 'lucide-react';
import { Badge } from '../ui/badge';

/**
 * AgencyCard Component
 * Displays tour agency preview with logo, rating, and specializations
 */
export default function AgencyCard({ agency, variant = 'default' }) {
    const {
        id,
        name,
        logo,
        rating,
        totalReviews,
        toursCompleted,
        specializations,
        verified,
        priceRange,
        district,
    } = agency;

    const agencyUrl = `/agencies/${id}`;

    if (variant === 'compact') {
        return (
            <Link href={agencyUrl} className="group block">
                <div className="flex gap-4 p-4 rounded-lg border border-border hover:border-accent-primary/50 transition-smooth bg-secondary">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white p-2">
                        {logo ? (
                            <Image
                                src={logo}
                                alt={name}
                                fill
                                className="object-contain"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted text-2xl font-bold">
                                {name[0]}
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-accent-primary transition-colors">
                                {name}
                            </h3>
                            {verified && (
                                <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            )}
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="flex items-center gap-1 text-yellow-600">
                                <Star className="w-4 h-4 fill-yellow-500" />
                                {rating}
                            </span>
                            <span className="text-muted">{toursCompleted} tours</span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={agencyUrl} className="group block">
            <div className="card-hover rounded-xl border border-border overflow-hidden bg-secondary h-full flex flex-col">
                {/* Header with Logo */}
                <div className="relative h-32 bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 dark:from-gray-800 dark:via-orange-900/20 dark:to-purple-900/20 flex items-center justify-center">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg p-3">
                        {logo ? (
                            <Image
                                src={logo}
                                alt={name}
                                fill
                                className="object-contain"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-accent-primary text-3xl font-bold">
                                {name[0]}
                            </div>
                        )}
                    </div>

                    {verified && (
                        <div className="absolute top-3 right-3">
                            <Badge className="bg-blue-500 text-white border-0 gap-1">
                                <BadgeCheck className="w-3 h-3" />
                                Verified
                            </Badge>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-accent-primary transition-colors line-clamp-1">
                        {name}
                    </h3>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span className="font-semibold text-foreground">{rating}</span>
                            <span className="text-muted">({totalReviews})</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted">
                            <Award className="w-4 h-4" />
                            <span>{toursCompleted} tours</span>
                        </div>
                    </div>

                    {/* Location */}
                    {district && (
                        <div className="flex items-center gap-1 text-sm text-secondary mb-4">
                            <MapPin className="w-4 h-4" />
                            <span className="capitalize">{district.replace('-', ' ')}</span>
                        </div>
                    )}

                    {/* Specializations */}
                    {specializations && specializations.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {specializations.slice(0, 3).map((spec, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                    {spec}
                                </Badge>
                            ))}
                            {specializations.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                    +{specializations.length - 3}
                                </Badge>
                            )}
                        </div>
                    )}

                    {/* Price Range */}
                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                        <div className="text-sm">
                            <span className="text-muted">Price Range: </span>
                            <span className="font-semibold text-foreground">{priceRange || 'Varies'}</span>
                        </div>
                        <div className="text-sm font-semibold text-accent-primary group-hover:underline">
                            View Details →
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

/**
 * AgencyGrid Component
 * Grid layout for multiple agencies
 */
export function AgencyGrid({ agencies, columns = 3 }) {
    if (!agencies || agencies.length === 0) {
        return (
            <div className="text-center py-12 bg-secondary rounded-xl border border-border">
                <p className="text-muted">No agencies found</p>
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
            {agencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} />
            ))}
        </div>
    );
}
