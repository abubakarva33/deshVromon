/**
 * Travel Agencies Data
 */

export const agencies = [
    {
        id: 'agency-1',
        name: 'Bangladesh Tours & Travels',
        nameBn: 'বাংলাদেশ ট্যুরস এন্ড ট্রাভেলস',
        slug: 'bangladesh-tours',
        logo: '/images/agencies/bd-tours-logo.jpg',
        coverImage: '/images/agencies/bd-tours-cover.jpg',
        description: 'Premium tour operator specializing in customized Bangladesh tours since 2015.',
        rating: 4.7,
        totalReviews: 342,
        established: '2015',
        license: 'TOUR-BD-2022-1234',
        location: 'Dhaka, Bangladesh',
        contact: {
            phone: '+880 1700-000000',
            email: 'info@bdtours.com',
            website: 'www.bdtours.com',
        },
        specializations: ['Hill Tracts', 'Beach Tours', 'Cultural Tours', 'Wildlife Safari'],
        serviceAreas: ['dhaka', 'coxs-bazar', 'bandarban', 'sylhet', 'khulna'],
        packages: [
            {
                id: 'pkg-1',
                name: 'Cox\'s Bazar Special',
                duration: 3,
                price: { min: 8000, max: 12000 },
                description: 'All-inclusive Cox\'s Bazar beach tour package',
                inclusions: ['Transport', 'Hotel', 'Meals', 'Guide'],
                featured: true,
            },
            {
                id: 'pkg-2',
                name: 'Hill Tracts Adventure',
                duration: 5,
                price: { min: 15000, max: 25000 },
                description: 'Complete Bandarban and Rangamati tour',
                inclusions: ['Transport', 'Accommodation', 'All Meals', 'Guide', 'Permits'],
                featured: true,
            },
        ],
        stats: {
            toursCompleted: 1500,
            happyCustomers: 3500,
            destinations: 25,
        },
        verified: true,
        featured: true,
    },
    {
        id: 'agency-2',
        name: 'Adventure Bangladesh',
        nameBn: 'অ্যাডভেঞ্চার বাংলাদেশ',
        slug: 'adventure-bangladesh',
        logo: '/images/agencies/adventure-bd-logo.jpg',
        coverImage: '/images/agencies/adventure-bd-cover.jpg',
        description: 'Specialized in trekking and adventure tours in Bangladesh.',
        rating: 4.5,
        totalReviews: 218,
        established: '2018',
        license: 'TOUR-BD-2023-5678',
        location: 'Chittagong, Bangladesh',
        contact: {
            phone: '+880 1800-111111',
            email: 'info@adventurebd.com',
        },
        specializations: ['Trekking', 'Camping', 'Rock Climbing', 'Adventure Sports'],
        serviceAreas: ['bandarban', 'rangamati', 'khagrachari', 'sylhet'],
        packages: [
            {
                id: 'pkg-3',
                name: 'Nafakhum Trek',
                duration: 4,
                price: { min: 12000, max: 18000 },
                description: 'Challenging trek to Bangladesh\'s largest waterfall',
                inclusions: ['Guide', 'Camping Gear', 'Meals', 'Permits'],
                featured: true,
            },
        ],
        stats: {
            toursCompleted: 450,
            happyCustomers: 890,
            destinations: 15,
        },
        verified: true,
        featured: false,
    },
    {
        id: 'agency-3',
        name: 'Eco Tourism BD',
        nameBn: 'ইকো ট্যুরিজম বিডি',
        slug: 'eco-tourism-bd',
        logo: '/images/agencies/eco-logo.jpg',
        coverImage: '/images/agencies/eco-cover.jpg',
        description: 'Sustainable and eco-friendly tourism focused on nature and wildlife.',
        rating: 4.8,
        totalReviews: 156,
        established: '2019',
        license: 'TOUR-BD-2023-9012',
        location: 'Khulna, Bangladesh',
        contact: {
            phone: '+880 1900-222222',
            email: 'contact@ecotourismbd.com',
        },
        specializations: ['Sundarbans', 'Wildlife Safari', 'Bird Watching', 'Eco Tours'],
        serviceAreas: ['khulna', 'satkhira', 'barisal'],
        packages: [
            {
                id: 'pkg-4',
                name: 'Sundarbans Wildlife Safari',
                duration: 3,
                price: { min: 18000, max: 30000 },
                description: 'Premium Sundarbans boat safari with wildlife watching',
                inclusions: ['Boat', 'Meals', 'Guide', 'Permits', 'Accommodation on Boat'],
                featured: true,
            },
        ],
        stats: {
            toursCompleted: 320,
            happyCustomers: 750,
            destinations: 8,
        },
        verified: true,
        featured: true,
    },
];

export const getAgencyById = (id) => agencies.find(a => a.id === id);
export const getAgencyBySlug = (slug) => agencies.find(a => a.slug === slug);
export const getFeaturedAgencies = () => agencies.filter(a => a.featured);

export default agencies;
