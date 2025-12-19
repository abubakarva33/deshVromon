'use client';

import { useState } from 'react';
import { ReviewForm, ReviewsList, RatingSummary } from '@/components/shared/ReviewSystem';

export default function HotelReviews({ hotelId, initialReviews = [] }) {
    // Mock initial reviews if none provided
    const defaultReviews = [
        {
            id: 1,
            name: 'Rahim Ahmed',
            rating: 5,
            review: 'Excellent service and beautiful location. Will definitely come back!',
            date: '2023-12-15',
        },
        {
            id: 2,
            name: 'Sarah Khan',
            rating: 4,
            review: 'Great amenities, especially the pool. Room service was a bit slow though.',
            date: '2023-11-20',
        },
    ];

    const [reviews, setReviews] = useState(initialReviews.length > 0 ? initialReviews : defaultReviews);

    const handleReviewSubmit = (newReview) => {
        setReviews((prev) => [newReview, ...prev]);
    };

    return (
        <div className="mt-12 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-8">Guest Reviews</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <RatingSummary reviews={reviews} />
                    <ReviewForm itemType="hotel" itemId={hotelId} onSubmit={handleReviewSubmit} />
                </div>

                <div className="lg:col-span-2">
                    <ReviewsList reviews={reviews} />
                </div>
            </div>
        </div>
    );
}
