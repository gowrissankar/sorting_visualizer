// src/components/ArrayBar.jsx
import React, { useState } from 'react';
import { BAR_STATES, VISUAL_CONFIG } from '../constants';

const ArrayBar = ({ 
    value, 
    index, 
    arraySize, 
    state = BAR_STATES.DEFAULT,
    onClick,
    isSorting = false,
    containerWidth = VISUAL_CONFIG.CONTAINER.WIDTH // ✅ NEW: Responsive width
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
    
    // ✅ RESPONSIVE: Font size and gap proportional to bar width
    const responsiveFontSize = Math.max(8, Math.min(16, barWidth * 0.5));
    const numberOffset = barHeight + Math.max(6, barWidth * 0.15); // Minimum 6px gap
    
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

    return (
        <div className="relative flex items-end">
            <div
                className={`
                    ${getBarColor()}
                    transition-all duration-300 ease-out cursor-pointer
                    border border-visualizer-bg-secondary
                    ${isHovered ? 'brightness-110 scale-x-105' : ''}
                `}
                style={{
                    width: `${barWidth}px`,
                    height: `${barHeight}px`,
                    marginRight: `${VISUAL_CONFIG.BAR.GAP}px`,
                    borderRadius: `${VISUAL_CONFIG.BAR.BORDER_RADIUS}px`,
                    transformOrigin: 'bottom center',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => onClick?.(index)}
                data-testid={`array-bar-${index}`}
                aria-label={`Array element ${index + 1} with value ${value}`}
            />
            
            {/* ✅ CONDITIONAL: Only show when not sorting */}
            {!isSorting && (
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
