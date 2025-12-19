import Image from 'next/image';
import Link from 'next/link';
import { MapPin, TrendingUp, Calendar, Star } from 'lucide-react';
import { Badge } from '../ui/badge';

/**
 * DestinationCard Component
 * Displays a destination preview card with image, hype indicator, and metadata
 */
export default function DestinationCard({ destination, variant = 'default' }) {
    const {
        slug,
        district,
        name,
        nameBn,
        description,
        images,
        hypePercentage,
        type,
        reviews,
        totalReviews,
        tags,
    } = destination;

    // Get type-specific color
    const getTypeColor = (type) => {
        const colors = {
            beach: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
            hills: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
            historical: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
            nature: 'bg-green-500/10 text-green-700 border-green-500/20',
            waterfall: 'bg-cyan-500/10 text-cyan-700 border-cyan-500/20',
            lake: 'bg-blue-600/10 text-blue-800 border-blue-600/20',
        };
        return colors[type] || 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    };

    // Get hype level color
    const getHypeColor = (hype) => {
        if (hype >= 90) return 'text-red-600';
        if (hype >= 75) return 'text-orange-600';
        if (hype >= 60) return 'text-yellow-600';
        return 'text-green-600';
    };

    const imageUrl = images?.[0] || '/images/placeholder-destination.jpg';
    const destinationUrl = `/destinations/${district}/${slug}`;

    if (variant === 'compact') {
        return (
            <Link href={destinationUrl} className="group block">
                <div className="flex gap-3 p-3 rounded-lg border border-border hover:border-accent-primary/50 transition-smooth bg-secondary">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-foreground truncate group-hover:text-accent-primary transition-colors">
                            {name}
                        </h3>
                        <p className="text-xs text-muted truncate">{nameBn}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs font-semibold ${getHypeColor(hypePercentage)}`}>
                                {hypePercentage}% <TrendingUp className="inline w-3 h-3" />
                            </span>
                            {reviews && (
                                <span className="text-xs text-muted flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                    {reviews}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={destinationUrl} className="group block">
            <div className="card-hover rounded-xl border border-border overflow-hidden bg-secondary">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-muted">
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                        <Badge className={`${getTypeColor(type)} capitalize border backdrop-blur-sm`}>
                            {type}
                        </Badge>
                    </div>

                    {/* Hype Indicator */}
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                        <div className="flex items-center gap-1.5">
                            <TrendingUp className={`w-4 h-4 ${getHypeColor(hypePercentage)}`} />
                            <span className={`text-sm font-bold ${getHypeColor(hypePercentage)}`}>
                                {hypePercentage}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                    <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-accent-primary transition-colors line-clamp-1">
                        {name}
                    </h3>
                    <p className="text-sm text-muted mb-2">{nameBn}</p>

                    <p className="text-sm text-secondary line-clamp-2 mb-3">
                        {description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-xs text-muted">
                        <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="capitalize">{district?.replace('-', ' ')}</span>
                        </div>

                        {reviews && (
                            <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                                <span className="font-semibold">{reviews}</span>
                                <span>({totalReviews})</span>
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-2 py-0.5 rounded-md bg-hover text-muted"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
