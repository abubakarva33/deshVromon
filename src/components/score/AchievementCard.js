'use client';

import { Award, MapPin, FileText, Image as ImageIcon, Calendar } from 'lucide-react';
import { Badge } from '../ui/badge';

/**
 * AchievementCard Component
 * Displays unlocked achievements with icons and descriptions
 */
export default function AchievementCard({ achievement, locked = false }) {
    const { id, name, description, icon, unlockedAt } = achievement;

    return (
        <div
            className={`p-4 rounded-xl border ${locked
                    ? 'border-border bg-muted/30 opacity-50'
                    : 'border-accent-primary/30 bg-gradient-to-br from-accent-primary/5 to-orange-500/5'
                } transition-all hover:scale-105`}
        >
            <div className="flex items-start gap-3">
                <div
                    className={`w-12 h-12 rounded-lg ${locked ? 'bg-muted' : 'bg-accent-primary/10'
                        } flex items-center justify-center flex-shrink-0 text-2xl`}
                >
                    {locked ? '🔒' : icon}
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-foreground mb-1">{name}</h4>
                    <p className="text-xs text-muted mb-2">{description}</p>
                    {!locked && unlockedAt && (
                        <div className="flex items-center gap-1.5 text-xs text-muted">
                            <Calendar className="w-3 h-3" />
                            <span>Unlocked: {new Date(unlockedAt).toLocaleDateString()}</span>
                        </div>
                    )}
                    {locked && (
                        <Badge variant="outline" className="text-xs">
                            Locked
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    );
}

/**
 * AchievementGrid Component
 * Grid display of all achievements
 */
export function AchievementGrid({ achievements = [], allAchievements = [] }) {
    const unlockedIds = achievements.map(a => a.id);
    const lockedAchievements = allAchievements.filter(a => !unlockedIds.includes(a.id));

    return (
        <div>
            {achievements.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-accent-primary" />
                        Unlocked Achievements ({achievements.length})
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {achievements.map((achievement) => (
                            <AchievementCard key={achievement.id} achievement={achievement} />
                        ))}
                    </div>
                </div>
            )}

            {lockedAchievements.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                        Locked Achievements ({lockedAchievements.length})
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {lockedAchievements.map((achievement) => (
                            <AchievementCard key={achievement.id} achievement={achievement} locked />
                        ))}
                    </div>
                </div>
            )}

            {achievements.length === 0 && allAchievements.length === 0 && (
                <div className="text-center py-12">
                    <Award className="w-16 h-16 text-muted mx-auto mb-4" />
                    <p className="text-muted">Start exploring to unlock achievements!</p>
                </div>
            )}
        </div>
    );
}
