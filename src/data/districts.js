/**
 * Bangladesh Districts Data
 * Organized by divisions with metadata
 */

export const divisions = [
    { id: 'dhaka', name: 'Dhaka', nameBn: 'ঢাকা' },
    { id: 'chittagong', name: 'Chittagong', nameBn: 'চট্টগ্রাম' },
    { id: 'rajshahi', name: 'Rajshahi', nameBn: 'রাজশাহী' },
    { id: 'khulna', name: 'Khulna', nameBn: 'খুলনা' },
    { id: 'barisal', name: 'Barisal', nameBn: 'বরিশাল' },
    { id: 'sylhet', name: 'Sylhet', nameBn: 'সিলেট' },
    { id: 'rangpur', name: 'Rangpur', nameBn: 'রংপুর' },
    { id: 'mymensingh', name: 'Mymensingh', nameBn: 'ময়মনসিংহ' },
];

export const districts = [
    // Dhaka Division
    {
        id: 'dhaka',
        name: 'Dhaka',
        nameBn: 'ঢাকা',
        division: 'dhaka',
        slug: 'dhaka',
        description: 'The capital city of Bangladesh, a vibrant metropolis blending history and modernity.',
        image: '/images/districts/dhaka.jpg',
        destinationsCount: 15,
        popularDestinations: ['lalbagh-fort', 'ahsan-manzil', 'national-museum'],
        featured: true,
    },
    {
        id: 'gazipur',
        name: 'Gazipur',
        nameBn: 'গাজীপুর',
        division: 'dhaka',
        slug: 'gazipur',
        description: 'Known for its resorts, parks, and historical sites.',
        image: '/images/districts/gazipur.jpg',
        destinationsCount: 8,
        popularDestinations: ['bhawal-national-park', 'fantasy-kingdom'],
        featured: false,
    },
    {
        id: 'tangail',
        name: 'Tangail',
        nameBn: 'টাঙ্গাইল',
        division: 'dhaka',
        slug: 'tangail',
        description: 'Famous for traditional handloom sarees and scenic beauty.',
        image: '/images/districts/tangail.jpg',
        destinationsCount: 6,
        popularDestinations: ['atia-mosque', 'madhupur-forest'],
        featured: false,
    },

    // Chittagong Division
    {
        id: 'chittagong',
        name: 'Chittagong',
        nameBn: 'চট্টগ্রাম',
        division: 'chittagong',
        slug: 'chittagong',
        description: 'The port city with beautiful hill areas and beaches.',
        image: '/images/districts/chittagong.jpg',
        destinationsCount: 20,
        popularDestinations: ['patenga-beach', 'foys-lake', 'war-cemetery'],
        featured: true,
    },
    {
        id: 'coxs-bazar',
        name: "Cox's Bazar",
        nameBn: 'কক্সবাজার',
        division: 'chittagong',
        slug: 'coxs-bazar',
        description: 'Home to the world\'s longest natural sea beach.',
        image: '/images/districts/coxs-bazar.jpg',
        destinationsCount: 12,
        popularDestinations: ['coxs-bazar-beach', 'inani-beach', 'himchari'],
        featured: true,
    },
    {
        id: 'rangamati',
        name: 'Rangamati',
        nameBn: 'রাঙ্গামাটি',
        division: 'chittagong',
        slug: 'rangamati',
        description: 'The lake district with stunning hills and indigenous culture.',
        image: '/images/districts/rangamati.jpg',
        destinationsCount: 10,
        popularDestinations: ['kaptai-lake', 'hanging-bridge', 'shuvolong-waterfall'],
        featured: true,
    },
    {
        id: 'bandarban',
        name: 'Bandarban',
        nameBn: 'বান্দরবান',
        division: 'chittagong',
        slug: 'bandarban',
        description: 'The most scenic hill district with majestic mountains.',
        image: '/images/districts/bandarban.jpg',
        destinationsCount: 14,
        popularDestinations: ['nilgiri', 'nafakhum', 'boga-lake'],
        featured: true,
    },
    {
        id: 'khagrachari',
        name: 'Khagrachari',
        nameBn: 'খাগড়াছড়ি',
        division: 'chittagong',
        slug: 'khagrachari',
        description: 'Known for its hills, waterfalls, and tribal heritage.',
        image: '/images/districts/khagrachari.jpg',
        destinationsCount: 8,
        popularDestinations: ['alutila-cave', 'richhang-waterfall'],
        featured: false,
    },

    // Sylhet Division
    {
        id: 'sylhet',
        name: 'Sylhet',
        nameBn: 'সিলেট',
        division: 'sylhet',
        slug: 'sylhet',
        description: 'The land of tea gardens and spiritual tourism.',
        image: '/images/districts/sylhet.jpg',
        destinationsCount: 18,
        popularDestinations: ['ratargul', 'jaflong', 'tea-gardens'],
        featured: true,
    },
    {
        id: 'moulvibazar',
        name: 'Moulvibazar',
        nameBn: 'মৌলভীবাজার',
        division: 'sylhet',
        slug: 'moulvibazar',
        description: 'Tea capital of Bangladesh with lush green landscapes.',
        image: '/images/districts/moulvibazar.jpg',
        destinationsCount: 10,
        popularDestinations: ['lawachara', 'madhabpur-lake', 'ham-ham'],
        featured: true,
    },

    // Rajshahi Division
    {
        id: 'rajshahi',
        name: 'Rajshahi',
        nameBn: 'রাজশাহী',
        division: 'rajshahi',
        slug: 'rajshahi',
        description: 'The silk city with historical Buddhist heritage.',
        image: '/images/districts/rajshahi.jpg',
        destinationsCount: 12,
        popularDestinations: ['puthia-rajbari', 'varendra-museum'],
        featured: false,
    },
    {
        id: 'bogra',
        name: 'Bogra',
        nameBn: 'বগুড়া',
        division: 'rajshahi',
        slug: 'bogra',
        description: 'Ancient city with archaeological wonders.',
        image: '/images/districts/bogra.jpg',
        destinationsCount: 9,
        popularDestinations: ['mahasthangarh', 'paharpur'],
        featured: false,
    },

    // Khulna Division
    {
        id: 'khulna',
        name: 'Khulna',
        nameBn: 'খুলনা',
        division: 'khulna',
        slug: 'khulna',
        description: 'Gateway to the Sundarbans mangrove forest.',
        image: '/images/districts/khulna.jpg',
        destinationsCount: 15,
        popularDestinations: ['sundarbans', 'sixty-dome-mosque'],
        featured: true,
    },
    {
        id: 'satkhira',
        name: 'Satkhira',
        nameBn: 'সাতক্ষীরা',
        division: 'khulna',
        slug: 'satkhira',
        description: 'Coastal district with mangrove forests and wildlife.',
        image: '/images/districts/satkhira.jpg',
        destinationsCount: 7,
        popularDestinations: ['sundarbans-west', 'shyamnagar'],
        featured: false,
    },

    // Barisal Division
    {
        id: 'barisal',
        name: 'Barisal',
        nameBn: 'বরিশাল',
        division: 'barisal',
        slug: 'barisal',
        description: 'Venice of the East with numerous rivers and floating markets.',
        image: '/images/districts/barisal.jpg',
        destinationsCount: 10,
        popularDestinations: ['durga-sagar', 'kuakata'],
        featured: false,
    },
    {
        id: 'patuakhali',
        name: 'Patuakhali',
        nameBn: 'পটুয়াখালী',
        division: 'barisal',
        slug: 'patuakhali',
        description: 'Home to Kuakata beach, the daughter of the sea.',
        image: '/images/districts/patuakhali.jpg',
        destinationsCount: 8,
        popularDestinations: ['kuakata-beach', 'lebur-forest'],
        featured: true,
    },

    // Rangpur Division
    {
        id: 'rangpur',
        name: 'Rangpur',
        nameBn: 'রংপুর',
        division: 'rangpur',
        slug: 'rangpur',
        description: 'Northern city known for agriculture and education.',
        image: '/images/districts/rangpur.jpg',
        destinationsCount: 8,
        popularDestinations: ['carmichael-college', 'tajhat-palace'],
        featured: false,
    },
    {
        id: 'dinajpur',
        name: 'Dinajpur',
        nameBn: 'দিনাজপুর',
        division: 'rangpur',
        slug: 'dinajpur',
        description: 'Land of ancient temples and archaeological sites.',
        image: '/images/districts/dinajpur.jpg',
        destinationsCount: 10,
        popularDestinations: ['kantaji-temple', 'ramsagar'],
        featured: true,
    },
];

export const getDistrictBySlug = (slug) => {
    return districts.find(d => d.slug === slug);
};

export const getDistrictsByDivision = (divisionId) => {
    return districts.filter(d => d.division === divisionId);
};

export const getFeaturedDistricts = () => {
    return districts.filter(d => d.featured);
};

export default districts;
