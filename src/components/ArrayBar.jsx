// /src/components/ArrayBar.jsx
import React, { useState } from 'react';
import { BAR_STATES, VISUAL_CONFIG } from '../constants/index.js';

const ArrayBar = ({ 
    value, 
    index, 
    arraySize, 
    state = BAR_STATES.DEFAULT,
    onClick,
    isSorting = false,
    containerWidth = VISUAL_CONFIG.CONTAINER.WIDTH // ✅ Responsive width
}) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // ✅ RESPONSIVE: Width calculation using actual container width
    const availableWidth = containerWidth - (VISUAL_CONFIG.CONTAINER.PADDING * 2);
    const totalGaps = (arraySize - 1) * VISUAL_CONFIG.BAR.GAP;
    const widthForBars = availableWidth - totalGaps;
    const calculatedWidth = widthForBars / arraySize;
    
    const barWidth = Math.max(
        VISUAL_CONFIG.BAR.MIN_WIDTH, 
        Math.min(calculatedWidth, VISUAL_CONFIG.BAR.MAX_WIDTH)
    );
    
    // Linear height calculation
    const baseHeight = 4;
    const maxUsableHeight = VISUAL_CONFIG.CONTAINER.HEIGHT - (VISUAL_CONFIG.CONTAINER.PADDING * 2);
    const scalingFactor = (maxUsableHeight - baseHeight) / arraySize;
    const barHeight = baseHeight + (value * scalingFactor);
    
    // ✅ RESPONSIVE: Font size and gap proportional to bar width with mobile constraints
    const responsiveFontSize = Math.max(6, Math.min(16, barWidth * 0.5)); // Minimum 6px for mobile
    const numberOffset = barHeight + Math.max(4, barWidth * 0.15); // Minimum 4px gap for mobile
    
    // Using your existing Tailwind colors
    const getBarColor = () => {
        if (isHovered && state === BAR_STATES.DEFAULT) {
            return 'bg-visualizer-bar-hover shadow-lg';
        }
        
        switch (state) {
            case BAR_STATES.COMPARING: 
                return 'bg-visualizer-bar-comparing shadow-md';
            case BAR_STATES.SWAPPING: 
                return 'bg-visualizer-bar-swapping shadow-md animate-pulse';
            case BAR_STATES.SORTED: 
                return 'bg-visualizer-bar-sorted shadow-sm';
            case BAR_STATES.HOVER:
                return 'bg-visualizer-bar-hover shadow-lg';
            default: 
                return 'bg-visualizer-bar-default';
        }
    };

    // Mobile-friendly touch handling - prevent hover states on touch devices
    const handleTouchStart = () => {
        if ('ontouchstart' in window) {
            // Skip hover effects on touch devices
            onClick?.(index);
        }
    };

    return (
        <div className="relative flex items-end">
            <div
                className={`
                    ${getBarColor()}
                    transition-all duration-300 ease-out cursor-pointer
                    border border-visualizer-bg-secondary
                    ${isHovered ? 'brightness-110 scale-x-105' : ''}
                    touch-manipulation
                `}
                style={{
                    width: `${barWidth}px`,
                    height: `${barHeight}px`,
                    marginRight: `${VISUAL_CONFIG.BAR.GAP}px`,
                    borderRadius: `${VISUAL_CONFIG.BAR.BORDER_RADIUS}px`,
                    transformOrigin: 'bottom center',
                    minWidth: '2px', // Minimum width for very small screens
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={handleTouchStart}
                onClick={() => onClick?.(index)}
                data-testid={`array-bar-${index}`}
                aria-label={`Array element ${index + 1} with value ${value}`}
            />
            
            {/* ✅ CONDITIONAL: Only show when not sorting and bar is wide enough */}
            {!isSorting && barWidth > 8 && (
                <div 
                    className={`
                        absolute left-1/2 transform -translate-x-1/2 z-10 pointer-events-none
                        transition-all ease-out font-bold drop-shadow-lg
                        text-visualizer-text-accent 
                        ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                    `}
                    style={{
                        bottom: `${numberOffset}px`,
                        fontSize: `${responsiveFontSize}px`,
                        transitionDuration: isHovered ? '0ms' : '2000ms',
                    }}
                >
                    {value}
                </div>
            )}
        </div>
    );
};

export default ArrayBar;
