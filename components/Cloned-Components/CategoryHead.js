import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import CategoryBanner from "../Category/Category-Banner";
import CourseFilter from "../Category/Filter/CourseFilter";
import { useAppContext } from "@/context/Context";

const CategoryHead = ({
  category,
  filterItem,
  courseFilter,
  setCourseFilter,
  allCourses
}) => {
  const router = useRouter();
  const path = router.pathname;
  const { toggle, setToggle } = useAppContext();
  const [filterToggle, setFilterToggle] = useState(true);
  const [activeTab, setActiveTab] = useState(router.query.coursetype || 0);
  const [searchFilterValue, setSearchFilterValue] = useState('')
  const [tabType, setTabType] = useState(null)

  useEffect(() => {
    if (tabType == 1) {
      if (router.query.coursetype)
        setActiveTab(activeTab);
      else {
        setActiveTab(0);
      }
      filterItem(activeTab);
    }
  }, [tabType])

  useEffect(() => {
    if (path.includes('/colleges'))
      setTabType(2)
    else if (path.includes('/courses'))
      setTabType(1)
  }, [])


  const handleButtonClick = (courseType) => {
    setActiveTab(courseType);
    filterItem(courseType);
    setSearchFilterValue('')
  };

  const searchFilter = (e) => {
    setActiveTab(0)
    setSearchFilterValue(e.target.value)
    filterItem(e.target.value);
  }

  return (
    <>
      <div className="rbt-page-banner-wrapper">
        <div className="rbt-banner-image"></div>

        <div className="rbt-banner-content">
          {/* {category ? (
            <CategoryBanner category={category} />
          ) : (
            <CategoryBanner />
          )} */}

          <div className="rbt-course-top-wrapper mt--40 mt_sm--20">
            <div className="container">
              <div className="row g-5 align-items-center">
                <div className="col-lg-5 col-md-12">
                  <div className="rbt-sorting-list d-flex flex-wrap align-items-center">
                    {path === "/course-card-3" || path === "/course-masonry" ? (
                      ""
                    ) : (
                      <div className="rbt-short-item switch-layout-container">
                        <ul className="course-switch-layout">
                          <li className="course-switch-item">
                            <button
                              className={`rbt-grid-view ${path === "/course-card-2"
                                ? !toggle
                                  ? "active"
                                  : ""
                                : toggle
                                  ? "active"
                                  : ""
                                }`}
                              title="Grid Layout"
                              onClick={() => setToggle(!toggle)}
                            >
                              <i className="feather-grid"></i>
                              <span className="text ms-2">Grid</span>
                            </button>
                          </li>
                          <li className="course-switch-item">
                            <button
                              className={`rbt-grid-view ${path === "/course-card-2"
                                ? toggle
                                  ? "active"
                                  : ""
                                : !toggle
                                  ? "active"
                                  : ""
                                }`}
                              title="List Layout"
                              onClick={() => setToggle(!toggle)}
                            >
                              <i className="feather-list"></i>
                              <span className="text ms-2">List</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                    {category && (
                      <div className="rbt-short-item">
                        {category.id ? (
                          <span className="course-index">
                            Showing 1-{category.id} of {category.id} results
                          </span>
                        ) : (
                          <span className="course-index">
                            Showing 1-{category.length / 2} of {category.length}
                            <span className="ms-1">results</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-7 col-md-12">
                  <div className="rbt-sorting-list d-flex flex-wrap align-items-end justify-content-start justify-content-lg-end">
                    {path === "/course-with-sidebar" ? (
                      ""
                    ) : (
                      <div className="rbt-short-item">
                        {tabType == 1 || (tabType == 2 && !router.query.coursetype) ?
                          <form className="rbt-search-style me-0">
                            <input value={searchFilterValue}
                              type="text"
                              placeholder={tabType ? `Search Your ${tabType == 1 ? 'Course' : 'College'}..` : ''}
                              onChange={searchFilter}
                            />
                            <i style={{ position: 'absolute', top: 15, right: 15, cursor: 'pointer' }} className="feather-search"></i>
                          </form> : <></>}
                      </div>
                    )}

                    <div className="rbt-short-item">
                      <div className="filter-select">
                        <span className="select-label d-block">Sort By</span>
                        <div className="filter-select rbt-modern-select search-by-category">
                          <select data-size="7">
                            <option>Default</option>
                            <option>Latest</option>
                            <option>Popularity</option>
                            <option>Trending</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {path === "/course-filter-two-open" ||
                      path === "/course-filter-two-toggle" ||
                      path === "/course-filter-one-toggle" ||
                      path === "/course-card-2" ||
                      path === "/course-card-3" ||
                      path === "/course-masonry" ? (
                      <div className="rbt-short-item">
                        <div className="view-more-btn text-start text-sm-end">
                          <button
                            className="discover-filter-button discover-filter-activation rbt-btn btn-white btn-md radius-round"
                            onClick={() => setFilterToggle(!filterToggle)}
                          >
                            Filter<i className="feather-filter"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                {/* {path === "/course-filter-one-open" ? (
                  <CourseFilter />
                ) : (
                  <CourseFilter filterToggle={filterToggle} />
                )} */}


                {tabType == 1 ? <div className="col-lg-12 mt--60">
                  <ul
                    className="rbt-portfolio-filter filter-tab-button justify-content-start nav nav-tabs"
                    id="rbt-myTab"
                    role="tablist"
                  >
                    {[
                      "All Course",
                      "Online Courses",
                      "Offline Courses",
                      "Overseas Courses"
                    ].map((courseType, index) => (
                      <li
                        key={index}
                        className="nav-item"
                        role="presentation"
                      >
                        <button
                          className={activeTab == index ? "active" : ""}
                          type="button"
                          onClick={() => handleButtonClick(index)}
                        >
                          <span className="filter-text">{courseType}</span>
                          {courseType === "All Course" ? (
                            <span className="course-number">
                              {allCourses?.filter((course) => course).length}
                            </span>
                          ) : (
                            <span className="course-number">
                              {
                                allCourses?.filter(
                                  (course) => course.courseType === courseType
                                ).length
                              }
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div> : ''}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryHead;
