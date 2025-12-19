import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Heart, MessageCircle, Share2, Bookmark, MapPin, Calendar, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { stories, getStoryById } from '@/data/stories';
import { StoryCard } from '@/components/community/StoryCard';

export async function generateStaticParams() {
    return stories.map((story) => ({
        id: story.id,
    }));
}

export async function generateMetadata({ params }) {
    const story = getStoryById(params.id);

    if (!story) {
        return {
            title: 'Story Not Found | DeshVromon',
        };
    }

    return {
        title: `${story.title} | DeshVromon Stories`,
        description: story.content,
    };
}

export default function StoryDetailPage({ params }) {
    const story = getStoryById(params.id);

    if (!story) {
        notFound();
    }

    const {
        title,
        titleBn,
        authorName,
        authorAvatar,
        destination,
        district,
        coverImage,
        media,
        content,
        tags,
        likes,
        comments,
        views,
        createdAt,
    } = story;

    const images = media?.map(m => m.url) || (coverImage ? [coverImage] : []);

    // Get related stories (same destination or district)
    const relatedStories = stories
        .filter(s => s.id !== story.id && (s.destination === destination || s.district === district))
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-primary">
            {/* Header with back button */}
            <div className="sticky top-0 z-10 bg-primary/95 backdrop-blur-sm border-b border-border">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/community">
                        <Button variant="ghost" size="sm">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Stories
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                            <Bookmark className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Story Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                        {title}
                    </h1>
                    {titleBn && (
                        <h2 className="text-2xl text-secondary mb-6">{titleBn}</h2>
                    )}

                    {/* Author Info */}
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <Link href={`/profile/${story.author}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                                {authorAvatar ? (
                                    <Image
                                        src={authorAvatar}
                                        alt={authorName}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-foreground font-semibold text-lg">
                                        {authorName[0]}
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="font-semibold text-foreground">{authorName}</div>
                                <div className="text-sm text-muted flex items-center gap-2">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                    {destination && (
                                        <>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {district}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Link>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-muted">
                            <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {views.toLocaleString()} views
                            </span>
                            <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {likes}
                            </span>
                            <span className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                {comments}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Image Gallery */}
                {images && images.length > 0 && (
                    <div className="mb-8">
                        {images.length === 1 ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                                <Image
                                    src={images[0]}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                {images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`relative rounded-xl overflow-hidden bg-muted ${idx === 0 ? 'col-span-2 aspect-video' : 'aspect-square'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${title} - Image ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                        {media && media[idx]?.caption && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                                <p className="text-white text-sm">{media[idx].caption}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                    <p className="text-lg text-foreground leading-relaxed whitespace-pre-wrap">
                        {content}
                    </p>
                </div>

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {tags.map((tag) => (
                            <Link
                                key={tag}
                                href={`/community?tag=${tag}`}
                                className="px-3 py-1.5 rounded-full bg-secondary border border-border text-sm text-accent-primary hover:bg-accent-primary hover:text-white transition-colors"
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Engagement Bar */}
                <div className="flex items-center justify-between p-6 rounded-xl border border-border bg-secondary mb-8">
                    <div className="flex items-center gap-4">
                        <Button className="gap-2">
                            <Heart className="w-5 h-5" />
                            Like ({likes})
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <Share2 className="w-5 h-5" />
                            Share
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <Bookmark className="w-5 h-5" />
                            Save
                        </Button>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-foreground mb-6">
                        Comments ({comments})
                    </h3>

                    {/* Comment Form */}
                    <div className="mb-8 p-6 rounded-xl border border-border bg-secondary">
                        <textarea
                            placeholder="Share your thoughts about this story..."
                            className="w-full min-h-[100px] p-4 rounded-lg border border-border bg-primary text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-accent-primary"
                        />
                        <div className="flex justify-end mt-3">
                            <Button>Post Comment</Button>
                        </div>
                    </div>

                    {/* Sample Comments */}
                    <div className="space-y-6">
                        {[
                            {
                                id: 1,
                                author: 'Rahim Ahmed',
                                avatar: null,
                                content: 'Amazing photos! I visited this place last month and it was incredible.',
                                date: '2 days ago',
                            },
                            {
                                id: 2,
                                author: 'Sadia Rahman',
                                avatar: null,
                                content: 'Thanks for sharing! Adding this to my travel bucket list 🌟',
                                date: '1 day ago',
                            },
                        ].map((comment) => (
                            <div key={comment.id} className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground font-semibold flex-shrink-0">
                                    {comment.author[0]}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-foreground">{comment.author}</span>
                                        <span className="text-sm text-muted">{comment.date}</span>
                                    </div>
                                    <p className="text-secondary">{comment.content}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <button className="text-sm text-muted hover:text-accent-primary transition-colors">
                                            Reply
                                        </button>
                                        <button className="text-sm text-muted hover:text-accent-primary transition-colors">
                                            Like
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related Stories */}
                {relatedStories.length > 0 && (
                    <div>
                        <h3 className="text-2xl font-bold text-foreground mb-6">
                            Related Stories
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedStories.map((relatedStory) => (
                                <StoryCard key={relatedStory.id} story={relatedStory} variant="compact" />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
