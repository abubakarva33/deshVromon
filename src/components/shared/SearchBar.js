'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

/**
 * SearchBar Component
 * Universal search component for the platform
 */
export default function SearchBar({ placeholder = 'Search destinations, plans, stories...', onSearch, showFilters = false, onFilterClick }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const query = formData.get('search');
        onSearch?.(query);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
                    <Input
                        type="text"
                        name="search"
                        placeholder={placeholder}
                        className="pl-10 h-12 text-base"
                    />
                </div>

                <Button type="submit" size="lg" className="px-6">
                    Search
                </Button>

                {showFilters && (
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={onFilterClick}
                        className="px-4"
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                        <span className="hidden sm:inline ml-2">Filters</span>
                    </Button>
                )}
            </div>
        </form>
    );
}
