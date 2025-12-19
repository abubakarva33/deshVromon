/**
 * User Roles and Authentication Data
 * Dummy user data for different roles in the system
 */

export const ROLES = {
    VISITOR: 'visitor',
    TRAVELER: 'traveler',
    AGENCY: 'agency',
    MODERATOR: 'moderator',
    ADMIN: 'admin',
};

export const TRAVELER_LEVELS = {
    NEWBIE: { name: 'Newbie', minScore: 0, maxScore: 99, icon: '🌱' },
    EXPLORER: { name: 'Explorer', minScore: 100, maxScore: 299, icon: '🎒' },
    WANDERER: { name: 'Wanderer', minScore: 300, maxScore: 599, icon: '🧭' },
    ADVENTURER: { name: 'Adventurer', minScore: 600, maxScore: 999, icon: '⛰️' },
    EXPERT: { name: 'Expert', minScore: 1000, maxScore: Infinity, icon: '🏆' },
};

export const users = [
    {
        id: 'user-1',
        name: 'Ahmed Rahman',
        nameBn: 'আহমেদ রহমান',
        email: 'ahmed.rahman@example.com',
        role: ROLES.TRAVELER,
        avatar: '/images/avatars/user-1.jpg',
        bio: 'Travel enthusiast exploring the beauty of Bangladesh',
        location: 'Dhaka, Bangladesh',
        joinDate: '2023-03-15',
        travelScore: 756,
        level: 'adventurer',
        verified: true,
        stats: {
            destinationsVisited: 24,
            plansCreated: 12,
            storiesShared: 18,
            reviewsWritten: 31,
            follower: 342,
            following: 198,
        },
        visitedDestinations: [
            'coxs-bazar-beach',
            'inani-beach',
            'himchari',
            'sundarbans',
            'ratargul',
            'jaflong',
            'nilgiri',
            'lalbagh-fort',
            'ahsan-manzil',
        ],
        achievements: [
            { id: 'first-plan', name: 'Plan Master', icon: '📝', unlockedAt: '2023-04-01' },
            { id: 'beach-lover', name: 'Beach Explorer', icon: '🏖️', unlockedAt: '2023-06-15' },
            { id: 'hill-climber', name: 'Hill Conqueror', icon: '⛰️', unlockedAt: '2023-08-20' },
        ],
        preferences: {
            favoriteTypes: ['beach', 'hills', 'nature'],
            budgetRange: 'medium',
            travelStyle: 'adventure',
        },
    },
    {
        id: 'user-2',
        name: 'Fatima Khan',
        nameBn: 'ফাতিমা খান',
        email: 'fatima.khan@example.com',
        role: ROLES.TRAVELER,
        avatar: '/images/avatars/user-2.jpg',
        bio: 'Photographer capturing the essence of Bangladesh',
        location: 'Chittagong, Bangladesh',
        joinDate: '2023-01-10',
        travelScore: 1245,
        level: 'expert',
        verified: true,
        stats: {
            destinationsVisited: 42,
            plansCreated: 28,
            storiesShared: 65,
            reviewsWritten: 89,
            followers: 1523,
            following: 456,
        },
        visitedDestinations: [
            'coxs-bazar-beach',
            'sundarbans',
            'nilgiri',
            'nafakhum',
            'boga-lake',
            'ratargul',
            'kuakata-beach',
            'kaptai-lake',
        ],
        achievements: [
            { id: 'expert-traveler', name: 'Travel Expert', icon: '🏆', unlockedAt: '2023-11-01' },
            { id: 'photographer', name: 'Shutterburg', icon: '📸', unlockedAt: '2023-05-10' },
            { id: 'storyteller', name: 'Story Master', icon: '✍️', unlockedAt: '2023-07-22' },
        ],
        preferences: {
            favoriteTypes: ['nature', 'wildlife', 'scenic'],
            budgetRange: 'high',
            travelStyle: 'photography',
        },
    },
    {
        id: 'user-3',
        name: 'Karim Hossain',
        nameBn: 'করিম হোসেন',
        email: 'karim.h@example.com',
        role: ROLES.TRAVELER,
        avatar: '/images/avatars/user-3.jpg',
        bio: 'Weekend traveler discovering hidden gems',
        location: 'Sylhet, Bangladesh',
        joinDate: '2023-07-20',
        travelScore: 245,
        level: 'explorer',
        verified: false,
        stats: {
            destinationsVisited: 8,
            plansCreated: 5,
            storiesShared: 7,
            reviewsWritten: 12,
            followers: 67,
            following: 134,
        },
        visitedDestinations: ['ratargul', 'jaflong', 'lalbagh-fort', 'ahsan-manzil'],
        achievements: [
            { id: 'first-plan', name: 'Plan Master', icon: '📝', unlockedAt: '2023-08-05' },
        ],
        preferences: {
            favoriteTypes: ['nature', 'historical'],
            budgetRange: 'low',
            travelStyle: 'budget',
        },
    },
    {
        id: 'agency-1',
        name: 'Bangladesh Tours & Travels',
        email: 'info@bdtours.com',
        role: ROLES.AGENCY,
        avatar: '/images/avatars/agency-1.jpg',
        bio: 'Premium tour operator specializing in customized Bangladesh tours',
        location: 'Dhaka, Bangladesh',
        joinDate: '2022-05-10',
        verified: true,
        agencyInfo: {
            license: 'TOUR-BD-2022-1234',
            established: '2015',
            employees: 25,
            rating: 4.7,
            totalReviews: 342,
            toursCompleted: 1500,
            specializations: ['Hill Tracts', 'Beach Tours', 'Cultural Tours'],
        },
        stats: {
            packagesListed: 24,
            bookingsThisYear: 156,
            averageRating: 4.7,
        },
    },
    {
        id: 'mod-1',
        name: 'Moderator One',
        email: 'mod1@deshvromon.com',
        role: ROLES.MODERATOR,
        avatar: '/images/avatars/mod-1.jpg',
        joinDate: '2023-01-01',
        moderatorInfo: {
            approvedContent: 2341,
            rejectedContent: 89,
            warningsIssued: 23,
        },
    },
    {
        id: 'admin-1',
        name: 'System Admin',
        email: 'admin@deshvromon.com',
        role: ROLES.ADMIN,
        avatar: '/images/avatars/admin-1.jpg',
        joinDate: '2022-01-01',
    },
];

export const currentUser = users[0]; // Default to first traveler for testing

export const getUserById = (id) => {
    return users.find(u => u.id === id);
};

export const getUsersByRole = (role) => {
    return users.filter(u => u.role === role);
};

export const getTravelerLevel = (score) => {
    for (const [key, level] of Object.entries(TRAVELER_LEVELS)) {
        if (score >= level.minScore && score <= level.maxScore) {
            return { ...level, key };
        }
    }
    return TRAVELER_LEVELS.NEWBIE;
};

export default users;
