import { useEffect, useCallback, useRef } from 'react';

export const usePerformance = () => {
  const performanceRef = useRef({
    renderCount: 0,
    lastRenderTime: Date.now()
  });

  // Debounce function for expensive operations
  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  // Throttle function for scroll events
  const throttle = useCallback((func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    return (...args) => {
      const currentTime = Date.now();
      if (currentTime - lastExecTime > delay) {
        func.apply(null, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(null, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  // Measure component render performance
  const measureRender = useCallback(() => {
    performanceRef.current.renderCount++;
    const now = Date.now();
    const timeSinceLastRender = now - performanceRef.current.lastRenderTime;
    performanceRef.current.lastRenderTime = now;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Render #${performanceRef.current.renderCount}, Time since last: ${timeSinceLastRender}ms`);
    }
  }, []);

  // Optimize images for faster loading
  const optimizeImage = useCallback((src, width = 800, quality = 75) => {
    if (!src) return '';
    
    // If it's already optimized or external, return as is
    if (src.includes('?') || src.startsWith('http')) {
      return src;
    }
    
    return `${src}?w=${width}&q=${quality}`;
  }, []);

  // Preload critical resources
  const preloadResource = useCallback((href, as = 'script', type = null) => {
    if (typeof window === 'undefined') return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    
    document.head.appendChild(link);
  }, []);

  // Monitor Core Web Vitals
  const monitorWebVitals = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // LCP not supported
    }

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    
    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // FID not supported
    }
  }, []);

  // Memory usage monitoring
  const monitorMemory = useCallback(() => {
    if (typeof window === 'undefined' || !window.performance.memory) return;
    
    const memory = window.performance.memory;
    console.log({
      usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
      totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
      jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
    });
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      monitorWebVitals();
      
      // Monitor memory every 30 seconds in development
      const memoryInterval = setInterval(monitorMemory, 30000);
      return () => clearInterval(memoryInterval);
    }
  }, [monitorWebVitals, monitorMemory]);

  return {
    debounce,
    throttle,
    measureRender,
    optimizeImage,
    preloadResource,
    monitorMemory,
    performanceData: performanceRef.current
  };
};

export default usePerformance; 