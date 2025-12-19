/**
 * Recommendation Engine
 * Personalized destination and plan suggestions
 */

import destinations from '../data/destinations';
import plans from '../data/plans';
import { getTravelerLevel } from './travelScore';

/**
 * Recommend destinations based on user preferences and history
 * @param {Object} user - User object
 * @param {number} limit - Number of recommendations
 * @returns {Array} Recommended destinations
 */
export function recommendDestinations(user, limit = 6) {
    if (!user) {
        // For visitors, return trending destinations
        return getTrendingDestinations(limit);
    }

    const visited = user.visitedDestinations || [];
    const preferences = user.preferences?.favoriteTypes || [];

    // Filter out already visited
    let available = destinations.filter(d => !visited.includes(d.id));

    // Score destinations based on preferences
    const scored = available.map(dest => {
        let score = dest.hypePercentage; // Base score from hype

        // Bonus for matching preferences
        if (preferences.includes(dest.type)) {
            score += 20;
        }

        // Bonus for tags matching preferences
        const matchingTags = dest.tags?.filter(tag => preferences.includes(tag)).length || 0;
        score += matchingTags * 5;

        return { ...dest, recommendationScore: score };
    });

    // Sort by score and return top results
    return scored
        .sort((a, b) => b.recommendationScore - a.recommendationScore)
        .slice(0, limit);
}

/**
 * Get trending destinations based on hype percentage
 * @param {number} limit - Number of destinations
 * @returns {Array} Trending destinations
 */
export function getTrendingDestinations(limit = 6) {
    return destinations
        .sort((a, b) => b.hypePercentage - a.hypePercentage)
        .slice(0, limit);
}

/**
 * Seasonal recommendations based on current month
 * @param {number} month - Current month (1-12)
 * @param {number} limit - Number of recommendations
 * @returns {Array} Seasonally appropriate destinations
 */
export function getSeasonalRecommendations(month = new Date().getMonth() + 1, limit = 6) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = monthNames[month - 1];

    const seasonal = destinations.filter(dest =>
        dest.bestSeason?.includes(currentMonth)
    );

    return seasonal
        .sort((a, b) => b.hypePercentage - a.hypePercentage)
        .slice(0, limit);
}

/**
 * Recommend travel plans based on user data
 * @param {Object} user - User object
 * @param {number} limit - Number of recommendations
 * @returns {Array} Recommended plans
 */
export function recommendPlans(user, limit = 6) {
    if (!user) {
        return getTrendingPlans(limit);
    }

    const preferences = user.preferences || {};
    const level = getTravelerLevel(user.travelScore || 0);

    let scored = plans.map(plan => {
        let score = plan.likes || 0; // Base score from popularity

        // Match difficulty with user level
        if (level.key === 'newbie' && plan.difficulty === 'easy') score += 20;
        if (level.key === 'explorer' && plan.difficulty !== 'hard') score += 15;
        if (['adventurer', 'expert'].includes(level.key)) score += 10;

        // Match budget preference
        if (preferences.budgetRange === 'low' && plan.estimatedBudget?.max <= 10000) score += 15;
        if (preferences.budgetRange === 'medium' && plan.estimatedBudget?.max <= 20000) score += 15;
        if (preferences.budgetRange === 'high') score += 10;

        return { ...plan, recommendationScore: score };
    });

    return scored
        .sort((a, b) => b.recommendationScore - a.recommendationScore)
        .slice(0, limit);
}

/**
 * Get trending plans based on engagement
 * @param {number} limit - Number of plans
 * @returns {Array} Trending plans
 */
export function getTrendingPlans(limit = 6) {
    return plans
        .sort((a, b) => {
            const scoreA = (a.likes || 0) + (a.views || 0) * 0.1 + (a.bookmarks || 0) * 2;
            const scoreB = (b.likes || 0) + (b.views || 0) * 0.1 + (b.bookmarks || 0) * 2;
            return scoreB - scoreA;
        })
        .slice(0, limit);
}

/**
 * Get nearby destinations based on a destination
 * @param {string} destinationSlug - Current destination slug
 * @param {number} limit - Number of recommendations
 * @returns {Array} Nearby destinations
 */
export function getNearbyDestinations(destinationSlug, limit = 3) {
    const current = destinations.find(d => d.slug === destinationSlug);
    if (!current) return [];

    // Get destinations from nearby spots or same district
    const nearbyIds = current.nearbySpots || [];
    const nearby = destinations.filter(d => nearbyIds.includes(d.id));

    // If not enough nearby, add from same district
    if (nearby.length < limit) {
        const sameDistrict = destinations.filter(d =>
            d.district === current.district &&
            d.id !== current.id &&
            !nearbyIds.includes(d.id)
        );
        nearby.push(...sameDistrict);
    }

    return nearby.slice(0, limit);
}

/**
 * Destination suggestions based on search/filters
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered destinations
 */
export function filterDestinations(filters = {}) {
    let results = [...destinations];

    if (filters.district) {
        results = results.filter(d => d.district === filters.district);
    }

    if (filters.type) {
        results = results.filter(d => d.type === filters.type);
    }

    if (filters.search) {
        const query = filters.search.toLowerCase();
        results = results.filter(d =>
            d.name.toLowerCase().includes(query) ||
            d.description.toLowerCase().includes(query) ||
            d.tags?.some(tag => tag.includes(query))
        );
    }

    if (filters.season) {
        results = results.filter(d => d.bestSeason?.includes(filters.season));
    }

    // Sort
    if (filters.sortBy === 'hype') {
        results.sort((a, b) => b.hypePercentage - a.hypePercentage);
    } else if (filters.sortBy === 'rating') {
        results.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    } else if (filters.sortBy === 'name') {
        results.sort((a, b) => a.name.localeCompare(b.name));
    }

    return results;
}

export default {
    recommendDestinations,
    getTrendingDestinations,
    getSeasonalRecommendations,
    recommendPlans,
    getTrendingPlans,
    getNearbyDestinations,
    filterDestinations,
};
