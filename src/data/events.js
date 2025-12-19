/**
 * Events and Festivals Data
 */

export const events = [
    {
        id: 'event-1',
        name: 'Pohela Boishakh',
        nameBn: 'পহেলা বৈশাখ',
        type: 'cultural',
        description: 'Bengali New Year celebration across Bangladesh',
        date: { month: 4, day: 14 }, // April 14
        duration: 1,
        districts: ['dhaka', 'chittagong', 'sylhet', 'rajshahi', 'khulna'],
        relatedDestinations: ['lalbagh-fort', 'ahsan-manzil'],
        images: ['/images/events/pohela-boishakh-1.jpg'],
        activities: ['Cultural Programs', 'Traditional Music', 'Fair', 'Procession'],
        featured: true,
    },
    {
        id: 'event-2',
        name: 'Kuakata Sea Festival',
        nameBn: 'কুয়াকাটা সমুদ্র উৎসব',
        type: 'festival',
        description: 'Annual beach festival celebrating coastal culture',
        date: { month: 12, day: 20 },
        duration: 3,
        districts: ['patuakhali'],
        relatedDestinations: ['kuakata-beach'],
        images: ['/images/events/kuakata-festival-1.jpg'],
        activities: ['Beach Sports', 'Cultural Shows', 'Food Festival'],
        featured: false,
    },
    {
        id: 'event-3',
        name: 'Sylhet Tea Festival',
        nameBn: 'সিলেট চা উৎসব',
        type: 'cultural',
        description: 'Celebration of tea culture and heritage',
        date: { month: 11, day: 15 },
        duration: 2,
        districts: ['sylhet', 'moulvibazar'],
        relatedDestinations: ['ratargul', 'jaflong'],
        images: ['/images/events/tea-festival-1.jpg'],
        activities: ['Tea Tasting', 'Garden Tours', 'Cultural Programs'],
        featured: true,
    },
];

export const getEventsByMonth = (month) => events.filter(e => e.date.month === month);
export const getFeaturedEvents = () => events.filter(e => e.featured);

export default events;
