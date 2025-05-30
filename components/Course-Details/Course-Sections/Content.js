import Link from "next/link";
import React, { useEffect, useState } from "react";
import coursesArray from "@/data/admin_courses";

const Content = ({ checkMatchCourses }) => {
  const [coursesDetails, setCoursesDetails] = useState([]);

  useEffect(() => {
    let coursesDetailsArr = [];

    coursesArray?.forEach((item) => {
      checkMatchCourses?.courses?.forEach((item2) => {
        if (item2.$oid == item._id.$oid) {
          coursesDetailsArr.push(item);
        }
      });
    });

    setCoursesDetails(coursesDetailsArr);

    // console.log(coursesArray)
  }, []);

  return (
    <>
      <div className="rbt-course-feature-inner">

        <div className="section-title">
          <h4 className="rbt-title-style-3">{"Courses Offered"}</h4>
        </div>
        <div className="rbt-accordion-style rbt-accordion-02 accordion">
          <div className="accordion" id="accordionExampleb2">
            {coursesDetails?.map((item, innerIndex) => (
              <div className="accordion-item card" key={innerIndex}>
                <h2
                  className="accordion-header card-header"
                  id={`headingTwo${innerIndex}`}
                >
                  <button
                    className={`accordion-button ${
                      !item?.collapsed ? "collapsed" : ""
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseTwo${innerIndex + 1}`}
                    aria-expanded={item?.expand}
                    aria-controls={`collapseTwo${innerIndex + 1}`}
                  >
                    {item?.title}
                    {/* <span className="rbt-badge-5 ml--10">{item?.time}</span> */}
                  </button>
                </h2>
                <div
                  id={`collapseTwo${innerIndex + 1}`}
                  className={`accordion-collapse collapse ${
                    item?.isShow ? "show" : ""
                  }`}
                  aria-labelledby={`headingTwo${innerIndex}`}
                  data-bs-parent="#accordionExampleb2"
                >
                  <div
                    className="accordion-body card-body pr--0"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  >
                    {/* <ul className="rbt-course-main-content liststyle">
                      {item?.listitem?.map((list, subIndex) => (
                        <li key={subIndex}>
                          <Link href="/lesson">
                            <div className="course-content-left">
                              {list.playIcon ? (
                                <i className="feather-play-circle"></i>
                              ) : (
                                <i className="feather-file-text"></i>
                              )}
                              <span className="text">{list.text}</span>
                            </div>
                            {list.status ? (
                              <div className="course-content-right">
                                <span className="min-lable">{list.time}</span>
                                <span className="rbt-badge variation-03 bg-primary-opacity">
                                  <i className="feather-eye"></i> Preview
                                </span>
                              </div>
                            ) : (
                              <div className="course-content-right">
                                <span className="course-lock">
                                  <i className="feather-lock"></i>
                                </span>
                              </div>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
