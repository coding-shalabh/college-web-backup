import React from "react";

const Review = () => {
  return (
    <div className="rbt-review-wrapper">
      <div className="course-content">
        <div className="section-title">
          <h4 className="rbt-title-style-3">Student Reviews</h4>
        </div>
        <div className="row g-5 align-items-center">
          <div className="col-lg-3">
            <div className="rating-box">
              <div className="rating-number">4.5</div>
              <div className="rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <span className="sub-title">Course Rating</span>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="review-wrapper">
              <p>Reviews and ratings will be displayed here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review; 