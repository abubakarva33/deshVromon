import Link from 'next/link';
import { Plus, TrendingUp, Clock, Grid3x3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StoryGrid } from '@/components/community/StoryCard';
import { getFeaturedStories, getRecentStories } from '@/data/stories';
import SearchBar from '@/components/shared/SearchBar';

export const metadata = {
    title: 'Travel Stories | DeshVromon',
    description: 'Share and discover travel experiences from across Bangladesh',
};

export default function CommunityPage() {
    const featuredStories = getFeaturedStories(6);
    const recentStories = getRecentStories(12);

    return (
        <div className="min-h-screen bg-primary">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-purple-900/20 pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                                Travel Stories
                            </span>
                        </h1>
                        <p className="text-xl text-secondary mb-8">
                            Discover inspiring travel experiences, share your adventures, and connect with fellow travelers
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/stories/create">
                                <Button size="lg" className="group">
                                    <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                                    Share Your Story
                                </Button>
                            </Link>
                            <SearchBar
                                placeholder="Search stories, destinations, authors..."
                                showFilters={false}
                            />
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                        <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-border">
                            <div className="text-3xl font-bold text-orange-600">2.5K+</div>
                            <div className="text-sm text-muted">Stories</div>
                        </div>
                        <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-border">
                            <div className="text-3xl font-bold text-pink-600">15K+</div>
                            <div className="text-sm text-muted">Photos</div>
                        </div>
                        <div className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-border">
                            <div className="text-3xl font-bold text-purple-600">5K+</div>
                            <div className="text-sm text-muted">Travelers</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <Tabs defaultValue="featured" className="w-full">
                        <div className="flex items-center justify-between mb-8">
                            <TabsList>
                                <TabsTrigger value="featured" className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    Featured
                                </TabsTrigger>
                                <TabsTrigger value="recent" className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Recent
                                </TabsTrigger>
                                <TabsTrigger value="following" className="flex items-center gap-2">
                                    <Grid3x3 className="w-4 h-4" />
                                    Following
                                </TabsTrigger>
                            </TabsList>

                            <Link href="/stories/create">
                                <Button variant="outline" className="hidden md:flex">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Story
                                </Button>
                            </Link>
                        </div>

                        {/* Featured Stories */}
                        <TabsContent value="featured" className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-6">
                                    ✨ Featured This Week
                                </h2>
                                <StoryGrid stories={featuredStories} columns={3} />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-6">
                                    Recent Adventures
                                </h2>
                                <StoryGrid stories={recentStories.slice(0, 6)} columns={3} />
                            </div>
                        </TabsContent>

                        {/* Recent Stories */}
                        <TabsContent value="recent">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-foreground">
                                    Latest Stories
                                </h2>
                                <select className="px-4 py-2 rounded-lg border border-border bg-secondary text-foreground text-sm">
                                    <option>All Destinations</option>
                                    <option>Cox's Bazar</option>
                                    <option>Sylhet</option>
                                    <option>Bandarban</option>
                                    <option>Sundarbans</option>
                                </select>
                            </div>
                            <StoryGrid stories={recentStories} columns={3} />
                        </TabsContent>

                        {/* Following */}
                        <TabsContent value="following">
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">👥</div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    Follow Travelers
                                </h3>
                                <p className="text-muted mb-6">
                                    Start following other travelers to see their stories here
                                </p>
                                <Button>Discover Travelers</Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-secondary">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Share Your Travel Experience
                    </h2>
                    <p className="text-lg text-secondary mb-8">
                        Inspire fellow travelers with your stories, photos, and tips from your adventures across Bangladesh
                    </p>
                    <Link href="/stories/create">
                        <Button size="lg" className="text-lg px-8">
                            <Plus className="w-5 h-5 mr-2" />
                            Create Your First Story
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
