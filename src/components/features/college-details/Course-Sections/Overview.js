import React from "react";

const Overview = ({ checkMatchCourses }) => {
  return (
    <div className="rbt-course-feature-box overview-wrapper rbt-shadow-box mt--30" id="overview">
      <div className="rbt-course-feature-inner has-show-more">
        <div className="section-title">
          <h4 className="rbt-title-style-3">About This College</h4>
        </div>
        <div className="rbt-course-feature-wrapper">
          <div className="row g-5">
            <div className="col-lg-12">
              <div className="course-content">
                <h5>{checkMatchCourses?.name || "College Information"}</h5>
                <p>
                  {checkMatchCourses?.description || 
                   "This college offers various courses and programs to help students achieve their academic goals. " +
                   "With experienced faculty and modern facilities, we provide quality education in multiple disciplines."}
                </p>
                
                {checkMatchCourses?.location && (
                  <div className="course-feature">
                    <h6>Location</h6>
                    <p>{checkMatchCourses.location}</p>
                  </div>
                )}
                
                {checkMatchCourses?.courses && checkMatchCourses.courses.length > 0 && (
                  <div className="course-feature">
                    <h6>Available Courses</h6>
                    <p>This college offers {checkMatchCourses.courses.length} different courses and programs.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview; 