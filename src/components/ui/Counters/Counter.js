import React from "react";

const Counter = ({ isDesc }) => {
  const counters = [
    { id: 1, count: "50+", title: "Colleges", icon: "feather-book-open" },
    { id: 2, count: "500+", title: "Courses", icon: "feather-award" },
    { id: 3, count: "10k+", title: "Students", icon: "feather-users" },
    { id: 4, count: "95%", title: "Success Rate", icon: "feather-trending-up" },
  ];

  return (
    <div className="row">
      {counters.map((counter) => (
        <div key={counter.id} className="col-lg-3 col-md-6 col-sm-6 col-12">
          <div className="rbt-counterup rbt-hover-03 border-solid border-light-gray">
            <div className="inner">
              <div className="rbt-round-icon">
                <i className={counter.icon}></i>
              </div>
              <div className="content">
                <h3 className="counter">
                  <span className="odometer" data-count={counter.count}>
                    {counter.count}
                  </span>
                </h3>
                <span className="subtitle">{counter.title}</span>
                {isDesc && (
                  <p className="description">
                    We are proud of our achievements in education.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Counter; 