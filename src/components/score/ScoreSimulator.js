'use client';

import { useState } from 'react';
import { TrendingUp, Award, MapPin, FileText, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { simulateTravelScore, getTravelerLevel } from '@/lib/travelScore';

/**
 * ScoreSimulator Component
 * Interactive tool for visitors to simulate their potential travel score
 */
export default function ScoreSimulator() {
    const [inputs, setInputs] = useState({
        destinations: 0,
        plans: 0,
        stories: 0,
        reviews: 0,
    });

    const [simulated, setSimulated] = useState(false);
    const result = simulateTravelScore(inputs);

    const handleChange = (field, value) => {
        const numValue = Math.max(0, parseInt(value) || 0);
        setInputs(prev => ({ ...prev, [field]: numValue }));
        setSimulated(false);
    };

    const handleSimulate = () => {
        setSimulated(true);
    };

    const handleReset = () => {
        setInputs({ destinations: 0, plans: 0, stories: 0, reviews: 0 });
        setSimulated(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Input Section */}
                <Card className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-accent-primary" />
                        Simulate Your Score
                    </h3>
                    <p className="text-sm text-muted mb-6">
                        Enter your anticipated travel activities to see your potential score and level
                    </p>

                    <div className="space-y-4">
                        {/* Destinations */}
                        <div>
                            <Label htmlFor="destinations" className="flex items-center gap-2 mb-2">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                <span>Destinations Visited</span>
                                <span className="ml-auto text-xs text-muted">+10 pts each</span>
                            </Label>
                            <Input
                                id="destinations"
                                type="number"
                                min="0"
                                value={inputs.destinations}
                                onChange={(e) => handleChange('destinations', e.target.value)}
                                placeholder="0"
                                className="text-center text-lg font-semibold"
                            />
                        </div>

                        {/* Plans */}
                        <div>
                            <Label htmlFor="plans" className="flex items-center gap-2 mb-2">
                                <FileText className="w-4 h-4 text-green-600" />
                                <span>Travel Plans Created</span>
                                <span className="ml-auto text-xs text-muted">+15 pts each</span>
                            </Label>
                            <Input
                                id="plans"
                                type="number"
                                min="0"
                                value={inputs.plans}
                                onChange={(e) => handleChange('plans', e.target.value)}
                                placeholder="0"
                                className="text-center text-lg font-semibold"
                            />
                        </div>

                        {/* Stories */}
                        <div>
                            <Label htmlFor="stories" className="flex items-center gap-2 mb-2">
                                <ImageIcon className="w-4 h-4 text-orange-600" />
                                <span>Stories Shared</span>
                                <span className="ml-auto text-xs text-muted">+12 pts each</span>
                            </Label>
                            <Input
                                id="stories"
                                type="number"
                                min="0"
                                value={inputs.stories}
                                onChange={(e) => handleChange('stories', e.target.value)}
                                placeholder="0"
                                className="text-center text-lg font-semibold"
                            />
                        </div>

                        {/* Reviews */}
                        <div>
                            <Label htmlFor="reviews" className="flex items-center gap-2 mb-2">
                                <MessageSquare className="w-4 h-4 text-purple-600" />
                                <span>Reviews Written</span>
                                <span className="ml-auto text-xs text-muted">+5 pts each</span>
                            </Label>
                            <Input
                                id="reviews"
                                type="number"
                                min="0"
                                value={inputs.reviews}
                                onChange={(e) => handleChange('reviews', e.target.value)}
                                placeholder="0"
                                className="text-center text-lg font-semibold"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button onClick={handleSimulate} className="flex-1" size="lg">
                                Calculate Score
                            </Button>
                            <Button onClick={handleReset} variant="outline" size="lg">
                                Reset
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Results Section */}
                <Card className={`p-6 ${simulated ? 'animate-scale-in' : ''}`}>
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-accent-primary" />
                        Your Potential Score
                    </h3>

                    {simulated ? (
                        <div className="space-y-6">
                            {/* Score Display */}
                            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800">
                                <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                                    {result.score}
                                </div>
                                <div className="text-sm text-muted mb-3">Total Travel Score</div>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-2xl">{result.level.icon}</span>
                                    <span className="text-lg font-bold text-foreground">{result.level.name}</span>
                                </div>
                            </div>

                            {/* Progress to Next Level */}
                            {result.milestone && !result.milestone.reached && (
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-secondary">Progress to Next Level</span>
                                        <span className="text-sm font-bold text-foreground">
                                            {Math.round(result.milestone.progress)}%
                                        </span>
                                    </div>
                                    <Progress value={result.milestone.progress} className="h-2" />
                                    <p className="text-xs text-muted mt-2">
                                        {result.milestone.pointsToNext} points to reach {result.milestone.nextThreshold}
                                    </p>
                                </div>
                            )}

                            {/* Score Breakdown */}
                            <div>
                                <h4 className="text-sm font-semibold text-foreground mb-3">Score Breakdown</h4>
                                <div className="space-y-2">
                                    {result.breakdown.destinations > 0 && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted flex items-center gap-2">
                                                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                                                Destinations ({inputs.destinations})
                                            </span>
                                            <span className="font-semibold text-foreground">+{result.breakdown.destinations}</span>
                                        </div>
                                    )}
                                    {result.breakdown.plans > 0 && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted flex items-center gap-2">
                                                <FileText className="w-3.5 h-3.5 text-green-600" />
                                                Plans ({inputs.plans})
                                            </span>
                                            <span className="font-semibold text-foreground">+{result.breakdown.plans}</span>
                                        </div>
                                    )}
                                    {result.breakdown.stories > 0 && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted flex items-center gap-2">
                                                <ImageIcon className="w-3.5 h-3.5 text-orange-600" />
                                                Stories ({inputs.stories})
                                            </span>
                                            <span className="font-semibold text-foreground">+{result.breakdown.stories}</span>
                                        </div>
                                    )}
                                    {result.breakdown.reviews > 0 && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted flex items-center gap-2">
                                                <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                                                Reviews ({inputs.reviews})
                                            </span>
                                            <span className="font-semibold text-foreground">+{result.breakdown.reviews}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="pt-4 border-t border-border">
                                <p className="text-sm text-center text-muted mb-3">
                                    Ready to start building your real score?
                                </p>
                                <Button className="w-full" size="lg">
                                    Create Account
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                                <TrendingUp className="w-8 h-8 text-muted" />
                            </div>
                            <p className="text-muted">
                                Enter your activities and click "Calculate Score" to see your potential travel score
                            </p>
                        </div>
                    )}
                </Card>
            </div>

            {/* All Levels Reference */}
            <Card className="p-6 mt-8">
                <h3 className="text-lg font-bold text-foreground mb-4">Traveler Levels</h3>
                <div className="grid sm:grid-cols-5 gap-4">
                    {[
                        { name: 'Newbie', icon: '🌱', range: '0-99', color: 'text-gray-600' },
                        { name: 'Explorer', icon: '🎒', range: '100-299', color: 'text-blue-600' },
                        { name: 'Wanderer', icon: '🧭', range: '300-599', color: 'text-green-600' },
                        { name: 'Adventurer', icon: '⛰️', range: '600-999', color: 'text-orange-600' },
                        { name: 'Expert', icon: '🏆', range: '1000+', color: 'text-purple-600' },
                    ].map((level) => (
                        <div key={level.name} className="text-center p-3 rounded-lg bg-secondary">
                            <div className="text-3xl mb-1">{level.icon}</div>
                            <div className={`font-bold ${level.color} mb-1`}>{level.name}</div>
                            <div className="text-xs text-muted">{level.range} pts</div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
