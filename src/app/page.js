import Link from 'next/link';
import { ArrowRight, MapPin, TrendingUp, Users, Star, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DestinationGrid from '@/components/destinations/DestinationGrid';
import PlanCard from '@/components/plans/PlanCard';
import ScoreDisplay from '@/components/score/ScoreDisplay';
import SearchBar from '@/components/shared/SearchBar';
import { getFeaturedDestinations } from '@/data/destinations';
import { getFeaturedPlans, getTrendingPlans } from '@/data/plans';
import { getFeaturedDistricts } from '@/data/districts';
import { getTravelerLevel } from '@/lib/travelScore';

export const dynamic = 'force-dynamic';

export default function Home() {
  // Get data
  const featuredDestinations = getFeaturedDestinations(6);
  const trendingPlans = getTrendingPlans(3);
  const featuredDistricts = getFeaturedDistricts();

  // Sample visitor score simulation data
  const sampleLevel = getTravelerLevel(450);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-green-600 to-orange-600 bg-clip-text text-transparent">
                Discover Bangladesh
              </span>
              <br />
              <span className="text-foreground">Your Ultimate Travel Companion</span>
            </h1>
            <p className="text-xl text-secondary mb-8 leading-relaxed">
              Explore destinations, create travel plans, share experiences, and connect with the travel community.
              <br />
              Start your journey across the beauty of Bangladesh today.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-8">
              <SearchBar
                placeholder="Search destinations, places, experiences..."
                showFilters={true}
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl border border-border">
                <div className="text-3xl font-bold text-blue-600">64</div>
                <div className="text-sm text-muted">Districts</div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl border border-border">
                <div className="text-3xl font-bold text-green-600">200+</div>
                <div className="text-sm text-muted">Destinations</div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl border border-border">
                <div className="text-3xl font-bold text-orange-600">1000+</div>
                <div className="text-sm text-muted">Travel Plans</div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl border border-border">
                <div className="text-3xl font-bold text-purple-600">5000+</div>
                <div className="text-sm text-muted">Travelers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-16 px-4 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                🔥 Trending Destinations
              </h2>
              <p className="text-muted">Most popular places travelers are exploring right now</p>
            </div>
            <Link href="/destinations">
              <Button variant="outline" className="group">
                View All
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <DestinationGrid destinations={featuredDestinations} columns={3} />
        </div>
      </section>

      {/* Travel Score Teaser */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl md font-bold text-foreground mb-4">
                Build Your Travel Score
              </h2>
              <p className="text-lg text-secondary mb-6">
                Visit destinations, create plans, share stories, and climb the traveler ranks.
                From Newbie to Expert, track your journey and unlock achievements.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Visit Destinations</h4>
                    <p className="text-sm text-muted">Earn 10 points for each destination you visit</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Map className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Create Travel Plans</h4>
                    <p className="text-sm text-muted">Get 15 points for planning your adventures</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Share & Review</h4>
                    <p className="text-sm text-muted">Earn points for stories and reviews</p>
                  </div>
                </div>
              </div>

              <Link href="/travel-score">
                <Button size="lg" className="group">
                  Start Your Journey
                  <TrendingUp className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="animate-scale-in">
              <ScoreDisplay
                score={450}
                level={sampleLevel}
                size="lg"
              />
              <p className="text-center text-sm text-muted mt-4">
                Sample travel score - Start exploring to build yours!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Travel Plans */}
      <section className="py-16 px-4 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                ✈️ Trending Travel Plans
              </h2>
              <p className="text-muted">Popular itineraries from our community</p>
            </div>
            <Link href="/plans">
              <Button variant="outline" className="group">
                Explore Plans
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {trendingPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Explore by District */}
      <section className="py-16 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              🗺️ Explore by District
            </h2>
            <p className="text-muted">Discover the unique beauty of each region</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featuredDistricts.map((district) => (
              <Link
                key={district.id}
                href={`/destinations/${district.slug}`}
                className="group"
              >
                <div className="relative h-32 rounded-xl overflow-hidden border border-border bg-muted card-hover">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-3">
                    <h3 className="font-bold text-lg mb-1 group-hover:scale-110 transition-transform">
                      {district.name}
                    </h3>
                    <p className="text-xs opacity-90">{district.nameBn}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {district.destinationsCount} places
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/destinations">
              <Button variant="outline" size="lg">
                View All Districts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of travelers discovering the beauty of Bangladesh.
            Create your account and unlock the full travel experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Sign Up Free
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 hover:bg-white/20 border-white/30 text-white">
              Explore as Guest
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
