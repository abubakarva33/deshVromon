/**
 * Food and Local Cuisine Data
 */

export const foodGuide = [
    {
        id: 'food-1',
        name: 'Chittagong Mejbani Mangsho',
        nameBn: 'চট্টগ্রামের মেজবানী মাংস',
        district: 'chittagong',
        type: 'main-course',
        description: 'Traditional spicy beef curry, a signature dish of Chittagong',
        image: '/images/food/mejbani-1.jpg',
        priceRange: { min: 200, max: 500 },
        bestPlaces: [
            { name: 'Mezban Restaurant', location: 'Agrabad', rating: 4.5 },
            { name: 'AR Rahman Hotel', location: 'Chawkbazar', rating: 4.3 },
        ],
        featured: true,
    },
    {
        id: 'food-2',
        name: 'Cox\'s Bazar Seafood',
        nameBn: 'কক্সবাজার সামুদ্রিক খাবার',
        district: 'coxs-bazar',
        type: 'seafood',
        description: 'Fresh seafood including lobster, crab, and various fish preparations',
        image: '/images/food/seafood-cb-1.jpg',
        priceRange: { min: 300, max: 2000 },
        bestPlaces: [
            { name: 'EFC Seafood Restaurant', location: 'Beach Road', rating: 4.6 },
            { name: 'Niribili Restaurant', location: 'Laboni Point', rating: 4.4 },
        ],
        featured: true,
    },
    {
        id: 'food-3',
        name: 'Sylheti Shtikh Kebab',
        nameBn: 'সিলেটি শীক কাবাব',
        district: 'sylhet',
        type: 'kebab',
        description: 'Spicy minced meat kebab unique to Sylhet region',
        image: '/images/food/sylhet-kebab-1.jpg',
        priceRange: { min: 150, max: 400 },
        bestPlaces: [
            { name: 'Panshi Restaurant', location: 'Zindabazar', rating: 4.5 },
            { name: 'Woondaal', location: 'Amberkhana', rating: 4.3 },
        ],
        featured: false,
    },
    {
        id: 'food-4',
        name: 'Dhaka Kacchi Biriyani',
        nameBn: 'ঢাকার কাচ্চি বিরিয়ানি',
        district: 'dhaka',
        type: 'biriyani',
        description: 'Slow-cooked aromatic rice dish with mutton or chicken',
        image: '/images/food/kacchi-1.jpg',
        priceRange: { min: 250, max: 800 },
        bestPlaces: [
            { name: 'Haji Biriyani', location: 'Old Dhaka', rating: 4.7 },
            { name: 'Star Kabab', location: 'Dhanmondi', rating: 4.6 },
        ],
        featured: true,
    },
    {
        id: 'food-5',
        name: 'Khulna Chui Jhal',
        nameBn: 'খুলনার চুই ঝাল',
        district: 'khulna',
        type: 'curry',
        description: 'Special curry made with climbing perch fish and a unique spicy root',
        image: '/images/food/chui-jhal-1.jpg',
        priceRange: { min: 300, max: 700 },
        bestPlaces: [
            { name: 'Nirala Restaurant', location: 'Khulna City', rating: 4.4 },
        ],
        featured: true,
    },
];

export const getFoodByDistrict = (district) => foodGuide.filter(f => f.district === district);
export const getFoodByType = (type) => foodGuide.filter(f => f.type === type);
export const getFeaturedFood = () => foodGuide.filter(f => f.featured);

export default foodGuide;
