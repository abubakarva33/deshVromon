import Link from 'next/link';
import { ArrowLeft, TrendingUp, MapPin, FileText, Image as ImageIcon, Award, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScoreDisplay, { LevelBadge } from '@/components/score/ScoreDisplay';
import { AchievementGrid } from '@/components/score/AchievementCard';
import PlanCard from '@/components/plans/PlanCard';
import DestinationCard from '@/components/destinations/DestinationCard';
import { currentUser, getTravelerLevel } from '@/data/users';
import { getPlansByCreator } from '@/data/plans';
import destinations from '@/data/destinations';
import { getAchievements } from '@/lib/travelScore';

export const metadata = {
    title: 'My Dashboard | DeshVromon',
    description: 'Manage your travel profile, plans, and achievements',
};

export default function DashboardPage() {
    // For demo purposes, using current user
    const user = currentUser;
    const level = getTravelerLevel(user.travelScore);
    const myPlans = getPlansByCreator(user.id);
    const achievements = getAchievements(user);

    // Get visited destinations
    const visitedDestinations = destinations.filter(d =>
        user.visitedDestinations?.includes(d.id)
    );

    // All available achievements for display
    const allAchievements = [
        { id: 'first-plan', name: 'Plan Master', description: 'Create your first travel plan', icon: '📝' },
        { id: 'explorer', name: 'Explorer', description: 'Visit 10 destinations', icon: '🎒' },
        { id: 'storyteller', name: 'Story Master', description: 'Share 5 travel stories', icon: '✍️' },
        { id: 'beach-lover', name: 'Beach Explorer', description: 'Visit multiple beaches', icon: '🏖️' },
        { id: 'hill-climber', name: 'Hill Conqueror', description: 'Conquer the hills', icon: '⛰️' },
        { id: 'expert-traveler', name: 'Travel Expert', description: 'Reach 1000 travel score', icon: '🏆' },
        { id: 'photographer', name: 'Shutterbug', description: 'Share 20+ photos', icon: '📸' },
        { id: 'reviewer', name: 'Helpful Reviewer', description: 'Write 25 reviews', icon: '⭐' },
    ];

    return (
        <div className="min-h-screen bg-primary">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link href="/">
                        <Button variant="ghost" className="mb-6 group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Button>
                    </Link>

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                                Welcome back, {user.name.split(' ')[0]}!
                            </h1>
                            <p className="text-lg text-muted flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {user.location}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <LevelBadge level={level} size="lg" />
                            <Button variant="outline" size="lg">
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        {/* Travel Score Card */}
                        <div className="lg:col-span-1">
                            <ScoreDisplay score={user.travelScore} level={level} size="lg" />
                        </div>

                        {/* Quick Stats */}
                        <div className="lg:col-span-2">
                            <Card className="p-6 h-full">
                                <h3 className="text-xl font-bold text-foreground mb-6">Your Stats</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center p-4 rounded-lg bg-blue-500/10">
                                        <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                        <div className="text-3xl font-bold text-foreground">{user.stats.destinationsVisited}</div>
                                        <div className="text-sm text-muted">Destinations Visited</div>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-green-500/10">
                                        <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                        <div className="text-3xl font-bold text-foreground">{user.stats.plansCreated}</div>
                                        <div className="text-sm text-muted">Plans Created</div>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-orange-500/10">
                                        <ImageIcon className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                                        <div className="text-3xl font-bold text-foreground">{user.stats.storiesShared}</div>
                                        <div className="text-sm text-muted">Stories Shared</div>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-purple-500/10">
                                        <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                        <div className="text-3xl font-bold text-foreground">{achievements.length}</div>
                                        <div className="text-sm text-muted">Achievements</div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Tabs for Content */}
                    <Tabs defaultValue="plans" className="w-full">
                        <TabsList className="grid w-full md:w-auto grid-cols-4 mb-8">
                            <TabsTrigger value="plans">My Plans</TabsTrigger>
                            <TabsTrigger value="visited">Visited</TabsTrigger>
                            <TabsTrigger value="achievements">Achievements</TabsTrigger>
                            <TabsTrigger value="activity">Activity</TabsTrigger>
                        </TabsList>

                        {/* My Plans Tab */}
                        <TabsContent value="plans" className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-foreground">
                                    My Travel Plans ({myPlans.length})
                                </h2>
                                <Link href="/plan-builder">
                                    <Button>
                                        <FileText className="w-4 h-4 mr-2" />
                                        Create New Plan
                                    </Button>
                                </Link>
                            </div>

                            {myPlans.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {myPlans.map((plan) => (
                                        <PlanCard key={plan.id} plan={plan} />
                                    ))}
                                </div>
                            ) : (
                                <Card className="p-12 text-center">
                                    <FileText className="w-16 h-16 text-muted mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-foreground mb-2">
                                        No plans yet
                                    </h3>
                                    <p className="text-muted mb-6">
                                        Start creating your first travel plan to organize your adventures
                                    </p>
                                    <Link href="/plan-builder">
                                        <Button>Create Your First Plan</Button>
                                    </Link>
                                </Card>
                            )}
                        </TabsContent>

                        {/* Visited Destinations Tab */}
                        <TabsContent value="visited" className="space-y-6">
                            <h2 className="text-2xl font-bold text-foreground">
                                Places I've Visited ({visitedDestinations.length})
                            </h2>

                            {visitedDestinations.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {visitedDestinations.map((destination) => (
                                        <DestinationCard key={destination.id} destination={destination} />
                                    ))}
                                </div>
                            ) : (
                                <Card className="p-12 text-center">
                                    <MapPin className="w-16 h-16 text-muted mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-foreground mb-2">
                                        No destinations visited yet
                                    </h3>
                                    <p className="text-muted mb-6">
                                        Start exploring Bangladesh to build your travel portfolio
                                    </p>
                                    <Link href="/destinations">
                                        <Button>Explore Destinations</Button>
                                    </Link>
                                </Card>
                            )}
                        </TabsContent>

                        {/* Achievements Tab */}
                        <TabsContent value="achievements" className="space-y-6">
                            <h2 className="text-2xl font-bold text-foreground mb-6">
                                Achievements & Badges
                            </h2>
                            <AchievementGrid
                                achievements={achievements}
                                allAchievements={allAchievements}
                            />
                        </TabsContent>

                        {/* Activity Tab */}
                        <TabsContent value="activity" className="space-y-6">
                            <h2 className="text-2xl font-bold text-foreground mb-6">
                                Recent Activity
                            </h2>
                            <Card className="p-8 text-center">
                                <p className="text-muted">Activity timeline coming soon...</p>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </div>
    );
}
