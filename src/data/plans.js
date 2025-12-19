/**
 * Travel Plans Data
 * Sample travel itineraries created by users
 */

export const plans = [
    {
        id: 'plan-1',
        title: 'Cox\'s Bazar Beach Paradise - 3 Days',
        titleBn: 'কক্সবাজার বীচ স্বর্গ - ৩ দিন',
        slug: 'coxs-bazar-beach-paradise-3-days',
        creator: 'user-1',
        creatorName: 'Ahmed Rahman',
        creatorAvatar: '/images/avatars/user-1.jpg',
        district: 'coxs-bazar',
        description: 'A perfect 3-day beach getaway covering the best spots of Cox\'s Bazar including the main beach, Inani, and Himchari.',
        coverImage: '/images/plans/coxs-bazar-plan.jpg',
        duration: 3, // days
        destinations: ['coxs-bazar-beach', 'inani-beach', 'himchari'],
        estimatedBudget: {
            min: 8000,
            max: 15000,
            currency: 'BDT',
            breakdown: {
                accommodation: 6000,
                food: 4000,
                transport: 3000,
                activities: 2000,
            },
        },
        itinerary: [
            {
                day: 1,
                title: 'Arrival & Cox\'s Bazar Beach',
                date: null,
                activities: [
                    {
                        time: '08:00',
                        activity: 'Departure from Dhaka',
                        location: 'Dhaka',
                        duration: '6-7 hours',
                        cost: 1500,
                    },
                    {
                        time: '15:00',
                        activity: 'Check-in at hotel',
                        location: 'Cox\'s Bazar',
                        duration: '1 hour',
                        cost: 0,
                    },
                    {
                        time: '17:00',
                        activity: 'Evening beach walk & sunset viewing',
                        location: 'coxs-bazar-beach',
                        duration: '2-3 hours',
                        cost: 0,
                    },
                    {
                        time: '20:00',
                        activity: 'Seafood dinner at beachside restaurant',
                        location: 'Cox\'s Bazar',
                        duration: '1.5 hours',
                        cost: 800,
                    },
                ],
            },
            {
                day: 2,
                title: 'Inani Beach & Marine Drive',
                activities: [
                    {
                        time: '07:00',
                        activity: 'Sunrise viewing at Cox\'s Bazar beach',
                        location: 'coxs-bazar-beach',
                        duration: '1 hour',
                        cost: 0,
                    },
                    {
                        time: '09:00',
                        activity: 'Journey to Inani Beach via Marine Drive',
                        location: 'inani-beach',
                        duration: '1.5 hours',
                        cost: 500,
                    },
                    {
                        time: '10:30',
                        activity: 'Explore Inani Beach & coral stones',
                        location: 'inani-beach',
                        duration: '3 hours',
                        cost: 0,
                    },
                    {
                        time: '14:00',
                        activity: 'Lunch at local restaurant',
                        location: 'Inani',
                        duration: '1 hour',
                        cost: 400,
                    },
                    {
                        time: '15:30',
                        activity: 'Visit Himchari National Park',
                        location: 'himchari',
                        duration: '2 hours',
                        cost: 50,
                    },
                    {
                        time: '18:00',
                        activity: 'Return to hotel',
                        location: 'Cox\'s Bazar',
                        duration: '1 hour',
                        cost: 500,
                    },
                ],
            },
            {
                day: 3,
                title: 'Beach Activities & Departure',
                activities: [
                    {
                        time: '08:00',
                        activity: 'Beach activities (surfing, speed boat)',
                        location: 'coxs-bazar-beach',
                        duration: '2 hours',
                        cost: 1000,
                    },
                    {
                        time: '11:00',
                        activity: 'Check-out & shopping for souvenirs',
                        location: 'Cox\'s Bazar',
                        duration: '2 hours',
                        cost: 500,
                    },
                    {
                        time: '14:00',
                        activity: 'Departure to Dhaka',
                        location: 'Cox\'s Bazar',
                        duration: '6-7 hours',
                        cost: 1500,
                    },
                ],
            },
        ],
        bestSeason: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        groupSize: { min: 2, max: 6 },
        difficulty: 'easy',
        visibility: 'public',
        travelScore: 120, // Estimated score for completing this plan
        likes: 234,
        comments: 45,
        bookmarks: 89,
        views: 3421,
        createdAt: '2023-10-15',
        updatedAt: '2023-10-15',
        tags: ['beach', 'relaxation', 'nature', 'budget-friendly'],
        featured: true,
    },
    {
        id: 'plan-2',
        title: 'Bandarban Adventure - 4 Days',
        titleBn: 'বান্দরবান অ্যাডভেঞ্চার - ৪ দিন',
        slug: 'bandarban-adventure-4-days',
        creator: 'user-2',
        creatorName: 'Fatima Khan',
        creatorAvatar: '/images/avatars/user-2.jpg',
        district: 'bandarban',
        description: 'An adventurous journey through the hills of Bandarban, covering Nilgiri, Boga Lake, and more.',
        coverImage: '/images/plans/bandarban-plan.jpg',
        duration: 4,
        destinations: ['nilgiri', 'boga-lake'],
        estimatedBudget: {
            min: 12000,
            max: 20000,
            currency: 'BDT',
            breakdown: {
                accommodation: 5000,
                food: 5000,
                transport: 6000,
                activities: 4000,
            },
        },
        itinerary: [
            {
                day: 1,
                title: 'Journey to Bandarban & Nilgiri',
                activities: [
                    {
                        time: '06:00',
                        activity: 'Departure from Chittagong',
                        location: 'Chittagong',
                        duration: '3 hours',
                        cost: 1000,
                    },
                    {
                        time: '12:00',
                        activity: 'Journey to Nilgiri via winding roads',
                        location: 'nilgiri',
                        duration: '3 hours',
                        cost: 2000,
                    },
                    {
                        time: '15:00',
                        activity: 'Check-in at Nilgiri Resort',
                        location: 'nilgiri',
                        duration: '1 hour',
                        cost: 0,
                    },
                    {
                        time: '16:00',
                        activity: 'Cloud touching experience & photography',
                        location: 'nilgiri',
                        duration: '2 hours',
                        cost: 50,
                    },
                    {
                        time: '18:00',
                        activity: 'Sunset viewing from peak',
                        location: 'nilgiri',
                        duration: '1 hour',
                        cost: 0,
                    },
                ],
            },
            {
                day: 2,
                title: 'Trek to Boga Lake',
                activities: [
                    {
                        time: '06:00',
                        activity: 'Departure for Ruma Bazar',
                        location: 'Nilgiri',
                        duration: '4 hours',
                        cost: 1500,
                    },
                    {
                        time: '11:00',
                        activity: 'Start trekking to Boga Lake',
                        location: 'Ruma',
                        duration: '4-5 hours',
                        cost: 0,
                    },
                    {
                        time: '16:00',
                        activity: 'Reach Boga Lake & set up camp',
                        location: 'boga-lake',
                        duration: '2 hours',
                        cost: 500,
                    },
                    {
                        time: '18:00',
                        activity: 'Lake exploration & cultural experience',
                        location: 'boga-lake',
                        duration: '2 hours',
                        cost: 0,
                    },
                ],
            },
            {
                day: 3,
                title: 'Boga Lake Experience',
                activities: [
                    {
                        time: '06:00',
                        activity: 'Sunrise at Boga Lake',
                        location: 'boga-lake',
                        duration: '1 hour',
                        cost: 0,
                    },
                    {
                        time: '08:00',
                        activity: 'Breakfast & lake activities',
                        location: 'boga-lake',
                        duration: '2 hours',
                        cost: 300,
                    },
                    {
                        time: '11:00',
                        activity: 'Trek back to Ruma',
                        location: 'Ruma',
                        duration: '4 hours',
                        cost: 0,
                    },
                    {
                        time: '16:00',
                        activity: 'Journey to Bandarban town',
                        location: 'Bandarban',
                        duration: '3 hours',
                        cost: 1500,
                    },
                ],
            },
            {
                day: 4,
                title: 'Return Journey',
                activities: [
                    {
                        time: '09:00',
                        activity: 'Shopping at Bandarban market',
                        location: 'Bandarban',
                        duration: '2 hours',
                        cost: 1000,
                    },
                    {
                        time: '12:00',
                        activity: 'Departure to Chittagong',
                        location: 'Bandarban',
                        duration: '3 hours',
                        cost: 1000,
                    },
                ],
            },
        ],
        bestSeason: ['Nov', 'Dec', 'Jan', 'Feb'],
        groupSize: { min: 3, max: 10 },
        difficulty: 'hard',
        permitRequired: true,
        visibility: 'public',
        travelScore: 250,
        likes: 456,
        comments: 78,
        bookmarks: 156,
        views: 5234,
        createdAt: '2023-09-20',
        updatedAt: '2023-09-22',
        tags: ['trekking', 'adventure', 'hills', 'camping'],
        featured: true,
    },
    {
        id: 'plan-3',
        title: 'Sylhet Tea Gardens & Waterfalls - 2 Days',
        titleBn: 'সিলেটের চা বাগান এবং জলপ্রপাত - ২ দিন',
        slug: 'sylhet-tea-gardens-2-days',
        creator: 'user-1',
        creatorName: 'Ahmed Rahman',
        creatorAvatar: '/images/avatars/user-1.jpg',
        district: 'sylhet',
        description: 'Experience the beauty of Sylhet\'s tea gardens, swamp forest, and scenic spots.',
        coverImage: '/images/plans/sylhet-plan.jpg',
        duration: 2,
        destinations: ['ratargul', 'jaflong'],
        estimatedBudget: {
            min: 5000,
            max: 10000,
            currency: 'BDT',
            breakdown: {
                accommodation: 3000,
                food: 2500,
                transport: 3000,
                activities: 1500,
            },
        },
        itinerary: [
            {
                day: 1,
                title: 'Ratargul Swamp Forest',
                activities: [
                    {
                        time: '08:00',
                        activity: 'Journey to Ratargul from Sylhet city',
                        location: 'Sylhet',
                        duration: '1.5 hours',
                        cost: 500,
                    },
                    {
                        time: '10:00',
                        activity: 'Boat ride through swamp forest',
                        location: 'ratargul',
                        duration: '2-3 hours',
                        cost: 1000,
                    },
                    {
                        time: '14:00',
                        activity: 'Lunch at local restaurant',
                        location: 'Gowainghat',
                        duration: '1 hour',
                        cost: 400,
                    },
                    {
                        time: '16:00',
                        activity: 'Visit tea gardens',
                        location: 'Sylhet',
                        duration: '2 hours',
                        cost: 0,
                    },
                    {
                        time: '19:00',
                        activity: 'Check-in at hotel',
                        location: 'Sylhet',
                        duration: '1 hour',
                        cost: 0,
                    },
                ],
            },
            {
                day: 2,
                title: 'Jaflong & Border Views',
                activities: [
                    {
                        time: '08:00',
                        activity: 'Journey to Jaflong',
                        location: 'Sylhet',
                        duration: '2 hours',
                        cost: 800,
                    },
                    {
                        time: '10:30',
                        activity: 'Explore Jaflong, stone collection area',
                        location: 'jaflong',
                        duration: '3 hours',
                        cost: 0,
                    },
                    {
                        time: '13:00',
                        activity: 'Boat ride on Dawki River',
                        location: 'jaflong',
                        duration: '1 hour',
                        cost: 400,
                    },
                    {
                        time: '15:00',
                        activity: 'Return to Sylhet & departure',
                        location: 'Sylhet',
                        duration: '2 hours',
                        cost: 800,
                    },
                ],
            },
        ],
        bestSeason: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        groupSize: { min: 2, max: 8 },
        difficulty: 'easy',
        visibility: 'public',
        travelScore: 100,
        likes: 189,
        comments: 32,
        bookmarks: 67,
        views: 2134,
        createdAt: '2023-11-01',
        updatedAt: '2023-11-01',
        tags: ['nature', 'boat-ride', 'tea-gardens', 'scenic'],
        featured: false,
    },
    {
        id: 'plan-4',
        title: 'Dhaka Heritage Walk - 1 Day',
        titleBn: 'ঢাকা হেরিটেজ ওয়াক - ১ দিন',
        slug: 'dhaka-heritage-1-day',
        creator: 'user-3',
        creatorName: 'Karim Hossain',
        creatorAvatar: '/images/avatars/user-3.jpg',
        district: 'dhaka',
        description: 'A cultural journey through Old Dhaka exploring historical monuments and heritage sites.',
        coverImage: '/images/plans/dhaka-heritage.jpg',
        duration: 1,
        destinations: ['lalbagh-fort', 'ahsan-manzil'],
        estimatedBudget: {
            min: 1000,
            max: 2500,
            currency: 'BDT',
            breakdown: {
                food: 800,
                transport: 500,
                activities: 200,
            },
        },
        itinerary: [
            {
                day: 1,
                title: 'Old Dhaka Discovery',
                activities: [
                    {
                        time: '08:00',
                        activity: 'Visit Lalbagh Fort',
                        location: 'lalbagh-fort',
                        duration: '2 hours',
                        cost: 20,
                    },
                    {
                        time: '11:00',
                        activity: 'Explore Ahsan Manzil (Pink Palace)',
                        location: 'ahsan-manzil',
                        duration: '1.5 hours',
                        cost: 20,
                    },
                    {
                        time: '13:00',
                        activity: 'Traditional Bengali lunch',
                        location: 'Old Dhaka',
                        duration: '1 hour',
                        cost: 400,
                    },
                    {
                        time: '15:00',
                        activity: 'Walk through Shankhari Bazar',
                        location: 'Old Dhaka',
                        duration: '2 hours',
                        cost: 0,
                    },
                    {
                        time: '17:00',
                        activity: 'Sadarghat river port visit',
                        location: 'Sadarghat',
                        duration: '1 hour',
                        cost: 0,
                    },
                ],
            },
        ],
        bestSeason: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        groupSize: { min: 1, max: 8 },
        difficulty: 'easy',
        visibility: 'public',
        travelScore: 50,
        likes: 92,
        comments: 18,
        bookmarks: 34,
        views: 1234,
        createdAt: '2023-11-10',
        updatedAt: '2023-11-10',
        tags: ['historical', 'cultural', 'heritage', 'budget'],
        featured: false,
    },
    {
        id: 'plan-5',
        title: 'Sundarbans Wildlife Safari - 3 Days',
        titleBn: 'সুন্দরবন বন্যপ্রাণী সাফারি - ৩ দিন',
        slug: 'sundarbans-safari-3-days',
        creator: 'user-2',
        creatorName: 'Fatima Khan',
        creatorAvatar: '/images/avatars/user-2.jpg',
        district: 'khulna',
        description: 'An unforgettable wildlife adventure in the world\'s largest mangrove forest.',
        coverImage: '/images/plans/sundarbans-plan.jpg',
        duration: 3,
        destinations: ['sundarbans'],
        estimatedBudget: {
            min: 15000,
            max: 30000,
            currency: 'BDT',
            breakdown: {
                accommodation: 8000,
                food: 6000,
                transport: 8000,
                activities: 8000,
            },
        },
        itinerary: [
            {
                day: 1,
                title: 'Journey to Sundarbans',
                activities: [
                    {
                        time: '06:00',
                        activity: 'Departure from Khulna to Mongla',
                        location: 'Khulna',
                        duration: '2 hours',
                        cost: 1000,
                    },
                    {
                        time: '09:00',
                        activity: 'Board boat & start journey into Sundarbans',
                        location: 'sundarbans',
                        duration: '4 hours',
                        cost: 5000,
                    },
                    {
                        time: '14:00',
                        activity: 'Lunch on boat',
                        location: 'Boat',
                        duration: '1 hour',
                        cost: 0,
                    },
                    {
                        time: '16:00',
                        activity: 'Forest walk at designated spot',
                        location: 'sundarbans',
                        duration: '2 hours',
                        cost: 500,
                    },
                ],
            },
            {
                day: 2,
                title: 'Wildlife Exploration',
                activities: [
                    {
                        time: '06:00',
                        activity: 'Early morning wildlife watching',
                        location: 'sundarbans',
                        duration: '3 hours',
                        cost: 0,
                    },
                    {
                        time: '10:00',
                        activity: 'Visit wildlife spots & deer sanctuary',
                        location: 'sundarbans',
                        duration: '4 hours',
                        cost: 2000,
                    },
                    {
                        time: '15:00',
                        activity: 'Bird watching session',
                        location: 'sundarbans',
                        duration: '2 hours',
                        cost: 0,
                    },
                ],
            },
            {
                day: 3,
                title: 'Return Journey',
                activities: [
                    {
                        time: '08:00',
                        activity: 'Morning forest exploration',
                        location: 'sundarbans',
                        duration: '2 hours',
                        cost: 0,
                    },
                    {
                        time: '11:00',
                        activity: 'Return boat journey to Mongla',
                        location: 'Mongla',
                        duration: '4 hours',
                        cost: 0,
                    },
                    {
                        time: '16:00',
                        activity: 'Return to Khulna',
                        location: 'Khulna',
                        duration: '2 hours',
                        cost: 1000,
                    },
                ],
            },
        ],
        bestSeason: ['Nov', 'Dec', 'Jan', 'Feb'],
        groupSize: { min: 4, max: 20 },
        difficulty: 'medium',
        permitRequired: true,
        visibility: 'public',
        travelScore: 200,
        likes: 567,
        comments: 89,
        bookmarks: 234,
        views: 8234,
        createdAt: '2023-10-01',
        updatedAt: '2023-10-05',
        tags: ['wildlife', 'nature', 'boat', 'adventure', 'unesco'],
        featured: true,
    },
];

// Helper functions
export const getPlanById = (id) => {
    return plans.find(p => p.id === id);
};

export const getPlanBySlug = (slug) => {
    return plans.find(p => p.slug === slug);
};

export const getPlansByCreator = (creatorId) => {
    return plans.filter(p => p.creator === creatorId);
};

export const getPlansByDistrict = (district) => {
    return plans.filter(p => p.district === district);
};

export const getFeaturedPlans = (limit = 3) => {
    return plans.filter(p => p.featured).slice(0, limit);
};

export const getTrendingPlans = (limit = 6) => {
    return plans.sort((a, b) => b.likes - a.likes).slice(0, limit);
};

export const searchPlans = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return plans.filter(p =>
        p.title.toLowerCase().includes(lowercaseQuery) ||
        p.description.toLowerCase().includes(lowercaseQuery) ||
        p.tags.some(tag => tag.includes(lowercaseQuery))
    );
};

export default plans;
