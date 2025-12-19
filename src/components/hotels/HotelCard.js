import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Wifi, Coffee, ParkingCircle, Utensils, Check } from 'lucide-react';
import { Badge } from '../ui/badge';

/**
 * HotelCard Component
 * Displays hotel preview with image, rating, price, and amenities
 */
export default function HotelCard({ hotel, variant = 'default' }) {
    const {
        id,
        name,
        nameBn,
        district,
        pricePerNight,
        rating,
        totalReviews,
        images,
        amenities,
        featured,
    } = hotel;

    const imageUrl = images?.[0] || '/images/placeholder-hotel.jpg';
    const hotelUrl = `/hotels/${id}`;

    // Map amenities to icons
    const amenityIcons = {
        wifi: Wifi,
        parking: ParkingCircle,
        restaurant: Utensils,
        breakfast: Coffee,
    };

    const topAmenities = amenities?.slice(0, 4) || [];

    if (variant === 'compact') {
        return (
            <Link href={hotelUrl} className="group block">
                <div className="flex gap-4 p-4 rounded-lg border border-border hover:border-accent-primary/50 transition-smooth bg-secondary">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-accent-primary transition-colors">
                            {name}
                        </h3>
                        <p className="text-sm text-muted mb-2">{nameBn}</p>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="flex items-center gap-1 text-yellow-600">
                                <Star className="w-4 h-4 fill-yellow-500" />
                                {rating}
                            </span>
                            <span className="font-bold text-accent-primary">
                                ৳{pricePerNight.toLocaleString()}/night
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={hotelUrl} className="group block">
            <div className="card-hover rounded-xl border border-border overflow-hidden bg-secondary h-full flex flex-col">
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden bg-muted">
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {featured && (
                        <div className="absolute top-3 left-3">
                            <Badge className="bg-orange-500 text-white border-0">
                                Featured
                            </Badge>
                        </div>
                    )}

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 dark:bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                        <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm font-bold text-foreground">{rating}</span>
                            <span className="text-xs text-muted">({totalReviews})</span>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-accent-primary transition-colors line-clamp-1">
                        {name}
                    </h3>
                    <p className="text-sm text-muted mb-3">{nameBn}</p>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-sm text-secondary mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="capitalize">{district?.replace('-', ' ')}</span>
                    </div>

                    {/* Amenities */}
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        {topAmenities.map((amenity, idx) => {
                            const Icon = amenityIcons[amenity] || Check;
                            return (
                                <div
                                    key={idx}
                                    className="flex items-center gap-1 text-xs text-muted bg-hover px-2 py-1 rounded-md"
                                    title={amenity}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    <span className="capitalize">{amenity}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Price */}
                    <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
                        <div>
                            <div className="text-xs text-muted">Starting from</div>
                            <div className="text-xl font-bold text-accent-primary">
                                ৳{pricePerNight.toLocaleString()}
                                <span className="text-sm font-normal text-muted">/night</span>
                            </div>
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
 * HotelGrid Component
 * Grid layout for multiple hotels
 */
export function HotelGrid({ hotels, columns = 3 }) {
    if (!hotels || hotels.length === 0) {
        return (
            <div className="text-center py-12 bg-secondary rounded-xl border border-border">
                <p className="text-muted">No hotels found</p>
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
            {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
            ))}
        </div>
    );
}
