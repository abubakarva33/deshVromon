import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Users, MapPin, DollarSign, ChevronLeft, Check, X, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { packages, getPackageById } from '@/data/packages';
import { getAgencyById } from '@/data/agencies';
import PackageCard from '@/components/packages/PackageCard';

export async function generateStaticParams() {
    return packages.map((pkg) => ({
        id: pkg.id,
    }));
}

export async function generateMetadata({ params }) {
    const pkg = getPackageById(params.id);

    if (!pkg) {
        return {
            title: 'Package Not Found | DeshVromon',
        };
    }

    return {
        title: `${pkg.name} | DeshVromon Packages`,
        description: pkg.description,
    };
}

export default function PackageDetailPage({ params }) {
    const pkg = getPackageById(params.id);

    if (!pkg) {
        notFound();
    }

    const {
        name,
        duration,
        price,
        destinations,
        difficulty,
        groupSize,
        agencyId,
        agencyName,
        image,
        description,
        rating,
        featured,
        inclusions,
        exclusions,
    } = pkg;

    const agency = getAgencyById(agencyId);

    // Get similar packages
    const similarPackages = packages
        .filter(p => p.id !== pkg.id && p.difficulty === difficulty)
        .slice(0, 3);

    const difficultyColors = {
        easy: 'bg-green-500/10 text-green-700 border-green-500/20',
        moderate: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
        challenging: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
        difficult: 'bg-red-500/10 text-red-700 border-red-500/20',
    };

    return (
        <div className="min-h-screen bg-primary">
            {/* Back Button */}
            <div className="sticky top-0 z-10 bg-primary/95 backdrop-blur-sm border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <Link href="/packages">
                        <Button variant="ghost" size="sm">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Packages
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Hero Image */}
                <div className="relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden bg-muted mb-8">
                    <Image
                        src={image || '/images/placeholder-package.jpg'}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                    {featured && (
                        <div className="absolute top-4 left-4">
                            <Badge className="bg-orange-500 text-white border-0">
                                Featured Package
                            </Badge>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Badge className={`${difficultyColors[difficulty]} capitalize border`}>
                                    {difficulty}
                                </Badge>
                                {rating && (
                                    <div className="flex items-center gap-1.5 text-sm">
                                        <Award className="w-4 h-4 text-yellow-500" />
                                        <span className="font-semibold">{rating}</span>
                                        <span className="text-muted">rating</span>
                                    </div>
                                )}
                            </div>
                            <h1 className="text-4xl font-bold text-foreground mb-4">{name}</h1>

                            <div className="flex flex-wrap items-center gap-4 text-secondary">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>{duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    <span>Max {groupSize} people</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    <span>{destinations?.length} destinations</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-foreground mb-4">About This Package</h2>
                            <p className="text-secondary leading-relaxed">{description}</p>
                        </div>

                        {/* Destinations */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-foreground mb-4">Destinations Covered</h2>
                            <div className="flex flex-wrap gap-3">
                                {destinations?.map((dest, idx) => (
                                    <div key={idx} className="px-4 py-2 rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-accent-primary font-medium">
                                        <MapPin className="inline w-4 h-4 mr-1" />
                                        {dest}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Inclusions */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-foreground mb-4">What's Included</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {inclusions?.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Exclusions */}
                        {exclusions && exclusions.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-foreground mb-4">What's Not Included</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {exclusions.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                                            <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Agency Info */}
                        {agency && (
                            <div className="p-6 rounded-xl border border-border bg-secondary">
                                <h3 className="font-bold text-lg mb-3">Operated By</h3>
                                <Link href={`/agencies/${agencyId}`} className="flex items-center gap-4 hover:bg-hover p-3 rounded-lg transition-colors">
                                    {agency.logo && (
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white p-2 flex-shrink-0">
                                            <Image
                                                src={agency.logo}
                                                alt={agency.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-foreground group-hover:text-accent-primary">
                                            {agency.name}
                                        </h4>
                                        <div className="flex items-center gap-2 text-sm text-muted mt-1">
                                            <span>⭐ {agency.rating}</span>
                                            <span>•</span>
                                            <span>{agency.toursCompleted} tours completed</span>
                                        </div>
                                    </div>
                                    <ChevronLeft className="w-5 h-5 rotate-180 text-muted" />
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            {/* Booking Card */}
                            <div className="p-6 rounded-xl border border-border bg-secondary mb-6">
                                <div className="mb-6">
                                    <div className="text-sm text-muted mb-1">Price per person</div>
                                    <div className="text-4xl font-bold text-accent-primary">
                                        ৳{price?.toLocaleString()}
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Travel Date</label>
                                        <input
                                            type="date"
                                            className="w-full p-2 rounded-lg border border-border bg-primary text-foreground"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Number of Travelers</label>
                                        <select className="w-full p-2 rounded-lg border border-border bg-primary text-foreground">
                                            <option>1 Person</option>
                                            <option>2 People</option>
                                            <option>3 People</option>
                                            <option>4+ People</option>
                                        </select>
                                    </div>
                                </div>

                                <Button className="w-full mb-3">Book Now</Button>
                                <Button variant="outline" className="w-full">
                                    Request Custom Quote
                                </Button>

                                <p className="text-xs text-center text-muted mt-4">
                                    Free cancellation up to 7 days before departure
                                </p>
                            </div>

                            {/* Quick Info */}
                            <div className="p-6 rounded-xl border border-border bg-secondary">
                                <h3 className="font-bold mb-4">Quick Information</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted">Duration</span>
                                        <span className="font-medium">{duration}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted">Group Size</span>
                                        <span className="font-medium">Max {groupSize}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted">Difficulty</span>
                                        <span className="font-medium capitalize">{difficulty}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted">Agency</span>
                                        <span className="font-medium">{agencyName}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Packages */}
                {similarPackages.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-foreground mb-6">
                            Similar Packages
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {similarPackages.map((p) => (
                                <PackageCard key={p.id} package={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
