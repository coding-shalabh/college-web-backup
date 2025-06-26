import React from "react";

const CourseBanner = ({ bannerImg }) => {
  return (
    <div className="course-banner">
      <img src={bannerImg || "/images/course/course-placeholder.jpg"} alt="Course Banner" />
    </div>
  );
};

export default CourseBanner; 