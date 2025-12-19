'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, Bookmark, MapPin, MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useState } from 'react';

/**
 * StoryCard Component
 * Displays a travel story with image, content, and engagement metrics
 */
export default function StoryCard({ story, variant = 'default' }) {
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [likes, setLikes] = useState(story.likes || 0);

    const {
        id,
        title,
        content,
        media,
        coverImage,
        authorName,
        authorAvatar,
        destination,
        district,
        createdAt,
        likes: initialLikes,
        comments,
        shares = 0,
        tags,
    } = story;

    const images = media?.map(m => m.url) || (coverImage ? [coverImage] : []);
    const author = { name: authorName, avatar: authorAvatar, id: story.author };

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
    };

    const handleSave = () => {
        setIsSaved(!isSaved);
    };

    if (variant === 'compact') {
        return (
            <Link href={`/stories/${id}`} className="group block">
                <div className="flex gap-4 p-4 rounded-lg border border-border hover:border-accent-primary/50 transition-smooth bg-secondary">
                    {images && images.length > 0 && (
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                                src={images[0]}
                                alt={title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-accent-primary transition-colors mb-1">
                            {title}
                        </h3>
                        <p className="text-sm text-secondary line-clamp-2 mb-2">{content}</p>
                        <div className="flex items-center gap-3 text-xs text-muted">
                            <span className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {likes}
                            </span>
                            <span className="flex items-center gap-1">
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
        <div className="rounded-xl border border-border overflow-hidden bg-secondary">
            {/* Author Header */}
            <div className="flex items-center justify-between p-4 pb-3">
                <Link href={`/profile/${author.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
                        {author.avatar ? (
                            <Image
                                src={author.avatar}
                                alt={author.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-foreground font-semibold">
                                {author.name[0]}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="font-semibold text-sm text-foreground">{author.name}</div>
                        <div className="text-xs text-muted flex items-center gap-1">
                            {destination && (
                                <>
                                    <MapPin className="w-3 h-3" />
                                    {district}
                                </>
                            )}
                        </div>
                    </div>
                </Link>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </div>

            {/* Image Gallery */}
            {images && images.length > 0 && (
                <Link href={`/stories/${id}`}>
                    <div className="relative aspect-square bg-muted cursor-pointer group">
                        <Image
                            src={images[0]}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {images.length > 1 && (
                            <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-semibold">
                                +{images.length - 1}
                            </div>
                        )}
                    </div>
                </Link>
            )}

            {/* Actions */}
            <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLike}
                            className="flex items-center gap-1.5 group transition-transform hover:scale-110"
                        >
                            <Heart
                                className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-foreground group-hover:text-red-500'
                                    }`}
                            />
                            <span className="text-sm font-semibold text-foreground">{likes}</span>
                        </button>
                        <Link href={`/stories/${id}#comments`} className="flex items-center gap-1.5 group">
                            <MessageCircle className="w-5 h-5 text-foreground group-hover:text-blue-500 transition-colors" />
                            <span className="text-sm font-semibold text-foreground">{comments}</span>
                        </Link>
                        <button className="flex items-center gap-1.5 group">
                            <Share2 className="w-5 h-5 text-foreground group-hover:text-green-500 transition-colors" />
                            <span className="text-sm font-semibold text-foreground">{shares}</span>
                        </button>
                    </div>
                    <button
                        onClick={handleSave}
                        className="transition-transform hover:scale-110"
                    >
                        <Bookmark
                            className={`w-5 h-5 ${isSaved ? 'fill-accent-primary text-accent-primary' : 'text-foreground'
                                }`}
                        />
                    </button>
                </div>

                {/* Content */}
                <div className="mb-3">
                    <Link href={`/stories/${id}`}>
                        <h3 className="font-bold text-foreground mb-1 hover:text-accent-primary transition-colors">
                            {title}
                        </h3>
                    </Link>
                    <p className="text-sm text-secondary line-clamp-3">{content}</p>
                </div>

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {tags.slice(0, 3).map((tag) => (
                            <Link
                                key={tag}
                                href={`/stories?tag=${tag}`}
                                className="text-xs text-accent-primary hover:underline"
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Timestamp */}
                <div className="text-xs text-muted">
                    {new Date(createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </div>
            </div>
        </div>
    );
}

/**
 * StoryGrid Component
 * Grid layout for multiple stories
 */
export function StoryGrid({ stories, columns = 3 }) {
    if (!stories || stories.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted">No stories found</p>
            </div>
        );
    }

    const gridCols = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <div className={`grid ${gridCols[columns]} gap-6`}>
            {stories.map((story) => (
                <StoryCard key={story.id} story={story} />
            ))}
        </div>
    );
}
