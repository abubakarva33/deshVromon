import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, Award, TrendingUp, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { users, getTravelerLevel } from '@/data/users';
import { stories, getStoriesByAuthor } from '@/data/stories';
import { plans } from '@/data/plans';
import { StoryGrid } from '@/components/community/StoryCard';
import DestinationCard from '@/components/destinations/DestinationCard';
import PlanCard from '@/components/plans/PlanCard';
import ScoreDisplay, { LevelBadge } from '@/components/score/ScoreDisplay';
import { destinations } from '@/data/destinations';

export async function generateStaticParams() {
    return users.map((user) => ({
        id: user.id,
    }));
}

export async function generateMetadata({ params }) {
    const user = users.find(u => u.id === params.id);

    if (!user) {
        return {
            title: 'User Not Found | DeshVromon',
        };
    }

    return {
        title: `${user.name} | DeshVromon`,
        description: user.bio || `Travel profile of ${user.name}`,
    };
}

export default function ProfilePage({ params }) {
    const user = users.find(u => u.id === params.id);

    if (!user) {
        notFound();
    }

    const userStories = getStoriesByAuthor(user.id);
    const userPlans = plans.filter(p => p.creator === user.id);
    const visitedDestinations = destinations.filter(d =>
        user.visitedDestinations?.includes(d.id)
    );

    const userLevel = getTravelerLevel(user.travelScore);

    const stats = {
        stories: userStories.length,
        plans: userPlans.length,
        visited: visitedDestinations.length,
        followers: Math.floor(Math.random() * 500) + 100,
        following: Math.floor(Math.random() * 200) + 50,
    };

    const isOwnProfile = false; // TODO: Check if current user

    return (
        <div className="min-h-screen bg-primary">
            {/* Cover Photo */}
            <div className="relative h-64 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500">
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Profile Info */}
            <div className="max-w-6xl mx-auto px-4 -mt-24 relative z-10">
                <div className="bg-secondary rounded-xl border border-border p-6 mb-6">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-secondary bg-muted">
                                {user.avatar ? (
                                    <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-foreground font-bold text-4xl">
                                        {user.name[0]}
                                    </div>
                                )}
                            </div>
                            <div className="absolute -bottom-2 -right-2">
                                <LevelBadge level={userLevel} size="lg" />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h1 className="text-3xl font-bold text-foreground mb-1">
                                        {user.name}
                                    </h1>
                                    <p className="text-muted flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        {user.location || 'Bangladesh'}
                                    </p>
                                </div>
                                {isOwnProfile ? (
                                    <Link href="/dashboard">
                                        <Button variant="outline">
                                            <Settings className="w-4 h-4 mr-2" />
                                            Edit Profile
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button>
                                        <Users className="w-4 h-4 mr-2" />
                                        Follow
                                    </Button>
                                )}
                            </div>

                            {user.bio && (
                                <p className="text-secondary mb-4 max-w-2xl">{user.bio}</p>
                            )}

                            {/* Stats Row */}
                            <div className="flex items-center gap-6 text-sm">
                                <div>
                                    <span className="font-bold text-foreground">{stats.followers}</span>
                                    <span className="text-muted ml-1">Followers</span>
                                </div>
                                <div>
                                    <span className="font-bold text-foreground">{stats.following}</span>
                                    <span className="text-muted ml-1">Following</span>
                                </div>
                                <div>
                                    <span className="font-bold text-foreground">{stats.stories}</span>
                                    <span className="text-muted ml-1">Stories</span>
                                </div>
                                <div>
                                    <span className="font-bold text-foreground">{stats.plans}</span>
                                    <span className="text-muted ml-1">Plans</span>
                                </div>
                                <div>
                                    <span className="font-bold text-foreground">{stats.visited}</span>
                                    <span className="text-muted ml-1">Visited</span>
                                </div>
                            </div>
                        </div>

                        {/* Score Display */}
                        <div>
                            <ScoreDisplay score={user.travelScore} level={userLevel} size="md" />
                        </div>
                    </div>
                </div>

                {/* Content Tabs */}
                <Tabs defaultValue="stories" className="mb-12">
                    <TabsList className="mb-6">
                        <TabsTrigger value="stories">
                            Stories ({stats.stories})
                        </TabsTrigger>
                        <TabsTrigger value="plans">
                            Plans ({stats.plans})
                        </TabsTrigger>
                        <TabsTrigger value="visited">
                            Visited ({stats.visited})
                        </TabsTrigger>
                        <TabsTrigger value="about">
                            About
                        </TabsTrigger>
                    </TabsList>

                    {/* Stories Tab */}
                    <TabsContent value="stories">
                        {userStories.length > 0 ? (
                            <StoryGrid stories={userStories} columns={3} />
                        ) : (
                            <div className="text-center py-12 bg-secondary rounded-xl border border-border">
                                <p className="text-muted">No stories yet</p>
                            </div>
                        )}
                    </TabsContent>

                    {/* Plans Tab */}
                    <TabsContent value="plans">
                        {userPlans.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {userPlans.map(plan => (
                                    <PlanCard key={plan.id} plan={plan} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-secondary rounded-xl border border-border">
                                <p className="text-muted">No plans yet</p>
                            </div>
                        )}
                    </TabsContent>

                    {/* Visited Tab */}
                    <TabsContent value="visited">
                        {visitedDestinations.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {visitedDestinations.map(dest => (
                                    <DestinationCard key={dest.id} destination={dest} variant="compact" />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-secondary rounded-xl border border-border">
                                <p className="text-muted">No destinations visited yet</p>
                            </div>
                        )}
                    </TabsContent>

                    {/* About Tab */}
                    <TabsContent value="about">
                        <div className="bg-secondary rounded-xl border border-border p-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-3">About</h3>
                                <p className="text-secondary">
                                    {user.bio || 'Travel enthusiast exploring Bangladesh'}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-3">
                                    <Award className="w-5 h-5 inline mr-2" />
                                    Travel Stats
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="p-4 rounded-lg bg-primary">
                                        <div className="text-2xl font-bold text-orange-600">{stats.visited}</div>
                                        <div className="text-sm text-muted">Places Visited</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-primary">
                                        <div className="text-2xl font-bold text-blue-600">{stats.plans}</div>
                                        <div className="text-sm text-muted">Plans Created</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-primary">
                                        <div className="text-2xl font-bold text-pink-600">{stats.stories}</div>
                                        <div className="text-sm text-muted">Stories Shared</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-primary">
                                        <div className="text-2xl font-bold text-purple-600">{user.travelScore}</div>
                                        <div className="text-sm text-muted">Travel Score</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-3">
                                    <Calendar className="w-5 h-5 inline mr-2" />
                                    Member Since
                                </h3>
                                <p className="text-secondary">
                                    {new Date(user.joinDate || '2023-01-01').toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                    })}
                                </p>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
