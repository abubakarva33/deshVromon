import ScoreSimulator from '@/components/score/ScoreSimulator';
import ScoreDisplay, { LevelBadge } from '@/components/score/ScoreDisplay';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Award, Target, Star } from 'lucide-react';
import { currentUser, getTravelerLevel } from '@/data/users';
import { getAchievements } from '@/lib/travelScore';

export const metadata = {
    title: 'Travel Score System | DeshVromon',
    description: 'Build your travel score, level up, and unlock achievements',
};

export default function TravelScorePage() {
    // For demo, we'll use current user or show visitor mode
    const user = currentUser;
    const level = getTravelerLevel(user?.travelScore || 0);
    const achievements = user ? getAchievements(user) : [];

    return (
        <div className="min-h-screen bg-primary">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link href="/">
                        <Button variant="ghost" className="mb-6 group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Button>
                    </Link>

                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                                Travel Score System
                            </span>
                        </h1>
                        <p className="text-xl text-secondary mb-8">
                            Track your journey, level up as you explore, and unlock achievements along the way
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 px-4 bg-secondary">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                        How Travel Score Works
                    </h2>

                    <div className="grid md:grid-cols-4 gap-6 mb-12">
                        <div className="p-6 rounded-xl border border-border bg-primary text-center">
                            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-lg text-foreground mb-2">Visit Places</h3>
                            <p className="text-sm text-muted mb-2">
                                Explore destinations across Bangladesh
                            </p>
                            <div className="text-2xl font-bold text-blue-600">+10 pts</div>
                            <p className="text-xs text-muted">per destination</p>
                        </div>

                        <div className="p-6 rounded-xl border border-border bg-primary text-center">
                            <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                                <Target className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="font-bold text-lg text-foreground mb-2">Create Plans</h3>
                            <p className="text-sm text-muted mb-2">
                                Build and share travel itineraries
                            </p>
                            <div className="text-2xl font-bold text-green-600">+15 pts</div>
                            <p className="text-xs text-muted">per plan</p>
                        </div>

                        <div className="p-6 rounded-xl border border-border bg-primary text-center">
                            <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                                <Award className="w-7 h-7 text-orange-600" />
                            </div>
                            <h3 className="font-bold text-lg text-foreground mb-2">Share Stories</h3>
                            <p className="text-sm text-muted mb-2">
                                Post photos and travel experiences
                            </p>
                            <div className="text-2xl font-bold text-orange-600">+12 pts</div>
                            <p className="text-xs text-muted">per story</p>
                        </div>

                        <div className="p-6 rounded-xl border border-border bg-primary text-center">
                            <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                                <Star className="w-7 h-7 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-lg text-foreground mb-2">Write Reviews</h3>
                            <p className="text-sm text-muted mb-2">
                                Help others with your feedback
                            </p>
                            <div className="text-2xl font-bold text-purple-600">+5 pts</div>
                            <p className="text-xs text-muted">per review</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Score Simulator */}
            <section className="py-16 px-4 bg-primary">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-3">
                            Try the Score Simulator
                        </h2>
                        <p className="text-muted">
                            See what your travel score could be based on your activities
                        </p>
                    </div>

                    <ScoreSimulator />
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 px-4 bg-secondary">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                        Why Build Your Score?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-xl border border-border bg-primary">
                            <div className="text-4xl mb-3">🏆</div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Unlock Achievements</h3>
                            <p className="text-muted">
                                Earn badges and achievements as you explore more destinations and contribute to the community
                            </p>
                        </div>

                        <div className="p-6 rounded-xl border border-border bg-primary">
                            <div className="text-4xl mb-3">📈</div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Track Progress</h3>
                            <p className="text-muted">
                                Visualize your travel journey and see how you're growing as an explorer
                            </p>
                        </div>

                        <div className="p-6 rounded-xl border border-border bg-primary">
                            <div className="text-4xl mb-3">🌟</div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Gain Recognition</h3>
                            <p className="text-muted">
                                Higher scores give you credibility and make your recommendations more valuable
                            </p>
                        </div>

                        <div className="p-6 rounded-xl border border-border bg-primary">
                            <div className="text-4xl mb-3">🎯</div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Set Goals</h3>
                            <p className="text-muted">
                                Challenge yourself to reach the next level and explore new places
                            </p>
                        </div>

                        <div className="p-6 rounded-xl border border-border bg-primary">
                            <div className="text-4xl mb-3">🤝</div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Join Community</h3>
                            <p className="text-muted">
                                Connect with fellow travelers and share your experiences
                            </p>
                        </div>

                        <div className="p-6 rounded-xl border border-border bg-primary">
                            <div className="text-4xl mb-3">💡</div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Get Insights</h3>
                            <p className="text-muted">
                                Receive personalized recommendations based on your travel patterns
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Create your account and start building your travel score today!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="text-lg px-8">
                            Sign Up Free
                        </Button>
                        <Link href="/destinations">
                            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 hover:bg-white/20 border-white/30 text-white">
                                Start Exploring
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
