'use client';

import { TrendingUp, Flame } from 'lucide-react';

/**
 * HypeIndicator Component
 * Visual indicator of destination popularity/hype
 */
export default function HypeIndicator({ percentage, size = 'md', showLabel = true }) {
    // Get color based on hype level
    const getHypeColor = () => {
        if (percentage >= 90) return {
            bg: 'bg-red-500/10',
            text: 'text-red-600',
            border: 'border-red-500/30',
            gradient: 'from-red-500 to-orange-600'
        };
        if (percentage >= 75) return {
            bg: 'bg-orange-500/10',
            text: 'text-orange-600',
            border: 'border-orange-500/30',
            gradient: 'from-orange-500 to-yellow-600'
        };
        if (percentage >= 60) return {
            bg: 'bg-yellow-500/10',
            text: 'text-yellow-600',
            border: 'border-yellow-500/30',
            gradient: 'from-yellow-500 to-green-500'
        };
        return {
            bg: 'bg-green-500/10',
            text: 'text-green-600',
            border: 'border-green-500/30',
            gradient: 'from-green-500 to-emerald-600'
        };
    };

    const colors = getHypeColor();

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs gap-1',
        md: 'px-3 py-1.5 text-sm gap-1.5',
        lg: 'px-4 py-2 text-base gap-2',
    };

    const iconSizes = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
    };

    return (
        <div className={`inline-flex items-center ${sizeClasses[size]} ${colors.bg} ${colors.border} border rounded-full font-semibold ${colors.text}`}>
            {percentage >= 85 ? (
                <Flame className={`${iconSizes[size]} animate-pulse-hype`} />
            ) : (
                <TrendingUp className={iconSizes[size]} />
            )}
            <span>{percentage}%</span>
            {showLabel && size !== 'sm' && (
                <span className="hidden sm:inline text-xs font-normal opacity-80">Hype</span>
            )}
        </div>
    );
}

/**
 * HypeBar Component
 * Progress bar visualization of hype
 */
export function HypeBar({ percentage, showPercentage = true }) {
    const getHypeGradient = () => {
        if (percentage >= 90) return 'bg-gradient-to-r from-red-500 to-orange-600';
        if (percentage >= 75) return 'bg-gradient-to-r from-orange-500 to-yellow-600 ';
        if (percentage >= 60) return 'bg-gradient-to-r from-yellow-500 to-green-500';
        return 'bg-gradient-to-r from-green-500 to-emerald-600';
    };

    return (
        <div className="w-full">
            {showPercentage && (
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-secondary">Popularity</span>
                    <span className="text-sm font-bold text-foreground">{percentage}%</span>
                </div>
            )}
            <div className="w-full bg-hover rounded-full h-2 overflow-hidden">
                <div
                    className={`h-full ${getHypeGradient()} transition-all duration-1000 ease-out rounded-full`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
