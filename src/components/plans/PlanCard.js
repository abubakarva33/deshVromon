'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, DollarSign, Heart, MessageCircle, Bookmark, MapPin, Users } from 'lucide-react';
import { Badge } from '../ui/badge';

/**
 * PlanCard Component
 * Displays a travel plan preview card
 */
export default function PlanCard({ plan, variant = 'default' }) {
    const {
        id,
        slug,
        title,
        description,
        coverImage,
        duration,
        estimatedBudget,
        difficulty,
        destinations,
        district,
        likes,
        comments,
        bookmarks,
        tags,
        creatorName,
        creatorAvatar,
        travelScore,
    } = plan;

    const getDifficultyColor = (difficulty) => {
        const colors = {
            easy: 'bg-green-500/10 text-green-700 border-green-500/20',
            medium: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
            hard: 'bg-red-500/10 text-red-700 border-red-500/20',
        };
        return colors[difficulty] || colors.easy;
    };

    const planUrl = `/plans/${id}`;
    const imageUrl = coverImage || '/images/placeholder-plan.jpg';

    if (variant === 'compact') {
        return (
            <Link href={planUrl} className="group block">
                <div className="flex gap-3 p-3 rounded-lg border border-border hover:border-accent-primary/50 transition-smooth bg-secondary">
                    <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-foreground line-clamp-1 group-hover:text-accent-primary transition-colors">
                            {title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {duration} days
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {destinations?.length || 0} spots
                            </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs flex items-center gap-1 text-muted">
                                <Heart className="w-3 h-3" />
                                {likes}
                            </span>
                            <span className="text-xs flex items-center gap-1 text-muted">
                                <MessageCircle className="w-3 h-3" />
                                {comments}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={planUrl} className="group block">
            <div className="card-hover rounded-xl border border-border overflow-hidden bg-secondary">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-muted">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Duration Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                        <span className="text-sm font-semibold flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {duration} {duration > 1 ? 'Days' : 'Day'}
                        </span>
                    </div>

                    {/* Difficulty Badge */}
                    <div className="absolute top-3 right-3">
                        <Badge className={`${getDifficultyColor(difficulty)} capitalize border backdrop-blur-sm`}>
                            {difficulty}
                        </Badge>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                    <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-accent-primary transition-colors line-clamp-2">
                        {title}
                    </h3>

                    <p className="text-sm text-secondary line-clamp-2 mb-3">
                        {description}
                    </p>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-muted">
                        <div className="flex items-center gap-1.5">
                            <DollarSign className="w-3.5 h-3.5" />
                            <span>{estimatedBudget?.min?.toLocaleString()} - {estimatedBudget?.max?.toLocaleString()} BDT</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{destinations?.length || 0} Destinations</span>
                        </div>
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-3 text-xs text-muted">
                            <span className="flex items-center gap-1 hover:text-red-600 transition-colors cursor-pointer">
                                <Heart className="w-3.5 h-3.5" />
                                {likes}
                            </span>
                            <span className="flex items-center gap-1">
                                <MessageCircle className="w-3.5 h-3.5" />
                                {comments}
                            </span>
                            <span className="flex items-center gap-1">
                                <Bookmark className="w-3.5 h-3.5" />
                                {bookmarks}
                            </span>
                        </div>

                        {travelScore && (
                            <div className="text-xs font-semibold text-accent-primary">
                                +{travelScore} pts
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-2 py-0.5 rounded-md bg-hover text-muted"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
