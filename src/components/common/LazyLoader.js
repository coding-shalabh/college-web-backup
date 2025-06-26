import React, { useState, useEffect, useRef } from 'react';

const LazyLoader = ({ 
  children, 
  height = '200px', 
  className = '',
  threshold = 0.1,
  rootMargin = '50px'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      const currentRef = ref.current;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (isVisible) {
      // Small delay to ensure smooth loading
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div 
      ref={ref}
      className={`lazy-loader ${className} ${isLoaded ? 'loaded' : ''}`}
      style={{ 
        minHeight: isLoaded ? 'auto' : height,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      {isVisible && (
        <div className={`lazy-content ${isLoaded ? 'fade-in' : ''}`}>
          {children}
        </div>
      )}
      {!isLoaded && isVisible && (
        <div className="lazy-placeholder" style={{ height }}>
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyLoader; 