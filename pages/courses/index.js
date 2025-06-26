import React, { useEffect, useState } from "react";

import CourseDetails from "@/src/data/courseData.json";

import PageHead from "@/src/components/common/PageHead";
import { Provider } from "react-redux";
import Context from "@/context/Context";
import Store from "@/redux/store";
import { 
  HeaderStyleTen, 
  MobileMenu, 
  Cart, 
  Separator, 
  FooterOne,
  CategoryHead,
  CourseTab
} from "@/src/components";
import allCourses from '@/src/data/admin_courses.json'
import allColleges from '@/src/data/admin_colleges.json'
import { useRouter } from "next/router";

const CourseTabLayout = () => {
  let getAllCourse = [...allCourses];
  let getAllColleges = [...allColleges];
  const [courseFilter, setCourseFilter] = useState(allCourses);
  const [collegeFilter, setCollegeFilter] = useState(allColleges);
  const [pageType, setPageType] = useState(null);
  const [displayedItems, setDisplayedItems] = useState(10); // Start with 10 items
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const path = router.pathname;

  const filterItem = (types) => {
    if (pageType == 1) {
      const updateItem = getAllCourse.filter((curElm) => {
        let course = '';
        if (types == 0)
          return true;
        else if (types == 1) {
          course = 'Online Course'
        } else if (types == 2) {
          course = 'Offline Course'
        } else if (types == 3) {
          course = 'Overseas Course'
        } else {
          return curElm?.title.toLowerCase().includes(types);
        }
        return curElm?.courseType === course;
      });

      if (types) {
        setCourseFilter(updateItem);
        setDisplayedItems(10); // Reset to 10 when filtering
      } else {
        setCourseFilter(getAllCourse);
        setDisplayedItems(10); // Reset to 10 when showing all
      }
    }
    else if (pageType == 2) {
      const updateItem = getAllColleges.filter((curElm) => {
        return curElm?.name.toLowerCase().includes(types);
      });

      if (types) {
        setCourseFilter(updateItem);
        setDisplayedItems(10); // Reset to 10 when filtering
      } else {
        setCourseFilter(getAllCourse);
        setDisplayedItems(10); // Reset to 10 when showing all
      }
    }
  };

  const loadMoreItems = () => {
    setIsLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayedItems(prev => prev + 10);
      setIsLoading(false);
    }, 500);
  };

  const hasMoreItems = displayedItems < courseFilter.length;

  useEffect(() => {
    if (path.includes('/courses'))
      setPageType(1)
    else if (path.includes('/colleges'))
      setPageType(2)
  }, [])

  // Reset displayed items when courseFilter changes
  useEffect(() => {
    setDisplayedItems(10);
  }, [courseFilter]);

  return (
    <>
      <PageHead title="Courses" />

      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="rbt-sticky" headerType={true} />
          <MobileMenu />
          <Cart />

          <CategoryHead
            courseFilter={courseFilter}
            setCourseFilter={setCourseFilter}
            filterItem={filterItem}
            allCourses={getAllCourse}
          />
          <div className="rbt-section-overlayping-top rbt-section-gapBottom">
            <div className="inner">
              <div className="container">
                <CourseTab 
                  pageType={pageType} 
                  course={courseFilter.slice(0, displayedItems)} 
                />
                
                {/* Load More Button */}
                {hasMoreItems && (
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="load-more-btn mt--60 text-center">
                        <button
                          className="rbt-btn btn-gradient hover-icon-reverse"
                          onClick={loadMoreItems}
                          disabled={isLoading}
                        >
                          <span className="icon-reverse-wrapper">
                            <span className="btn-text">
                              {isLoading ? "Loading..." : "Load More Courses"}
                            </span>
                            <span className="btn-icon">
                              <i className="feather-arrow-down"></i>
                            </span>
                            <span className="btn-icon">
                              <i className="feather-arrow-down"></i>
                            </span>
                          </span>
                        </button>
                        <p className="load-more-text mt--20">
                          Showing {Math.min(displayedItems, courseFilter.length)} of {courseFilter.length} courses
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* No More Items Message */}
                {!hasMoreItems && courseFilter.length > 10 && (
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="load-more-btn mt--60 text-center">
                        <p className="load-more-text">
                          All {courseFilter.length} courses loaded
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />
          <FooterOne />
        </Context>
      </Provider>
    </>
  );
};

export default CourseTabLayout;
