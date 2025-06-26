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
  const [pageType, setPageType] = useState(null)
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
      } else {
        setCourseFilter(getAllCourse);
      }
    }
    else if (pageType == 2) {
      const updateItem = getAllColleges.filter((curElm) => {
        return curElm?.name.toLowerCase().includes(types);
      });

      if (types) {
        setCourseFilter(updateItem);
      } else {
        setCourseFilter(getAllCourse);
      }
    }
  };

  useEffect(() => {
    if (path.includes('/courses'))
      setPageType(1)
    else if (path.includes('/colleges'))
      setPageType(2)
  }, [])

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
                <CourseTab pageType={pageType} course={courseFilter} />
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
