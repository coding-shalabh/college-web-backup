import React from "react";

const CourseMenu = () => {
  return (
    <nav className="rbt-course-feature-inner rbt-sticky-table-of-contents">
      <div className="rbt-course-feature-wrapper">
        <div className="rbt-course-feature-inner">
          <ul className="course-nav" style={{ marginBottom: "0px", position: "sticky", top: "100px", display: "flex", flexDirection: "row", gap: "10px" }}>
            <li>
              <a href="#overview">
                <i className="feather-play-circle" style={{ fontSize: "20px", marginRight: "10px" }}></i>
                <span className="text">Overview</span>
              </a>
            </li>
            <li>
              <a href="#coursecontent">
                <i className="feather-book-open" style={{ fontSize: "20px", marginRight: "10px" }}></i>
                <span className="text">Course Content</span>
              </a>
            </li>
            <li>
              <a href="#review">
                <i className="feather-message-square" style={{ fontSize: "20px", marginRight: "10px" }}></i>
                <span className="text">Reviews</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CourseMenu; 