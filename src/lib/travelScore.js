/**
 * Travel Score Calculation System
 * Gamification logic for user engagement
 */

import { TRAVELER_LEVELS } from '../data/users';

/**
 * Calculate total travel score based on user activities
 * @param {Object} user - User object with travel data
 * @returns {number} Total travel score
 */
export function calculateTravelScore(user) {
    if (!user) return 0;

    let score = 0;

    // Destinations visited (10 points each)
    if (user.stats?.destinationsVisited) {
        score += user.stats.destinationsVisited * 10;
    }

    // Plans created (15 points each)
    if (user.stats?.plansCreated) {
        score += user.stats.plansCreated * 15;
    }

    // Stories shared (12 points each)
    if (user.stats?.storiesShared) {
        score += user.stats.storiesShared * 12;
    }

    // Reviews written (5 points each)
    if (user.stats?.reviewsWritten) {
        score += user.stats.reviewsWritten * 5;
    }

    // Bonus for verification
    if (user.verified) {
        score += 50;
    }

    return score;
}

/**
 * Get traveler level based on score
 * @param {number} score - Travel score
 * @returns {Object} Level object with name, icon, etc.
 */
export function getTravelerLevel(score) {
    for (const [key, level] of Object.entries(TRAVELER_LEVELS)) {
        if (score >= level.minScore && score <= level.maxScore) {
            return { ...level, key: key.toLowerCase() };
        }
    }
    return { ...TRAVELER_LEVELS.NEWBIE, key: 'newbie' };
}

/**
 * Calculate next milestone and progress
 * @param {number} currentScore - Current travel score
 * @returns {Object} Next milestone info
 */
export function getNextMilestone(currentScore) {
    const currentLevel = getTravelerLevel(currentScore);

    if (currentLevel.maxScore === Infinity) {
        return {
            reached: true,
            level: currentLevel,
            progress: 100,
        };
    }

    const nextThreshold = currentLevel.maxScore + 1;
    const prevThreshold = currentLevel.minScore;
    const range = nextThreshold - prevThreshold;
    const progress = ((currentScore - prevThreshold) / range) * 100;

    return {
        reached: false,
        currentLevel,
        nextThreshold,
        pointsToNext: nextThreshold - currentScore,
        progress: Math.min(progress, 100),
    };
}

/**
 * Simulate travel score for visitors
 * @param {Object} inputs - Hypothetical travel data
 * @returns {Object} Simulated score and level
 */
export function simulateTravelScore(inputs) {
    const { destinations = 0, plans = 0, stories = 0, reviews = 0 } = inputs;

    const score =
        destinations * 10 +
        plans * 15 +
        stories * 12 +
        reviews * 5;

    const level = getTravelerLevel(score);
    const milestone = getNextMilestone(score);

    return {
        score,
        level,
        milestone,
        breakdown: {
            destinations: destinations * 10,
            plans: plans * 15,
            stories: stories * 12,
            reviews: reviews * 5,
        },
    };
}

/**
 * Calculate estimated score for completing a travel plan
 * @param {Object} plan - Travel plan object
 * @returns {number} Estimated score gain
 */
export function calculatePlanScore(plan) {
    let score = 0;

    // Base score for creating plan
    score += 15;

    // Bonus for number of destinations (5 points each)
    if (plan.destinations) {
        score += plan.destinations.length * 5;
    }

    // Bonus for duration (3 points per day)
    if (plan.duration) {
        score += plan.duration * 3;
    }

    // Bonus for detailed itinerary (10 points)
    if (plan.itinerary && plan.itinerary.length > 0) {
        score += 10;
    }

    return score;
}

/**
 * Get achievements based on user data
 * @param {Object} user - User object
 * @returns {Array} List of unlocked achievements
 */
export function getAchievements(user) {
    const achievements = [];

    if (user.stats?.plansCreated >= 1) {
        achievements.push({
            id: 'first-plan',
            name: 'Plan Master',
            description: 'Created your first travel plan',
            icon: '📝',
        });
    }

    if (user.stats?.destinationsVisited >= 10) {
        achievements.push({
            id: 'explorer',
            name: 'Explorer',
            description: 'Visited 10 destinations',
            icon: '🎒',
        });
    }

    if (user.stats?.storiesShared >= 5) {
        achievements.push({
            id: 'storyteller',
            name: 'Story Master',
            description: 'Shared 5 travel stories',
            icon: '✍️',
        });
    }

    // Check for beach visits
    const beachDestinations = ['coxs-bazar-beach', 'inani-beach', 'kuakata-beach'];
    const visitedBeaches = user.visitedDestinations?.filter(d =>
        beachDestinations.includes(d)
    ).length || 0;

    if (visitedBeaches >= 2) {
        achievements.push({
            id: 'beach-lover',
            name: 'Beach Explorer',
            description: 'Visited multiple beaches',
            icon: '🏖️',
        });
    }

    // Check for hill visits
    const hillDestinations = ['nilgiri', 'boga-lake', 'nafakhum'];
    const visitedHills = user.visitedDestinations?.filter(d =>
        hillDestinations.includes(d)
    ).length || 0;

    if (visitedHills >= 2) {
        achievements.push({
            id: 'hill-climber',
            name: 'Hill Conqueror',
            description: 'Conquered the hills',
            icon: '⛰️',
        });
    }

    if (user.travelScore >= 1000) {
        achievements.push({
            id: 'expert-traveler',
            name: 'Travel Expert',
            description: 'Reached 1000 travel score',
            icon: '🏆',
        });
    }

    return achievements;
}

export default {
    calculateTravelScore,
    getTravelerLevel,
    getNextMilestone,
    simulateTravelScore,
    calculatePlanScore,
    getAchievements,
};
