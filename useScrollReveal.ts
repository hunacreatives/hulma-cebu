import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface AnimatedSectionProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right' | 'scale' | 'fade';
  delay?: number;
  duration?: 'fast' | 'normal' | 'slow' | 'slower';
  className?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export default function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  duration = 'normal',
  className = '',
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  triggerOnce = true,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollReveal({ threshold, rootMargin, triggerOnce });

  const getAnimationClass = () => {
    const durationSuffix = duration === 'normal' ? '' : `-${duration}`;
    
    switch (direction) {
      case 'up':
        return `animate-fade-up${durationSuffix}`;
      case 'left':
        return `animate-slide-in-left${durationSuffix}`;
      case 'right':
        return `animate-slide-in-right${durationSuffix}`;
      case 'scale':
        return `animate-scale-in${durationSuffix}`;
      case 'fade':
        return `animate-fade-in${durationSuffix}`;
      default:
        return `animate-fade-up${durationSuffix}`;
    }
  };

  const delayClass = delay > 0 ? `animation-delay-${delay}` : '';

  return (
    <div
      ref={ref}
      className={`${!isVisible ? 'opacity-0' : ''} ${isVisible ? getAnimationClass() : ''} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}