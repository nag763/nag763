'use client';

import { useCallback } from 'react';

export default function StartButton({ label, className = '' }) {
    const scrollToTimeline = useCallback(() => {
        const timelineSection = document.getElementById('timeline');
        if (timelineSection) {
            timelineSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.warn('Element with ID "timeline" not found');
        }
    }, []);

    return (
        <button 
            type="button" 
            className={`btn btn-primary btn-outline btn-lg animate-pulse animate-infinite animate-ease-in-out ${className}`} 
            onClick={scrollToTimeline} 
            aria-label={label}>
            {label}
        </button>
    );
}
