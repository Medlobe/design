// src/AnimatedButton.js
import React, { useState, useRef, useEffect } from 'react';


const AnimatedButton = () => {
    const [buttonPosition, setButtonPosition] = useState({ left: 0, top: 0 });
    const [paragraphPosition, setParagraphPosition] = useState({ left: 0, top: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef(null);

    const handleMouseMove = (e) => {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setButtonPosition({ left: x * 0.5, top: y * 0.5 });
        setParagraphPosition({ left: x * 0.3, top: y * 0.3 });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setButtonPosition({ left: 0, top: 0 });
        setParagraphPosition({ left: 0, top: 0 });
    };

    useEffect(() => {
        if (!isHovered) {
            const button = buttonRef.current;
            button.style.animation = 'bounce-back 0.5s ease';
            button.addEventListener('animationend', () => {
                button.style.animation = '';
            }, { once: true });
        }
    }, [isHovered]);

    return (
        <button
            ref={buttonRef}
            className="animated-button"
            style={{ transform: `translate(${buttonPosition.left}px, ${buttonPosition.top}px)` }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <i className='fas fa-play'
                style={{ transform: `translate(${paragraphPosition.left}px, ${paragraphPosition.top}px)` }}
            >
              
            </i>
        </button>
    );
};

export default AnimatedButton;
