'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, MapPin, Calendar, DollarSign, Save, Eye, Share2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import destinations from '@/data/destinations';
import { districts } from '@/data/districts';

export default function PlanBuilderPage() {
    const [plan, setPlan] = useState({
        title: '',
        description: '',
        duration: 1,
        difficulty: 'easy',
        selectedDestinations: [],
        itinerary: [{ day: 1, activities: [] }],
        estimatedBudget: { min: 0, max: 0 },
        visibility: 'public',
    });

    const [currentDay, setCurrentDay] = useState(1);

    const addDestination = (destinationId) => {
        const destination = destinations.find(d => d.id === destinationId);
        if (destination && !plan.selectedDestinations.find(d => d.id === destinationId)) {
            setPlan(prev => ({
                ...prev,
                selectedDestinations: [...prev.selectedDestinations, destination],
            }));
        }
    };

    const removeDestination = (destinationId) => {
        setPlan(prev => ({
            ...prev,
            selectedDestinations: prev.selectedDestinations.filter(d => d.id !== destinationId),
        }));
    };

    const addDay = () => {
        setPlan(prev => ({
            ...prev,
            duration: prev.duration + 1,
            itinerary: [...prev.itinerary, { day: prev.duration + 1, activities: [] }],
        }));
    };

    const handleSave = () => {
        // TODO: Save to backend/localStorage
        console.log('Saving plan:', plan);
        alert('Plan saved! (This is a demo)');
    };

    return (
        <div className="min-h-screen bg-primary">
            {/* Header */}
            <section className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-24 pb-8 px-4 border-b border-border sticky top-0 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <Link href="/dashboard">
                            <Button variant="ghost" className="group">
                                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <Button variant="outline">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                            </Button>
                            <Button onClick={handleSave}>
                                <Save className="w-4 h-4 mr-2" />
                                Save Plan
                            </Button>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">Create Travel Plan</h1>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Plan Builder */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Information */}
                            <Card className="p-6">
                                <h2 className="text-xl font-bold text-foreground mb-4">Basic Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Plan Title *</Label>
                                        <Input
                                            id="title"
                                            placeholder="e.g., Cox's Bazar Beach Paradise - 3 Days"
                                            value={plan.title}
                                            onChange={(e) => setPlan(prev => ({ ...prev, title: e.target.value }))}
                                            className="mt-1.5"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description *</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe your travel plan..."
                                            value={plan.description}
                                            onChange={(e) => setPlan(prev => ({ ...prev, description: e.target.value }))}
                                            className="mt-1.5"
                                            rows={3}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="duration">Duration (Days)</Label>
                                            <Input
                                                id="duration"
                                                type="number"
                                                min="1"
                                                value={plan.duration}
                                                onChange={(e) => setPlan(prev => ({ ...prev, duration: parseInt(e.target.value) || 1 }))}
                                                className="mt-1.5"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="difficulty">Difficulty</Label>
                                            <Select
                                                value={plan.difficulty}
                                                onValueChange={(value) => setPlan(prev => ({ ...prev, difficulty: value }))}
                                            >
                                                <SelectTrigger className="mt-1.5">
                                                    <SelectValue placeholder="Select difficulty" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="easy">Easy</SelectItem>
                                                    <SelectItem value="medium">Medium</SelectItem>
                                                    <SelectItem value="hard">Hard</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="budgetMin">Min Budget (BDT)</Label>
                                            <Input
                                                id="budgetMin"
                                                type="number"
                                                min="0"
                                                value={plan.estimatedBudget.min}
                                                onChange={(e) => setPlan(prev => ({
                                                    ...prev,
                                                    estimatedBudget: { ...prev.estimatedBudget, min: parseInt(e.target.value) || 0 }
                                                }))}
                                                className="mt-1.5"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="budgetMax">Max Budget (BDT)</Label>
                                            <Input
                                                id="budgetMax"
                                                type="number"
                                                min="0"
                                                value={plan.estimatedBudget.max}
                                                onChange={(e) => setPlan(prev => ({
                                                    ...prev,
                                                    estimatedBudget: { ...prev.estimatedBudget, max: parseInt(e.target.value) || 0 }
                                                }))}
                                                className="mt-1.5"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Destinations */}
                            <Card className="p-6">
                                <h2 className="text-xl font-bold text-foreground mb-4">Select Destinations</h2>

                                {/* Selected Destinations */}
                                {plan.selectedDestinations.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="text-sm font-semibold text-muted mb-2">
                                            Selected ({plan.selectedDestinations.length})
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {plan.selectedDestinations.map((dest) => (
                                                <Badge
                                                    key={dest.id}
                                                    variant="secondary"
                                                    className="pl-3 pr-1 py-1.5 flex items-center gap-2"
                                                >
                                                    <span>{dest.name}</span>
                                                    <button
                                                        onClick={() => removeDestination(dest.id)}
                                                        className="hover:bg-destructive/20 rounded-full p-0.5"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Destination Picker */}
                                <div>
                                    <Label>Add Destinations</Label>
                                    <Select onValueChange={addDestination}>
                                        <SelectTrigger className="mt-1.5">
                                            <SelectValue placeholder="Choose a destination..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {districts.map((district) => {
                                                const districtDests = destinations.filter(d => d.district === district.slug);
                                                if (districtDests.length === 0) return null;

                                                return (
                                                    <div key={district.id}>
                                                        <div className="px-2 py-1.5 text-xs font-semibold text-muted">
                                                            {district.name}
                                                        </div>
                                                        {districtDests.map((dest) => (
                                                            <SelectItem key={dest.id} value={dest.id}>
                                                                {dest.name}
                                                            </SelectItem>
                                                        ))}
                                                    </div>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </Card>

                            {/* Days Itinerary */}
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-foreground">Day-by-Day Itinerary</h2>
                                    <Button variant="outline" size="sm" onClick={addDay}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Day
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {Array.from({ length: plan.duration }).map((_, index) => (
                                        <div
                                            key={index}
                                            className={`p-4 rounded-lg border ${currentDay === index + 1
                                                    ? 'border-accent-primary bg-accent-primary/5'
                                                    : 'border-border bg-secondary'
                                                } cursor-pointer transition-colors`}
                                            onClick={() => setCurrentDay(index + 1)}
                                        >
                                            <h3 className="font-bold text-foreground mb-2">
                                                Day {index + 1}
                                            </h3>
                                            <p className="text-sm text-muted">
                                                Click to add activities for this day
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Right Column - Summary */}
                        <div className="space-y-6">
                            <Card className="p-6 sticky top-44">
                                <h3 className="text-lg font-bold text-foreground mb-4">Plan Summary</h3>

                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-muted mb-1">Title</div>
                                        <div className="font-semibold text-foreground">
                                            {plan.title || 'Untitled Plan'}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1.5 text-muted">
                                            <Calendar className="w-4 h-4" />
                                            <span>{plan.duration} {plan.duration > 1 ? 'days' : 'day'}</span>
                                        </div>
                                        <Badge variant="secondary" className="capitalize">
                                            {plan.difficulty}
                                        </Badge>
                                    </div>

                                    {plan.estimatedBudget.max > 0 && (
                                        <div>
                                            <div className="text-sm text-muted mb-1">Budget Range</div>
                                            <div className="font-semibold text-foreground flex items-center gap-1.5">
                                                <DollarSign className="w-4 h-4" />
                                                {plan.estimatedBudget.min.toLocaleString()} -{' '}
                                                {plan.estimatedBudget.max.toLocaleString()} BDT
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <div className="text-sm text-muted mb-1">Destinations</div>
                                        <div className="font-semibold text-foreground flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4" />
                                            {plan.selectedDestinations.length} selected
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-border">
                                        <div className="text-sm text-muted mb-2">Estimated Travel Score</div>
                                        <div className="text-2xl font-bold text-accent-primary">
                                            +{15 + plan.selectedDestinations.length * 5 + plan.duration * 3} pts
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-2">
                                    <Button className="w-full" size="lg" onClick={handleSave}>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Draft
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Publish Plan
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
