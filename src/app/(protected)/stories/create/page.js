'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Upload, X, Image as ImageIcon, MapPin, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { districts } from '@/data/districts';
import { destinations } from '@/data/destinations';

export default function CreateStoryPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        titleBn: '',
        content: '',
        destination: '',
        district: '',
        tags: [],
        media: [],
    });

    const [currentTag, setCurrentTag] = useState('');
    const [previewImages, setPreviewImages] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDistrictChange = (e) => {
        const district = e.target.value;
        setFormData(prev => ({ ...prev, district, destination: '' }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...newPreviews]);
        setFormData(prev => ({
            ...prev,
            media: [...prev.media, ...files],
        }));
    };

    const removeImage = (index) => {
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
        setFormData(prev => ({
            ...prev,
            media: prev.media.filter((_, i) => i !== index),
        }));
    };

    const addTag = () => {
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, currentTag.trim()],
            }));
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Handle story submission
        console.log('Story data:', formData);
        alert('Story created! (Demo - backend integration needed)');
        router.push('/community');
    };

    const handleSaveDraft = () => {
        console.log('Saving draft:', formData);
        alert('Draft saved! (Demo)');
    };

    const destinationsByDistrict = formData.district
        ? destinations.filter(d => d.district === formData.district)
        : [];

    const isFormValid = formData.title && formData.content && formData.district;

    return (
        <div className="min-h-screen bg-primary">
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-primary/95 backdrop-blur-sm border-b border-border">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/community">
                        <Button variant="ghost" size="sm">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Cancel
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={handleSaveDraft}>
                            Save Draft
                        </Button>
                        <Button onClick={handleSubmit} disabled={!isFormValid}>
                            Publish Story
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-foreground mb-2">Share Your Story</h1>
                    <p className="text-lg text-secondary">
                        Inspire others with your travel experiences and memories
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="p-6 rounded-xl border border-border bg-secondary">
                        <label className="block text-sm font-semibold text-foreground mb-2">
                            Story Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Give your story a captivating title..."
                            className="w-full p-4 rounded-lg border border-border bg-primary text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
                            required
                        />
                        <label className="block text-sm font-semibold text-foreground mt-4 mb-2">
                            Title (Bangla) - Optional
                        </label>
                        <input
                            type="text"
                            name="titleBn"
                            value={formData.titleBn}
                            onChange={handleInputChange}
                            placeholder="শিরোনাম বাংলায়..."
                            className="w-full p-4 rounded-lg border border-border bg-primary text-foreground"
                        />
                    </div>

                    {/* Location */}
                    <div className="p-6 rounded-xl border border-border bg-secondary">
                        <label className="block text-sm font-semibold text-foreground mb-2">
                            <MapPin className="w-4 h-4 inline mr-1" />
                            Location *
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-muted mb-2">District</label>
                                <select
                                    value={formData.district}
                                    onChange={handleDistrictChange}
                                    className="w-full p-3 rounded-lg border border-border bg-primary text-foreground focus:outline-none focus:ring-2 focus:ring-accent-primary"
                                    required
                                >
                                    <option value="">Select District</option>
                                    {districts.map(d => (
                                        <option key={d.id} value={d.id}>
                                            {d.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-muted mb-2">Destination (Optional)</label>
                                <select
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleInputChange}
                                    className="w-full p-3 rounded-lg border border-border bg-primary text-foreground focus:outline-none focus:ring-2 focus:ring-accent-primary"
                                    disabled={!formData.district}
                                >
                                    <option value="">Select Destination</option>
                                    {destinationsByDistrict.map(d => (
                                        <option key={d.id} value={d.id}>
                                            {d.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 rounded-xl border border-border bg-secondary">
                        <label className="block text-sm font-semibold text-foreground mb-2">
                            Your Story *
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            placeholder="Share your experiences, tips, and memorable moments from your journey..."
                            className="w-full min-h-[300px] p-4 rounded-lg border border-border bg-primary text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-accent-primary"
                            required
                        />
                        <div className="mt-2 text-sm text-muted">
                            {formData.content.length} characters
                        </div>
                    </div>

                    {/* Media Upload */}
                    <div className="p-6 rounded-xl border border-border bg-secondary">
                        <label className="block text-sm font-semibold text-foreground mb-4">
                            <ImageIcon className="w-4 h-4 inline mr-1" />
                            Photos
                        </label>

                        {/* Upload Button */}
                        <div className="mb-4">
                            <label className="cursor-pointer">
                                <div className="flex items-center justify-center gap-2 px-6 py-4 rounded-lg border-2 border-dashed border-border hover:border-accent-primary bg-primary hover:bg-accent-primary/5 transition-colors">
                                    <Upload className="w-5 h-5 text-accent-primary" />
                                    <span className="font-semibold text-accent-primary">
                                        Upload Photos
                                    </span>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                            <p className="text-sm text-muted mt-2">
                                Upload up to 10 photos. Supported formats: JPG, PNG, WebP
                            </p>
                        </div>

                        {/* Image Previews */}
                        {previewImages.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {previewImages.map((src, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-muted group">
                                        <img
                                            src={src}
                                            alt={`Preview ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="p-6 rounded-xl border border-border bg-secondary">
                        <label className="block text-sm font-semibold text-foreground mb-2">
                            <Tag className="w-4 h-4 inline mr-1" />
                            Tags
                        </label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={currentTag}
                                onChange={(e) => setCurrentTag(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                placeholder="Add tags (e.g., sunset, beach, adventure)"
                                className="flex-1 p-3 rounded-lg border border-border bg-primary text-foreground focus:outline-none focus:ring-2 focus:ring-accent-primary"
                            />
                            <Button type="button" onClick={addTag}>
                                Add
                            </Button>
                        </div>
                        {formData.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag, idx) => (
                                    <Badge key={idx} variant="secondary" className="px-3 py-1.5">
                                        #{tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="ml-2 hover:text-red-500"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-between p-6 rounded-xl border border-border bg-secondary">
                        <p className="text-sm text-muted">
                            {isFormValid
                                ? '✓ Ready to publish'
                                : 'Please fill in all required fields'}
                        </p>
                        <div className="flex gap-3">
                            <Button type="button" variant="outline" onClick={handleSaveDraft}>
                                Save Draft
                            </Button>
                            <Button type="submit" disabled={!isFormValid}>
                                Publish Story
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
