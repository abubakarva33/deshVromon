import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DestinationGrid from '@/components/destinations/DestinationGrid';
import { getDestinationsByDistrict } from '@/data/destinations';
import { getDistrictBySlug } from '@/data/districts';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { district } = params;
    const districtData = getDistrictBySlug(district);

    if (!districtData) {
        return {
            title: 'District Not Found | DeshVromon',
        };
    }

    return {
        title: `${districtData.name} Tourist Spots | DeshVromon`,
        description: districtData.description,
    };
}

export default function DistrictDestinationsPage({ params }) {
    const { district } = params;
    const districtData = getDistrictBySlug(district);

    if (!districtData) {
        notFound();
    }

    const destinations = getDestinationsByDistrict(district);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <Link href="/destinations">
                        <Button variant="ghost" className="mb-6 group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to All Destinations
                        </Button>
                    </Link>

                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                {districtData.name}
                            </span>
                        </h1>
                        <p className="text-xl text-secondary mb-6">{districtData.nameBn}</p>
                        <p className="text-lg text-secondary mb-8">
                            {districtData.description}
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <div className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-border">
                                <span className="text-sm">
                                    <span className="font-bold text-accent-primary">{destinations.length}</span> Destinations
                                </span>
                            </div>
                            <div className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-border capitalize">
                                <span className="text-sm font-semibold text-foreground">
                                    {districtData.division} Division
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Destinations Grid */}
            <section className="py-12 px-4 bg-primary">
                <div className="max-w-7xl mx-auto">
                    {destinations.length > 0 ? (
                        <>
                            <h2 className="text-2xl font-bold text-foreground mb-8">
                                Places to Visit in {districtData.name}
                            </h2>
                            <DestinationGrid destinations={destinations} columns={3} />
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-lg text-muted">
                                No destinations found for {districtData.name} yet.
                            </p>
                            <p className="text-sm text-muted mt-2">
                                Check back soon as we add more amazing places!
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
