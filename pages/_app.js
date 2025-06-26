import React, { useEffect } from "react";
import dynamic from "next/dynamic";

import "bootstrap/scss/bootstrap.scss";
import "../public/scss/default/euclid-circulara.scss";

// ========= Plugins CSS START =========
import "../node_modules/sal.js/dist/sal.css";
import "../public/css/plugins/fontawesome.min.css";
import "../public/css/plugins/feather.css";
import "../public/css/plugins/odometer.css";
import "../public/css/plugins/animation.css";
import "../public/css/plugins/euclid-circulara.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
// ========= Plugins CSS END =========

import sal from "sal.js";
import "../public/scss/styles.scss";
import "@/src/components/styles.css";

// Performance monitoring
function reportWebVitals(metric) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }
}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Lazy load bootstrap JS
    const loadBootstrap = async () => {
      await import("bootstrap/dist/js/bootstrap.bundle.min.js");
    };
    loadBootstrap();

    // Initialize SAL with optimized settings
    sal({
      threshold: 0.1,
      once: true,
      disable: window.innerWidth < 768, // Disable on mobile for performance
    });

    // Performance optimizations
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Preload critical resources during idle time
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = '/scss/styles.scss';
        link.as = 'style';
        document.head.appendChild(link);
      });
    }

    // Optimize scroll performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Scroll optimizations here
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <Component {...pageProps} />;
}

export { reportWebVitals };
