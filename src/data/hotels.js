/**
 * Hotels and Accommodations Data
 */

export const hotels = [
    {
        id: 'hotel-1',
        name: 'Sea Pearl Beach Resort & Spa',
        nameBn: 'সি পার্ল বীচ রিসোর্ট',
        district: 'coxs-bazar',
        type: 'resort',
        rating: 4.5,
        totalReviews: 842,
        pricePerNight: 8000,
        priceRange: {
            min: 8000,
            max: 25000,
            currency: 'BDT',
        },
        description: 'Luxury beachfront resort with modern amenities and stunning sea views.',
        images: [
            '/images/hotels/sea-pearl-1.jpg',
            '/images/hotels/sea-pearl-2.jpg',
        ],
        location: {
            address: 'Marine Drive Road, Jhilwanja, Cox\'s Bazar',
            coordinates: { lat: 21.4272, lng: 92.0058 },
        },
        amenities: ['WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Beach Access', 'Room Service', 'Gym', 'Parking'],
        roomTypes: [
            { type: 'Standard Room', price: 8000, capacity: 2 },
            { type: 'Deluxe Sea View', price: 15000, capacity: 2 },
            { type: 'Suite', price: 25000, capacity: 4 },
        ],
        nearbyDestinations: ['coxs-bazar-beach', 'inani-beach'],
        featured: true,
    },
    {
        id: 'hotel-2',
        name: 'Hotel The Cox Today',
        nameBn: 'হোটেল দ্য কক্স টুডে',
        district: 'coxs-bazar',
        type: 'hotel',
        rating: 4.2,
        totalReviews: 523,
        pricePerNight: 4000,
        priceRange: {
            min: 4000,
            max: 10000,
            currency: 'BDT',
        },
        description: 'Comfortable hotel near the beach with excellent service.',
        images: ['/images/hotels/cox-today-1.jpg'],
        location: {
            address: 'Beach Road, Cox\'s Bazar',
            coordinates: { lat: 21.4294, lng: 91.9794 },
        },
        amenities: ['wifi', 'restaurant', 'parking'],
        roomTypes: [
            { type: 'Standard', price: 4000, capacity: 2 },
            { type: 'Deluxe', price: 7000, capacity: 3 },
            { type: 'Family Room', price: 10000, capacity: 4 },
        ],
        nearbyDestinations: ['coxs-bazar-beach'],
        featured: false,
    },
    {
        id: 'hotel-3',
        name: 'Nilgiri Resort',
        nameBn: 'নীলগিরি রিসোর্ট',
        district: 'bandarban',
        type: 'resort',
        rating: 4.3,
        totalReviews: 312,
        pricePerNight: 3500,
        priceRange: {
            min: 3500,
            max: 8000,
            currency: 'BDT',
        },
        description: 'Hilltop resort offering breathtaking cloud-touching views.',
        images: ['/images/hotels/nilgiri-resort-1.jpg'],
        location: {
            address: 'Nilgiri Hills, Bandarban',
            coordinates: { lat: 21.8500, lng: 92.3500 },
        },
        amenities: ['restaurant', 'parking', 'breakfast'],
        roomTypes: [
            { type: 'Standard Cottage', price: 3500, capacity: 2 },
            { type: 'Deluxe Cottage', price: 6000, capacity: 3 },
            { type: 'Premium View', price: 8000, capacity: 4 },
        ],
        nearbyDestinations: ['nilgiri'],
        featured: true,
    },
    {
        id: 'hotel-4',
        name: 'Rose View Hotel',
        nameBn: 'রোজ ভিউ হোটেল',
        district: 'sylhet',
        type: 'hotel',
        rating: 4.0,
        totalReviews: 421,
        pricePerNight: 3000,
        priceRange: {
            min: 3000,
            max: 7000,
            currency: 'BDT',
        },
        description: 'Comfortable stay in the heart of Sylhet city.',
        images: ['/images/hotels/rose-view-1.jpg'],
        location: {
            address: 'Zindabazar, Sylhet',
            coordinates: { lat: 24.8949, lng: 91.8687 },
        },
        amenities: ['wifi', 'restaurant', 'parking'],
        roomTypes: [
            { type: 'Standard', price: 3000, capacity: 2 },
            { type: 'Deluxe', price: 5000, capacity: 2 },
            { type: 'Executive', price: 7000, capacity: 3 },
        ],
        nearbyDestinations: ['ratargul', 'jaflong'],
        featured: false,
    },
    {
        id: 'hotel-5',
        name: 'Hotel Sundarban',
        nameBn: 'হোটেল সুন্দরবন',
        district: 'khulna',
        type: 'hotel',
        rating: 3.8,
        totalReviews: 234,
        pricePerNight: 2500,
        priceRange: {
            min: 2500,
            max: 5000,
            currency: 'BDT',
        },
        description: 'Budget-friendly hotel for Sundarbans travelers.',
        images: ['/images/hotels/sundarban-hotel-1.jpg'],
        location: {
            address: 'KDA Avenue, Khulna',
            coordinates: { lat: 22.8456, lng: 89.5403 },
        },
        amenities: ['wifi', 'restaurant', 'parking'],
        roomTypes: [
            { type: 'Standard', price: 2500, capacity: 2 },
            { type: 'Deluxe', price: 4000, capacity: 3 },
            { type: 'Family', price: 5000, capacity: 4 },
        ],
        nearbyDestinations: ['sundarbans'],
        featured: false,
    },
];

export const getHotelById = (id) => hotels.find(h => h.id === id);
export const getHotelsByDistrict = (district) => hotels.filter(h => h.district === district);
export const getFeaturedHotels = () => hotels.filter(h => h.featured);

export default hotels;
