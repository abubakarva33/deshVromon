import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Clock, DollarSign, Users, Activity, Star, Phone, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import HypeIndicator, { HypeBar } from '@/components/destinations/HypeIndicator';
import DestinationCard from '@/components/destinations/DestinationCard';
import { getDestinationBySlug } from '@/data/destinations';
import { getDistrictBySlug } from '@/data/districts';
import destinations from '@/data/destinations';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { district, slug } = params;
    const destination = getDestinationBySlug(district, slug);

    if (!destination) {
        return { title: 'Destination Not Found | DeshVromon' };
    }

    return {
        title: `${destination.name} - ${destination.district} | DeshVromon`,
        description: destination.description,
    };
}

export default function DestinationDetailPage({ params }) {
    const { district, slug } = params;
    const destination = getDestinationBySlug(district, slug);
    const districtData = getDistrictBySlug(district);

    if (!destination || !districtData) {
        notFound();
    }

    // Get nearby destinations
    const nearbyDestinations = destination.nearbySpots
        ? destinations.filter(d => destination.nearbySpots.includes(d.id)).slice(0, 3)
        : destinations.filter(d => d.district === district && d.id !== destination.id).slice(0, 3);

    const {
        name,
        nameBn,
        type,
        description,
        longDescription,
        images,
        hypePercentage,
        bestSeason,
        activities,
        entryFee,
        openingHours,
        visitDuration,
        facilities,
        bestFor,
        tags,
        reviews,
        totalReviews,
    } = destination;

    return (
        <div className="min-h-screen bg-primary">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px]">
                {/* Image Gallery */}
                <div className="absolute inset-0">
                    {images && images[0] ? (
                        <Image
                            src={images[0]}
                            alt={name}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative h-full flex flex-col justify-end">
                    <div className="max-w-7xl mx-auto w-full px-4 pb-12">
                        {/* Back Button */}
                        <Link href={`/destinations/${district}`}>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="mb-6 bg-white/90 hover:bg-white backdrop-blur-sm"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to {districtData.name}
                            </Button>
                        </Link>

                        {/* Title & Meta */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2 items-center">
                                <Badge className={`capitalize bg-white/20 backdrop-blur-sm text-white border-white/30`}>
                                    {type}
                                </Badge>
                                <HypeIndicator percentage={hypePercentage} size="lg" />
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                                {name}
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90">{nameBn}</p>

                            <div className="flex flex-wrap gap-4 text-white/90">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    <span className="capitalize">{district.replace('-', ' ')}, Bangladesh</span>
                                </div>
                                {reviews && (
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                                        <span className="font-semibold">{reviews}</span>
                                        <span>({totalReviews} reviews)</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description */}
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-4">About This Place</h2>
                                <p className="text-lg text-secondary leading-relaxed mb-4">
                                    {description}
                                </p>
                                {longDescription && (
                                    <p className="text-base text-secondary leading-relaxed">
                                        {longDescription}
                                    </p>
                                )}
                            </div>

                            {/* Hype Meter */}
                            <div className="p-6 rounded-xl border border-border bg-secondary">
                                <h3 className="text-lg font-bold text-foreground mb-4">Popularity Meter</h3>
                                <HypeBar percentage={hypePercentage} />
                                <p className="text-sm text-muted mt-3">
                                    This destination is trending among travelers!
                                </p>
                            </div>

                            {/* Activities */}
                            {activities && activities.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-accent-primary" />
                                        Things to Do
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {activities.map((activity, index) => (
                                            <div
                                                key={index}
                                                className="p-4 rounded-lg border border-border bg-secondary hover:bg-hover transition-colors"
                                            >
                                                <p className="font-medium text-foreground">{activity}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Best For */}
                            {bestFor && bestFor.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-4">Perfect For</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {bestFor.map((category, index) => (
                                            <Badge key={index} variant="secondary" className="text-sm px-4 py-1.5">
                                                {category}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tags */}
                            {tags && tags.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-3">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 rounded-md bg-hover text-secondary text-sm"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6">
                            {/* Key Information Card */}
                            <div className="p-6 rounded-xl border border-border bg-secondary sticky top-20">
                                <h3 className="text-lg font-bold text-foreground mb-4">Key Information</h3>

                                <div className="space-y-4">
                                    {/* Best Season */}
                                    {bestSeason && bestSeason.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Calendar className="w-4 h-4 text-muted" />
                                                <span className="text-sm font-semibold text-foreground">Best Time to Visit</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {bestSeason.map((month) => (
                                                    <Badge key={month} variant="outline" className="text-xs">
                                                        {month}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Visit Duration */}
                                    {visitDuration && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Clock className="w-4 h-4 text-muted" />
                                                <span className="text-sm font-semibold text-foreground">Recommended Duration</span>
                                            </div>
                                            <p className="text-sm text-secondary ml-6">{visitDuration}</p>
                                        </div>
                                    )}

                                    {/* Entry Fee */}
                                    {entryFee && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <DollarSign className="w-4 h-4 text-muted" />
                                                <span className="text-sm font-semibold text-foreground">Entry Fee</span>
                                            </div>
                                            <div className="ml-6 space-y-1">
                                                {entryFee.local !== undefined && (
                                                    <p className="text-sm text-secondary">
                                                        Local: <span className="font-semibold">{entryFee.local} BDT</span>
                                                    </p>
                                                )}
                                                {entryFee.foreign !== undefined && (
                                                    <p className="text-sm text-secondary">
                                                        Foreign: <span className="font-semibold">{entryFee.foreign} BDT</span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Opening Hours */}
                                    {openingHours && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Info className="w-4 h-4 text-muted" />
                                                <span className="text-sm font-semibold text-foreground">Opening Hours</span>
                                            </div>
                                            <p className="text-sm text-secondary ml-6">{openingHours}</p>
                                        </div>
                                    )}

                                    {/* Facilities */}
                                    {facilities && facilities.length > 0 && (
                                        <div>
                                            <span className="text-sm font-semibold text-foreground block mb-2">Facilities</span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {facilities.map((facility, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="text-xs"
                                                    >
                                                        {facility}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 space-y-3">
                                    <Button className="w-full" size="lg">
                                        Add to My Plan
                                    </Button>
                                    <Button variant="outline" className="w-full" size="lg">
                                        Share Destination
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Nearby Destinations */}
                    {nearbyDestinations.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold text-foreground mb-6">Nearby Destinations</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {nearbyDestinations.map((dest) => (
                                    <DestinationCard key={dest.id} destination={dest} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
