import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, MapPin, Wifi, Coffee, ParkingCircle, Utensils, Phone, Mail, Globe, ChevronLeft, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { hotels, getHotelById } from '@/data/hotels';
import HotelCard from '@/components/hotels/HotelCard';

export async function generateStaticParams() {
    return hotels.map((hotel) => ({
        id: hotel.id,
    }));
}

export async function generateMetadata({ params }) {
    const hotel = getHotelById(params.id);

    if (!hotel) {
        return {
            title: 'Hotel Not Found | DeshVromon',
        };
    }

    return {
        title: `${hotel.name} | DeshVromon Hotels`,
        description: hotel.description,
    };
}

export default function HotelDetailPage({ params }) {
    const hotel = getHotelById(params.id);

    if (!hotel) {
        notFound();
    }

    const {
        name,
        nameBn,
        district,
        type,
        rating,
        totalReviews,
        pricePerNight,
        priceRange,
        description,
        images,
        location,
        amenities,
        roomTypes,
        nearbyDestinations,
    } = hotel;

    // Get similar hotels
    const similarHotels = hotels
        .filter(h => h.id !== hotel.id && h.district === district)
        .slice(0, 3);

    const amenityIcons = {
        wifi: { Icon: Wifi, label: 'Free WiFi' },
        parking: { Icon: ParkingCircle, label: 'Free Parking' },
        restaurant: { Icon: Utensils, label: 'Restaurant' },
        breakfast: { Icon: Coffee, label: 'Breakfast' },
        pool: { Icon: Check, label: 'Swimming Pool' },
        spa: { Icon: Check, label: 'Spa' },
        gym: { Icon: Check, label: 'Gym' },
        'room-service': { Icon: Check, label: 'Room Service' },
        beach: { Icon: Check, label: 'Beach Access' },
    };

    return (
        <div className="min-h-screen bg-primary">
            {/* Back Button */}
            <div className="sticky top-0 z-10 bg-primary/95 backdrop-blur-sm border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <Link href="/hotels">
                        <Button variant="ghost" size="sm">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Hotels
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Image Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {images && images.length > 0 ? (
                        <>
                            <div className="col-span-2 md:col-span-2 row-span-2 relative aspect-video md:aspect-square rounded-xl overflow-hidden bg-muted">
                                <Image
                                    src={images[0]}
                                    alt={name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {images.slice(1, 5).map((img, idx) => (
                                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                                    <Image
                                        src={img}
                                        alt={`${name} - Image ${idx + 2}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="col-span-2 md:col-span-4 relative aspect-video rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                            <p className="text-muted">No images available</p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Badge className="capitalize">{type}</Badge>
                                <div className="flex items-center gap-1.5">
                                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                    <span className="font-semibold">{rating}</span>
                                    <span className="text-muted text-sm">({totalReviews} reviews)</span>
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold text-foreground mb-2">{name}</h1>
                            <p className="text-xl text-secondary mb-3">{nameBn}</p>
                            <div className="flex items-center gap-2 text-muted">
                                <MapPin className="w-4 h-4" />
                                <span>{location?.address || district}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-foreground mb-4">About This Property</h2>
                            <p className="text-secondary leading-relaxed">{description}</p>
                        </div>

                        {/* Amenities */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-foreground mb-4">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {amenities?.map((amenity, idx) => {
                                    const amenityData = amenityIcons[amenity];
                                    const Icon = amenityData?.Icon || Check;
                                    const label = amenityData?.label || amenity;

                                    return (
                                        <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-secondary border border-border">
                                            <Icon className="w-5 h-5 text-accent-primary" />
                                            <span className="text-sm capitalize">{label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Room Types */}
                        {roomTypes && roomTypes.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-foreground mb-4">Room Types</h2>
                                <div className="space-y-4">
                                    {roomTypes.map((room, idx) => (
                                        <div key={idx} className="p-4 rounded-xl border border-border bg-secondary">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-semibold text-lg">{room.type}</h3>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-accent-primary">
                                                        ৳{room.price.toLocaleString()}
                                                    </div>
                                                    <div className="text-sm text-muted">per night</div>
                                                </div>
                                            </div>
                                            <div className="text-sm text-muted">
                                                Max occupancy: {room.capacity} {room.capacity === 1 ? 'person' : 'people'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            {/* Booking Card */}
                            <div className="p-6 rounded-xl border border-border bg-secondary mb-6">
                                <div className="mb-4">
                                    <div className="text-sm text-muted mb-1">Starting from</div>
                                    <div className="text-3xl font-bold text-accent-primary">
                                        ৳{pricePerNight?.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-muted">per night</div>
                                </div>

                                <div className="space-y-3 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Check-in</label>
                                        <input
                                            type="date"
                                            className="w-full p-2 rounded-lg border border-border bg-primary text-foreground"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Check-out</label>
                                        <input
                                            type="date"
                                            className="w-full p-2 rounded-lg border border-border bg-primary text-foreground"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Guests</label>
                                        <select className="w-full p-2 rounded-lg border border-border bg-primary text-foreground">
                                            <option>1 Guest</option>
                                            <option>2 Guests</option>
                                            <option>3 Guests</option>
                                            <option>4+ Guests</option>
                                        </select>
                                    </div>
                                </div>

                                <Button className="w-full mb-3">Check Availability</Button>
                                <p className="text-xs text-center text-muted">Free cancellation available</p>
                            </div>

                            {/* Contact Info */}
                            <div className="p-6 rounded-xl border border-border bg-secondary">
                                <h3 className="font-bold mb-4">Contact Hotel</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2 text-secondary">
                                        <Phone className="w-4 h-4" />
                                        <span>+880 1XXX-XXXXXX</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-secondary">
                                        <Mail className="w-4 h-4" />
                                        <span>info@hotel.com</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-secondary">
                                        <Globe className="w-4 h-4" />
                                        <span>www.hotel.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Hotels */}
                {similarHotels.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-6">
                            More Hotels in {district.charAt(0).toUpperCase() + district.slice(1).replace('-', ' ')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {similarHotels.map((h) => (
                                <HotelCard key={h.id} hotel={h} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
