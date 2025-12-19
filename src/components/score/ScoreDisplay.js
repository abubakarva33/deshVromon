'use client';

import { Award, TrendingUp } from 'lucide-react';
import { Progress } from '../ui/progress';

/**
 * ScoreDisplay Component
 * Visual representation of user's travel score and level
 */
export default function ScoreDisplay({ score, level, showProgress = true, size = 'md' }) {
    const { name, icon, minScore, maxScore } = level;

    // Calculate progress to next level
    const range = maxScore === Infinity ? 1000 : maxScore - minScore + 1;
    const progress = maxScore === Infinity ? 100 : ((score - minScore) / range) * 100;
    const pointsToNext = maxScore === Infinity ? 0 : maxScore - score + 1;

    const sizeClasses = {
        sm: {
            container: 'p-3',
            score: 'text-2xl',
            label: 'text-xs',
            icon: 'text-3xl',
        },
        md: {
            container: 'p-4',
            score: 'text-3xl',
            label: 'text-sm',
            icon: 'text-4xl',
        },
        lg: {
            container: 'p-6',
            score: 'text-5xl',
            label: 'text-base',
            icon: 'text-6xl',
        },
    };

    const classes = sizeClasses[size];

    return (
        <div className={`${classes.container} rounded-xl border border-border bg-gradient-to-br from-secondary to-hover`}>
            <div className="flex items-center justify-between mb-3">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className={classes.icon}>{icon}</span>
                        <span className={`font-bold text-foreground ${classes.label}`}>{name}</span>
                    </div>
                    <div className={`font-bold ${classes.score} bg-gradient-to-r from-accent-primary to-orange-600 bg-clip-text text-transparent`}>
                        {score.toLocaleString()}
                    </div>
                    <div className={`${classes.label} text-muted font-medium`}>Travel Score</div>
                </div>
                <Award className="w-16 h-16 text-accent-primary/20" />
            </div>

            {showProgress && maxScore !== Infinity && (
                <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted">Progress to Next Level</span>
                        <span className="text-xs font-semibold text-foreground">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted mt-1.5">
                        <TrendingUp className="inline w-3 h-3 mr-1" />
                        {pointsToNext} points to next level
                    </p>
                </div>
            )}

            {maxScore === Infinity && (
                <div className="mt-3 p-2 bg-accent-primary/10 rounded-lg border border-accent-primary/20">
                    <p className="text-xs font-semibold text-accent-primary text-center">
                        🏆 Maximum Level Reached!
                    </p>
                </div>
            )}
        </div>
    );
}

/**
 * LevelBadge Component
 * Small badge showing user level
 */
export function LevelBadge({ level, size = 'md' }) {
    const { name, icon } = level;

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs gap-1',
        md: 'px-3 py-1.5 text-sm gap-1.5',
        lg: 'px-4 py-2 text-base gap-2',
    };

    return (
        <div className={`inline-flex items-center ${sizeClasses[size]} bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-full font-semibold text-purple-700 dark:text-purple-300`}>
            <span>{icon}</span>
            <span>{name}</span>
        </div>
    );
}
