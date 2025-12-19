'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '../ui/button';

/**
 * ReviewForm Component
 * Form for submitting reviews and ratings
 */
export function ReviewForm({ itemType, itemId, onSubmit }) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [review, setReview] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }

        onSubmit?.({
            rating,
            review,
            name,
            itemType,
            itemId,
            date: new Date().toISOString(),
        });

        // Reset form
        setRating(0);
        setReview('');
        setName('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 rounded-xl border border-border bg-secondary">
            <h3 className="font-bold text-lg mb-4">Write a Review</h3>

            {/* Star Rating */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Your Rating</label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="transition-transform hover:scale-110"
                        >
                            <Star
                                className={`w-8 h-8 ${star <= (hoveredRating || rating)
                                        ? 'fill-yellow-500 text-yellow-500'
                                        : 'text-gray-300'
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Name */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-primary text-foreground focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    placeholder="Enter your name"
                    required
                />
            </div>

            {/* Review Text */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-primary text-foreground focus:outline-none focus:ring-2 focus:ring-accent-primary resize-none"
                    placeholder="Share your experience..."
                    required
                />
            </div>

            <Button type="submit" className="w-full">
                Submit Review
            </Button>
        </form>
    );
}

/**
 * ReviewsList Component
 * Display list of reviews with ratings
 */
export function ReviewsList({ reviews }) {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-12 bg-secondary rounded-xl border border-border">
                <p className="text-muted">No reviews yet. Be the first to review!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-border bg-secondary">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h4 className="font-semibold text-foreground">{review.name || 'Anonymous'}</h4>
                            <p className="text-sm text-muted">
                                {new Date(review.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-4 h-4 ${star <= review.rating
                                            ? 'fill-yellow-500 text-yellow-500'
                                            : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="text-secondary leading-relaxed">{review.review}</p>
                </div>
            ))}
        </div>
    );
}

/**
 * RatingSummary Component
 * Display average rating and distribution
 */
export function RatingSummary({ reviews }) {
    if (!reviews || reviews.length === 0) {
        return null;
    }

    const totalReviews = reviews.length;
    const averageRating = (
        reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    ).toFixed(1);

    // Calculate distribution
    const distribution = [5, 4, 3, 2, 1].map((rating) => ({
        stars: rating,
        count: reviews.filter((r) => r.rating === rating).length,
        percentage: (reviews.filter((r) => r.rating === rating).length / totalReviews) * 100,
    }));

    return (
        <div className="p-6 rounded-xl border border-border bg-secondary mb-6">
            <div className="flex items-center gap-8 mb-6">
                <div className="text-center">
                    <div className="text-5xl font-bold text-foreground mb-2">{averageRating}</div>
                    <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-5 h-5 ${star <= Math.round(averageRating)
                                        ? 'fill-yellow-500 text-yellow-500'
                                        : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                    <div className="text-sm text-muted">{totalReviews} reviews</div>
                </div>

                <div className="flex-1 space-y-2">
                    {distribution.map(({ stars, count, percentage }) => (
                        <div key={stars} className="flex items-center gap-3">
                            <span className="text-sm w-12">{stars} star</span>
                            <div className="flex-1 h-2 bg-hover rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-yellow-500"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <span className="text-sm text-muted w-12 text-right">{count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
