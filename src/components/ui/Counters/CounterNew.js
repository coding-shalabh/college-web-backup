import React, { useEffect, useState } from "react";
import Image from "next/image";

const CounterNew = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNumbers, setCurrentNumbers] = useState([0, 0, 0, 0]);
  
  const counters = [
    { 
      id: 1, 
      finalValue: 35800, 
      title: "Admission Done", 
      icon: "/images/icons/counter-01.png",
      format: "number" 
    },
    { 
      id: 2, 
      finalValue: 2.5, 
      title: "Students Counselled", 
      icon: "/images/icons/counter-02.png",
      format: "lakhs" 
    },
    { 
      id: 3, 
      finalValue: 5, 
      title: "Awards In Consulting", 
      icon: "/images/icons/counter-03.png",
      format: "simple" 
    },
    { 
      id: 4, 
      finalValue: 6, 
      title: "Offices In India", 
      icon: "/images/icons/counter-04.png",
      format: "simple" 
    },
  ];

  const formatNumber = (num, format) => {
    if (format === "number") {
      return num.toLocaleString();
    } else if (format === "lakhs") {
      return num.toFixed(1);
    } else {
      return num.toString();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('counter-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setCurrentNumbers(counters.map(counter => {
          if (counter.format === "lakhs") {
            return progress * counter.finalValue;
          } else {
            return Math.floor(progress * counter.finalValue);
          }
        }));

        if (step >= steps) {
          clearInterval(timer);
          setCurrentNumbers(counters.map(counter => counter.finalValue));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <div id="counter-section" className="container">
      <div className="container">
        <div className="row mb--40">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <span className="subtitle bg-primary-opacity">WHY CHOOSE US</span>
              <h2 className="title">
                Creating A Community Of<br /> Life Long Learners.
              </h2>
              <p className="description has-medium-font-size mt--20 mb--0"></p>
            </div>
          </div>
        </div>
        <div className="row g-5 hanger-line">
          {counters.map((counter, index) => (
            <div 
              key={counter.id} 
              className={`col-lg-3 col-md-6 col-sm-6 col-12 ${
                index === 1 || index === 3 
                  ? "mt--60 mt_md--30 mt_sm--30 mt_mobile--60" 
                  : index === 0 || index === 2 
                    ? "mt_md--60 mt_sm--60" 
                    : ""
              }`}
            >
              <div className="rbt-counterup rbt-hover-03 border-bottom-gradient">
                <div className="top-circle-shape"></div>
                <div className="inner">
                  <div className="rbt-round-icon">
                    <Image
                      alt="Icons Images"
                      loading="lazy"
                      width={50}
                      height={50}
                      decoding="async"
                      src={counter.icon}
                      style={{ color: "transparent" }}
                    />
                  </div>
                  <div className="content">
                    <h3 className="counter">
                      <span className="odometer">
                        <div className="odometer odometer-auto-theme">
                          <div className="odometer-inside">
                            {counter.format === "number" ? (
                              formatNumber(currentNumbers[index], counter.format)
                            ) : counter.format === "lakhs" ? (
                              <>
                                {formatNumber(currentNumbers[index], counter.format)}
                                <span style={{fontSize: "15px", marginLeft: "10px"}}>Lakhs</span>
                              </>
                            ) : (
                              formatNumber(currentNumbers[index], counter.format)
                            )}
                          </div>
                        </div>
                      </span>
                    </h3>
                    <span className="subtitle">{counter.title}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterNew; 