
import { hotels } from '@/data/hotels';
import HotelsList from '@/components/hotels/HotelsList';

export const metadata = {
    title: 'Hotels & Accommodation | DeshVromon',
    description: 'Find the best hotels and accommodations across Bangladesh',
};

export default function HotelsPage() {
    return (
        <div className="min-h-screen bg-primary">
            <HotelsList initialHotels={hotels} />
        </div>
    );
}
