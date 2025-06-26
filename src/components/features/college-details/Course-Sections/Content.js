import React, { useEffect, useState } from "react";
import allCourses from "../../../../data/admin_courses.json";

const Content = ({ checkMatchCourses }) => {
  const [coursesDetails, setCoursesDetails] = useState([]);

  useEffect(() => {
    if (checkMatchCourses?.courses) {
      let coursesDetailsArr = [];

      // Match college courses with course data to get actual course names
      checkMatchCourses.courses.forEach((courseRef) => {
        const courseId = courseRef.$oid || courseRef;
        const foundCourse = allCourses.find(course => 
          course._id.$oid === courseId || course._id === courseId
        );
        
        if (foundCourse) {
          coursesDetailsArr.push(foundCourse);
        }
      });

      setCoursesDetails(coursesDetailsArr);
    }
  }, [checkMatchCourses]);

  return (
    <div className="course-content">
      <div className="section-title">
        <h4 className="rbt-title-style-3">Courses Offered</h4>
      </div>
      
      {coursesDetails && coursesDetails.length > 0 ? (
        <div className="course-list">
          <p>This college offers the following courses:</p>
          <div className="accordion" id="accordionExampleb2">
            {coursesDetails.map((course, index) => (
              <div className="accordion-item card" key={index} style={{ marginBottom: "20px", border: "0px solid #e0e0e0" }}>
                <h2
                  className="accordion-header card-header"
                  id={`headingCourse${index}`}
                  style={{ backgroundColor: "#f0f0f0", borderRadius: "10px", padding: "0px" }}
                >
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseCourse${index}`}
                    aria-expanded="false"
                    aria-controls={`collapseCourse${index}`}
                    style={{ borderRadius: "10px", border: '1px solid #e0e0e0' }}
                  >
                    <div className="course-content-left" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                      <i className="feather-book-open" style={{ fontSize: "20px", marginRight: "10px" }}></i>
                      <span className="text" style={{ fontSize: "16px", fontWeight: "bold" }}>{course.title}</span>
                    </div>
                  </button>
                </h2>
                <div
                  id={`collapseCourse${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`headingCourse${index}`}
                  data-bs-parent="#accordionExampleb2"
                >
                  <div className="accordion-body card-body">
                    <div 
                      className="course-description"
                      dangerouslySetInnerHTML={{ __html: course.description }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="course-list">
          <p>Course information will be updated soon.</p>
          {checkMatchCourses?.courses && checkMatchCourses.courses.length > 0 && (
            <p>This college offers {checkMatchCourses.courses.length} courses.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Content; 