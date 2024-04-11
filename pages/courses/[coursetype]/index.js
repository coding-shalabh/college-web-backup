import React, { useEffect, useState } from "react";

import CourseDetails from "@/data/course-details/courseData.json";

import PageHead from "@/pages/Head";
import { Provider } from "react-redux";
import Context from "@/context/Context";
import Store from "@/redux/store";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import CategoryHead from "@/components/Cloned-Components/CategoryHead";
// import CategoryHead from "@/components/Category/CategoryHead";
// import CourseTab from "@/components/Category/Filter/CourseTab";
import CourseTab from "@/components/Cloned-Components/CourseTab";
import allCourses from '@/data/admin_courses'
import allColleges from '@/data/admin_colleges'
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
