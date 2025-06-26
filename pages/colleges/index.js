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
  FooterOne,
  CategoryHead,
  CourseTab,
  Separator
} from "@/src/components";
import allCourses from '@/src/data/admin_courses.json'
import allColleges from '@/src/data/admin_colleges.json'
import { useRouter } from "next/router";



const CourseTabLayout = () => {
  let getAllCourse = [...allCourses];
  let getAllColleges = [...allColleges];
  console.log(getAllColleges)
  const [courseFilter, setCourseFilter] = useState(allColleges);
  const [collegeFilter, setCollegeFilter] = useState(allColleges);
  const [pageType, setPageType] = useState(null);
  const [displayedItems, setDisplayedItems] = useState(10); // Start with 10 items
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const path = router.pathname;
  const courseId = router.query.coursetype
  const categoryFilter = router.query.category

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
        setCourseFilter(getAllColleges);
        setDisplayedItems(10); // Reset to 10 when showing all
      }
    }
  };

  // Filter colleges by category
  const filterByCategory = (category) => {
    // Map course names to categories
    const courseToCategory = {
      // Engineering courses
      "b-tech-civil-engineering": "Engineering",
      "b-tech-mechanical-engineering": "Engineering", 
      "b-tech-in-cse": "Engineering",
      "b-tech-aerospace-engineering": "Engineering",
      "b-tech-in-ai-ml": "Engineering",
      "b-tech-aeronautical-engineering": "Engineering",
      "b-tech-in-cse-with-cyber-security": "Engineering",
      "b-tech-in-cse-with-data-science": "Engineering",
      "b-tech-in-cse-with-chemical-engineering": "Engineering",
      "b-tech-in-biotechnology": "Engineering",
      "b-tech-in-ece": "Engineering",
      "b-tech-in-eee": "Engineering",
      "b-tech-in-ise": "Engineering",
      "mtech": "Engineering",
      "barch": "Engineering",
      "d-pharma": "Engineering",
      
      // Management courses
      "mba": "Management",
      "mcom": "Management",
      
      // Science courses  
      "mca": "Elite Science",
      "ba": "Elite Science",
    };

    const categoryMap = {
      "engineering": "Engineering",
      "management": "Management", 
      "elite-science": "Elite Science",
      "law": "Law"
    };

    const targetCategory = categoryMap[category];
    if (!targetCategory) return getAllColleges;

    const filteredColleges = getAllColleges.filter(college => {
      return college.courses.some(courseRef => {
        const courseId = courseRef.$oid || courseRef;
        const courseCategory = courseToCategory[courseId];
        return courseCategory === targetCategory;
      });
    });

    return filteredColleges;
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

  useEffect(() => {
    if (pageType == 2) {
      let newFilterArr = []
      collegeFilter?.forEach(college => {
        college.courses.forEach(item => {
          if (item.$oid == courseId) {
            newFilterArr.push(college)
          }
        })
      })
    }
  }, [pageType])

  useEffect(() => {
    console.log(courseFilter)
    console.log(collegeFilter)
  }, [courseFilter, collegeFilter])

  // Reset displayed items when courseFilter changes
  useEffect(() => {
    setDisplayedItems(10);
  }, [courseFilter]);

  // Handle category filtering from URL
  useEffect(() => {
    if (categoryFilter && pageType === 2) {
      const filteredColleges = filterByCategory(categoryFilter);
      setCourseFilter(filteredColleges);
    }
  }, [categoryFilter, pageType]);

  return (
    <>
      <PageHead title="Colleges" />

      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="rbt-sticky" headerType={true} />
          <MobileMenu />
          <Cart />

          <CategoryHead
            courseFilter={courseFilter}
            setCourseFilter={setCourseFilter}
            filterItem={filterItem}
            allCourses={getAllColleges}
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
                              {isLoading ? "Loading..." : "Load More Colleges"}
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
                          Showing {Math.min(displayedItems, courseFilter.length)} of {courseFilter.length} colleges
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
                          All {courseFilter.length} colleges loaded
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
