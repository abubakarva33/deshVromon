/**
 * Travel Stories Data
 * User-generated travel content with photos and videos
 */

export const stories = [
    {
        id: 'story-1',
        title: 'Sunset at Inani Beach',
        titleBn: 'ইনানী সৈকতে সূর্যাস্ত',
        author: 'user-2',
        authorName: 'Fatima Khan',
        authorAvatar: '/images/avatars/user-2.jpg',
        destination: 'inani-beach',
        district: 'coxs-bazar',
        coverImage: '/images/stories/inani-sunset-1.jpg',
        media: [
            { type: 'image', url: '/images/stories/inani-sunset-1.jpg', caption: 'Golden hour at Inani' },
            { type: 'image', url: '/images/stories/inani-sunset-2.jpg', caption: 'Coral stones during low tide' },
            { type: 'image', url: '/images/stories/inani-sunset-3.jpg', caption: 'Peaceful evening' },
        ],
        content: 'One of the most peaceful sunsets I\'ve ever witnessed. The coral stones during low tide create a unique landscape unlike any other beach in Bangladesh.',
        tags: ['sunset', 'beach', 'nature', 'photography'],
        likes: 542,
        comments: 34,
        views: 3421,
        createdAt: '2023-11-15',
        featured: true,
    },
    {
        id: 'story-2',
        title: 'Clouds at Nilgiri',
        titleBn: 'নীলগিরিতে মেঘ',
        author: 'user-1',
        authorName: 'Ahmed Rahman',
        destination: 'nilgiri',
        district: 'bandarban',
        coverImage: '/images/stories/nilgiri-clouds-1.jpg',
        media: [
            { type: 'image', url: '/images/stories/nilgiri-clouds-1.jpg', caption: 'Touching the clouds' },
            { type: 'image', url: '/images/stories/nilgiri-clouds-2.jpg', caption: 'Misty mountains' },
        ],
        content: 'Standing above the clouds at Nilgiri is a surreal experience. The winding roads and breathtaking views make every moment memorable.',
        tags: ['hills', 'clouds', 'adventure'],
        likes: 789,
        comments: 56,
        views: 5234,
        createdAt: '2023-10-28',
        featured: true,
    },
    {
        id: 'story-3',
        title: 'Boat Ride in Ratargul',
        titleBn: 'রাতারগুলে নৌকা ভ্রমণ',
        author: 'user-3',
        authorName: 'Karim Hossain',
        destination: 'ratargul',
        district: 'sylhet',
        coverImage: '/images/stories/ratargul-boat-1.jpg',
        media: [
            { type: 'image', url: '/images/stories/ratargul-boat-1.jpg', caption: 'Floating through the forest' },
            { type: 'image', url: '/images/stories/ratargul-boat-2.jpg', caption: 'The magic of swamp forest' },
        ],
        content: 'Ratargul swamp forest is pure magic. Floating through the submerged forest feels like entering another world.',
        tags: ['nature', 'boat', 'forest'],
        likes: 456,
        comments: 28,
        views: 2134,
        createdAt: '2023-11-05',
        featured: false,
    },
];

export const getStoryById = (id) => stories.find(s => s.id === id);
export const getStoriesByAuthor = (authorId) => stories.filter(s => s.author === authorId);
export const getStoriesByDestination = (destinationId) => stories.filter(s => s.destination === destinationId);
export const getFeaturedStories = (limit = 3) => stories.filter(s => s.featured).slice(0, limit);

export default stories;
