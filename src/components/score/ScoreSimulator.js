'use client';

import { useState, useMemo } from 'react';
import { TrendingUp, Award, MapPin, FileText, Image as ImageIcon, MessageSquare, CheckCircle2, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { getTravelerLevel } from '@/lib/travelScore';
import destinations from '@/data/destinations';
import { divisions, districts } from '@/data/districts';

/**
 * ScoreSimulator Component - Enhanced with Filters
 * Interactive tool where visitors select actual destinations they've visited
 */
export default function ScoreSimulator() {
    const [selectedLevel, setSelectedLevel] = useState('newbie');
    const [selectedDestinations, setSelectedDestinations] = useState([]);
    const [otherInputs, setOtherInputs] = useState({
        plans: 0,
        stories: 0,
        reviews: 0,
    });
    const [simulated, setSimulated] = useState(false);

    // Filter states
    const [filters, setFilters] = useState({
        division: 'all',
        district: 'all',
        type: 'all',
        sortBy: 'hype', // 'hype', 'name', 'rating'
    });
    const [showFilters, setShowFilters] = useState(false);

    // Apply filters and sorting
    const filteredAndSortedDestinations = useMemo(() => {
        let filtered = [...destinations];

        // Filter by division
        if (filters.division !== 'all') {
            const divisionDistricts = districts
                .filter(d => d.division === filters.division)
                .map(d => d.slug);
            filtered = filtered.filter(dest => divisionDistricts.includes(dest.district));
        }

        // Filter by district
        if (filters.district !== 'all') {
            filtered = filtered.filter(dest => dest.district === filters.district);
        }

        // Filter by type
        if (filters.type !== 'all') {
            filtered = filtered.filter(dest => dest.type === filters.type);
        }

        // Sort
        switch (filters.sortBy) {
            case 'hype':
                filtered.sort((a, b) => (b.hypePercentage || 0) - (a.hypePercentage || 0));
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating':
                filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
                break;
            default:
                break;
        }

        // Limit by level
        const limits = {
            newbie: 10,
            explorer: 20,
            wanderer: 30,
            adventurer: 40,
            expert: filtered.length,
        };

        return filtered.slice(0, limits[selectedLevel]).map(d => ({ ...d, points: 10 }));
    }, [filters, selectedLevel]);

    const toggleDestination = (destId) => {
        setSelectedDestinations(prev =>
            prev.includes(destId)
                ? prev.filter(id => id !== destId)
                : [...prev, destId]
        );
        setSimulated(false);
    };

    const handleOtherInputChange = (field, value) => {
        const numValue = Math.max(0, parseInt(value) || 0);
        setOtherInputs(prev => ({ ...prev, [field]: numValue }));
        setSimulated(false);
    };

    const calculateScore = () => {
        const destinationPoints = selectedDestinations.length * 10;
        const planPoints = otherInputs.plans * 15;
        const storyPoints = otherInputs.stories * 12;
        const reviewPoints = otherInputs.reviews * 5;

        return {
            total: destinationPoints + planPoints + storyPoints + reviewPoints,
            breakdown: {
                destinations: destinationPoints,
                plans: planPoints,
                stories: storyPoints,
                reviews: reviewPoints,
            },
        };
    };

    const handleSimulate = () => {
        setSimulated(true);
    };

    const handleReset = () => {
        setSelectedDestinations([]);
        setOtherInputs({ plans: 0, stories: 0, reviews: 0 });
        setFilters({ division: 'all', district: 'all', type: 'all', sortBy: 'hype' });
        setSimulated(false);
    };

    const result = calculateScore();
    const level = getTravelerLevel(result.total);

    // Calculate progress to next level
    const getNextMilestone = (score) => {
        if (score < 100) return { next: 100, current: 0, name: 'Explorer' };
        if (score < 300) return { next: 300, current: 100, name: 'Wanderer' };
        if (score < 600) return { next: 600, current: 300, name: 'Adventurer' };
        if (score < 1000) return { next: 1000, current: 600, name: 'Expert' };
        return { reached: true };
    };

    const milestone = getNextMilestone(result.total);
    const progress = milestone.reached
        ? 100
        : ((result.total - milestone.current) / (milestone.next - milestone.current)) * 100;

    // Get district options based on selected division
    const districtOptions = useMemo(() => {
        if (filters.division === 'all') return districts;
        return districts.filter(d => d.division === filters.division);
    }, [filters.division]);

    // Get unique types
    const destinationTypes = useMemo(() => {
        return [...new Set(destinations.map(d => d.type))];
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Destination Selection */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Level Selector */}
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-foreground mb-3">Select Your Travel Level</h3>
                        <p className="text-sm text-muted mb-4">Choose your estimated travel experience</p>

                        <div className="grid grid-cols-5 gap-2">
                            {[
                                { key: 'newbie', name: 'Newbie', icon: '🌱', count: 10 },
                                { key: 'explorer', name: 'Explorer', icon: '🎒', count: 20 },
                                { key: 'wanderer', name: 'Wanderer', icon: '🧭', count: 30 },
                                { key: 'adventurer', name: 'Adventurer', icon: '⛰️', count: 40 },
                                { key: 'expert', name: 'Expert', icon: '🏆', count: 'All' },
                            ].map((lvl) => (
                                <button
                                    key={lvl.key}
                                    onClick={() => {
                                        setSelectedLevel(lvl.key);
                                        setSimulated(false);
                                    }}
                                    className={`p-3 rounded-lg border text-center transition-all ${selectedLevel === lvl.key
                                            ? 'border-accent-primary bg-accent-primary/10'
                                            : 'border-border bg-secondary hover:bg-hover'
                                        }`}
                                >
                                    <div className="text-2xl mb-1">{lvl.icon}</div>
                                    <div className="text-xs font-semibold text-foreground">{lvl.name}</div>
                                    <div className="text-xs text-muted">{lvl.count}</div>
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Advanced Filters */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-foreground">Filter & Sort</h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <SlidersHorizontal className="w-4 h-4 mr-2" />
                                {showFilters ? 'Hide' : 'Show'} Filters
                            </Button>
                        </div>

                        {showFilters && (
                            <div className="grid sm:grid-cols-2 gap-4">
                                {/* Division Filter */}
                                <div>
                                    <Label className="text-sm mb-2 block">Division</Label>
                                    <Select
                                        value={filters.division}
                                        onValueChange={(value) => {
                                            setFilters(prev => ({ ...prev, division: value, district: 'all' }));
                                            setSimulated(false);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Divisions" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Divisions</SelectItem>
                                            {divisions.map((div) => (
                                                <SelectItem key={div.id} value={div.id}>
                                                    {div.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* District Filter */}
                                <div>
                                    <Label className="text-sm mb-2 block">District</Label>
                                    <Select
                                        value={filters.district}
                                        onValueChange={(value) => {
                                            setFilters(prev => ({ ...prev, district: value }));
                                            setSimulated(false);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Districts" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Districts</SelectItem>
                                            {districtOptions.map((dist) => (
                                                <SelectItem key={dist.id} value={dist.slug}>
                                                    {dist.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Type Filter */}
                                <div>
                                    <Label className="text-sm mb-2 block">Type</Label>
                                    <Select
                                        value={filters.type}
                                        onValueChange={(value) => {
                                            setFilters(prev => ({ ...prev, type: value }));
                                            setSimulated(false);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Types" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Types</SelectItem>
                                            {destinationTypes.map((type) => (
                                                <SelectItem key={type} value={type} className="capitalize">
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Sort By */}
                                <div>
                                    <Label className="text-sm mb-2 block">Sort By</Label>
                                    <Select
                                        value={filters.sortBy}
                                        onValueChange={(value) => {
                                            setFilters(prev => ({ ...prev, sortBy: value }));
                                            setSimulated(false);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hype">Popularity (Hype)</SelectItem>
                                            <SelectItem value="name">Name (A-Z)</SelectItem>
                                            <SelectItem value="rating">Rating</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* Destination Selection */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-foreground">
                                Select Visited Destinations
                            </h3>
                            <span className="text-sm text-muted">
                                {selectedDestinations.length} / {filteredAndSortedDestinations.length} selected
                            </span>
                        </div>

                        {filteredAndSortedDestinations.length === 0 ? (
                            <div className="text-center py-12">
                                <Filter className="w-12 h-12 text-muted mx-auto mb-3" />
                                <p className="text-muted">No destinations match your filters</p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setFilters({ division: 'all', district: 'all', type: 'all', sortBy: 'hype' })}
                                    className="mt-3"
                                >
                                    Reset Filters
                                </Button>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                                {filteredAndSortedDestinations.map((dest) => {
                                    const isSelected = selectedDestinations.includes(dest.id);
                                    return (
                                        <div
                                            key={dest.id}
                                            onClick={() => toggleDestination(dest.id)}
                                            className={`p-3 rounded-lg border cursor-pointer transition-all ${isSelected
                                                    ? 'border-accent-primary bg-accent-primary/10'
                                                    : 'border-border bg-secondary hover:bg-hover'
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0 mt-0.5">
                                                    {isSelected ? (
                                                        <CheckCircle2 className="w-5 h-5 text-accent-primary" />
                                                    ) : (
                                                        <div className="w-5 h-5 rounded border-2 border-border" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-sm text-foreground mb-0.5">
                                                        {dest.name}
                                                    </h4>
                                                    <p className="text-xs text-muted flex items-center gap-1 mb-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {dest.district}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <span className="px-1.5 py-0.5 rounded bg-hover capitalize">
                                                            {dest.type}
                                                        </span>
                                                        <span className="text-muted">
                                                            {dest.hypePercentage}% 🔥
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-xs font-bold text-accent-primary">
                                                    +{dest.points}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </Card>

                    {/* Other Activities */}
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-foreground mb-4">Other Activities</h3>

                        <div className="grid sm:grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="plans" className="flex items-center gap-2 mb-2">
                                    <FileText className="w-4 h-4 text-green-600" />
                                    <span>Plans Created</span>
                                </Label>
                                <Input
                                    id="plans"
                                    type="number"
                                    min="0"
                                    value={otherInputs.plans}
                                    onChange={(e) => handleOtherInputChange('plans', e.target.value)}
                                    className="text-center"
                                />
                                <p className="text-xs text-muted mt-1 text-center">+15 pts each</p>
                            </div>

                            <div>
                                <Label htmlFor="stories" className="flex items-center gap-2 mb-2">
                                    <ImageIcon className="w-4 h-4 text-orange-600" />
                                    <span>Stories Shared</span>
                                </Label>
                                <Input
                                    id="stories"
                                    type="number"
                                    min="0"
                                    value={otherInputs.stories}
                                    onChange={(e) => handleOtherInputChange('stories', e.target.value)}
                                    className="text-center"
                                />
                                <p className="text-xs text-muted mt-1 text-center">+12 pts each</p>
                            </div>

                            <div>
                                <Label htmlFor="reviews" className="flex items-center gap-2 mb-2">
                                    <MessageSquare className="w-4 h-4 text-purple-600" />
                                    <span>Reviews Written</span>
                                </Label>
                                <Input
                                    id="reviews"
                                    type="number"
                                    min="0"
                                    value={otherInputs.reviews}
                                    onChange={(e) => handleOtherInputChange('reviews', e.target.value)}
                                    className="text-center"
                                />
                                <p className="text-xs text-muted mt-1 text-center">+5 pts each</p>
                            </div>
                        </div>
                    </Card>

                    <div className="flex gap-3">
                        <Button onClick={handleSimulate} className="flex-1" size="lg">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Calculate My Score
                        </Button>
                        <Button onClick={handleReset} variant="outline" size="lg">
                            Reset All
                        </Button>
                    </div>
                </div>

                {/* Right Column - Results */}
                <div className="space-y-6">
                    <Card className={`p-6 ${simulated ? 'animate-scale-in' : ''}`}>
                        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-accent-primary" />
                            Your Score
                        </h3>

                        {simulated ? (
                            <div className="space-y-6">
                                {/* Score Display */}
                                <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800">
                                    <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                                        {result.total}
                                    </div>
                                    <div className="text-sm text-muted mb-3">Total Travel Score</div>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-3xl">{level.icon}</span>
                                        <span className="text-xl font-bold text-foreground">{level.name}</span>
                                    </div>
                                </div>

                                {/* Progress to Next Level */}
                                {!milestone.reached && (
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-secondary">
                                                Progress to {milestone.name}
                                            </span>
                                            <span className="text-sm font-bold text-foreground">
                                                {Math.round(progress)}%
                                            </span>
                                        </div>
                                        <Progress value={progress} className="h-2" />
                                        <p className="text-xs text-muted mt-2">
                                            {milestone.next - result.total} points needed
                                        </p>
                                    </div>
                                )}

                                {/* Score Breakdown */}
                                <div>
                                    <h4 className="text-sm font-semibold text-foreground mb-3">Breakdown</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted flex items-center gap-2">
                                                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                                                Destinations ({selectedDestinations.length})
                                            </span>
                                            <span className="font-semibold text-foreground">
                                                +{result.breakdown.destinations}
                                            </span>
                                        </div>
                                        {result.breakdown.plans > 0 && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted flex items-center gap-2">
                                                    <FileText className="w-3.5 h-3.5 text-green-600" />
                                                    Plans ({otherInputs.plans})
                                                </span>
                                                <span className="font-semibold text-foreground">
                                                    +{result.breakdown.plans}
                                                </span>
                                            </div>
                                        )}
                                        {result.breakdown.stories > 0 && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted flex items-center gap-2">
                                                    <ImageIcon className="w-3.5 h-3.5 text-orange-600" />
                                                    Stories ({otherInputs.stories})
                                                </span>
                                                <span className="font-semibold text-foreground">
                                                    +{result.breakdown.stories}
                                                </span>
                                            </div>
                                        )}
                                        {result.breakdown.reviews > 0 && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted flex items-center gap-2">
                                                    <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                                                    Reviews ({otherInputs.reviews})
                                                </span>
                                                <span className="font-semibold text-foreground">
                                                    +{result.breakdown.reviews}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="pt-4 border-t border-border">
                                    <p className="text-sm text-center text-muted mb-3">
                                        Ready to build your real score?
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
                                <p className="text-muted text-sm">
                                    Select destinations and click "Calculate My Score"
                                </p>
                            </div>
                        )}
                    </Card>

                    {/* Selected Summary */}
                    {selectedDestinations.length > 0 && (
                        <Card className="p-4">
                            <h4 className="text-sm font-semibold text-foreground mb-2">
                                Selected Destinations
                            </h4>
                            <div className="space-y-1.5 max-h-40 overflow-y-auto">
                                {selectedDestinations.map((destId) => {
                                    const dest = filteredAndSortedDestinations.find(d => d.id === destId) ||
                                        destinations.find(d => d.id === destId);
                                    return (
                                        <div key={destId} className="flex items-center justify-between text-xs">
                                            <span className="text-muted truncate">{dest?.name}</span>
                                            <span className="text-accent-primary font-semibold">+10</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    )}
                </div>
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
                    ].map((lvl) => (
                        <div key={lvl.name} className="text-center p-3 rounded-lg bg-secondary">
                            <div className="text-3xl mb-1">{lvl.icon}</div>
                            <div className={`font-bold ${lvl.color} mb-1`}>{lvl.name}</div>
                            <div className="text-xs text-muted">{lvl.range} pts</div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
