import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, MapPin, Phone, Mail, Globe, Award, TrendingUp, ChevronLeft, BadgeCheck, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { agencies, getAgencyById } from '@/data/agencies';
import PackageCard from '@/components/packages/PackageCard';
import { packages } from '@/data/packages';

export async function generateStaticParams() {
    return agencies.map((agency) => ({
        id: agency.id,
    }));
}

export async function generateMetadata({ params }) {
    const agency = getAgencyById(params.id);

    if (!agency) {
        return {
            title: 'Agency Not Found | DeshVromon',
        };
    }

    return {
        title: `${agency.name} | DeshVromon Agencies`,
        description: agency.description,
    };
}

export default function AgencyProfilePage({ params }) {
    const agency = getAgencyById(params.id);

    if (!agency) {
        notFound();
    }

    const {
        name,
        nameBn,
        logo,
        coverImage,
        description,
        rating,
        totalReviews,
        established,
        license,
        district,
        location,
        contact,
        specializations,
        serviceAreas,
        stats,
        verified,
    } = agency;

    // Get agency packages
    const agencyPackages = packages.filter(p => p.agencyId === agency.id);

    return (
        <div className="min-h-screen bg-primary">
            {/* Back Button */}
            <div className="sticky top-0 z-10 bg-primary/95 backdrop-blur-sm border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <Link href="/agencies">
                        <Button variant="ghost" size="sm">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Agencies
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Cover & Logo */}
                <div className="relative mb-8">
                    {/* Cover Image */}
                    <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-gray-800 dark:via-purple-900/20 dark:to-orange-900/20">
                        {coverImage && (
                            <Image
                                src={coverImage}
                                alt={name}
                                fill
                                className="object-cover"
                            />
                        )}
                        {verified && (
                            <div className="absolute top-4 right-4">
                                <Badge className="bg-blue-500 text-white border-0 gap-1">
                                    <BadgeCheck className="w-4 h-4" />
                                    Verified Agency
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Logo */}
                    <div className="absolute -bottom-12 left-8">
                        <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-xl p-4 border-4 border-primary">
                            {logo ? (
                                <Image
                                    src={logo}
                                    alt={name}
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-accent-primary text-4xl font-bold">
                                    {name[0]}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="pt-16 mb-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div>
                            <h1 className="text-4xl font-bold text-foreground mb-2">{name}</h1>
                            <p className="text-xl text-secondary mb-3">{nameBn}</p>
                            <div className="flex items-center gap-4 text-sm text-muted">
                                <div className="flex items-center gap-1.5">
                                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                    <span className="font-semibold text-foreground">{rating}</span>
                                    <span>({totalReviews} reviews)</span>
                                </div>
                                <span>•</span>
                                <span>Est. {established}</span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {location}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline">
                                <Phone className="w-4 h-4 mr-2" />
                                Contact
                            </Button>
                            <Button>
                                <Calendar className="w-4 h-4 mr-2" />
                                Book a Tour
                            </Button>
                        </div>
                    </div>

                    {/* Specializations */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {specializations?.map((spec, idx) => (
                            <Badge key={idx} variant="secondary" className="capitalize">
                                {spec}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="p-6 rounded-xl border border-border bg-secondary text-center">
                                <div className="text-3xl font-bold text-accent-primary mb-1">
                                    {stats?.toursCompleted || 0}
                                </div>
                                <div className="text-sm text-muted">Tours Completed</div>
                            </div>
                            <div className="p-6 rounded-xl border border-border bg-secondary text-center">
                                <div className="text-3xl font-bold text-accent-primary mb-1">
                                    {stats?.happyCustomers || 0}
                                </div>
                                <div className="text-sm text-muted">Happy Customers</div>
                            </div>
                            <div className="p-6 rounded-xl border border-border bg-secondary text-center">
                                <div className="text-3xl font-bold text-accent-primary mb-1">
                                    {stats?.destinations || 0}
                                </div>
                                <div className="text-sm text-muted">Destinations</div>
                            </div>
                        </div>

                        {/* About */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-foreground mb-4">About Us</h2>
                            <p className="text-secondary leading-relaxed">{description}</p>
                        </div>

                        {/* Our Packages */}
                        {agencyPackages.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-foreground mb-4">
                                    Our Tour Packages ({agencyPackages.length})
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {agencyPackages.map((pkg) => (
                                        <PackageCard key={pkg.id} package={pkg} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Service Areas */}
                        {serviceAreas && serviceAreas.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-foreground mb-4">Service Areas</h2>
                                <div className="flex flex-wrap gap-2">
                                    {serviceAreas.map((area, idx) => (
                                        <div key={idx} className="px-4 py-2 rounded-lg bg-secondary border border-border capitalize">
                                            {area.replace('-', ' ')}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Contact Info */}
                            <div className="p-6 rounded-xl border border-border bg-secondary">
                                <h3 className="font-bold mb-4">Contact Information</h3>
                                <div className="space-y-3">
                                    {contact?.phone && (
                                        <div className="flex items-start gap-3">
                                            <Phone className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-sm text-muted mb-1">Phone</div>
                                                <div className="text-sm font-medium">{contact.phone}</div>
                                            </div>
                                        </div>
                                    )}
                                    {contact?.email && (
                                        <div className="flex items-start gap-3">
                                            <Mail className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-sm text-muted mb-1">Email</div>
                                                <div className="text-sm font-medium">{contact.email}</div>
                                            </div>
                                        </div>
                                    )}
                                    {contact?.website && (
                                        <div className="flex items-start gap-3">
                                            <Globe className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-sm text-muted mb-1">Website</div>
                                                <div className="text-sm font-medium">{contact.website}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* License Info */}
                            <div className="p-6 rounded-xl border border-border bg-secondary">
                                <h3 className="font-bold mb-4">License & Registration</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted">License No.</span>
                                        <span className="font-medium">{license}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted">Established</span>
                                        <span className="font-medium">{established}</span>
                                    </div>
                                    {verified && (
                                        <div className="pt-3 border-t border-border">
                                            <div className="flex items-center gap-2 text-blue-600">
                                                <BadgeCheck className="w-4 h-4" />
                                                <span className="font-semibold">Verified Agency</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
