import React, { useEffect, useState } from "react";

import CourseDetails from "@/data/course-details/courseData.json";

import PageHead from "../../Head";
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

const CourseTabLayout = () => {
  let getAllCourse = [...allCourses];
  const [courseFilter, setCourseFilter] = useState(allCourses);

  const filterItem = (types) => {
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
  };
  return (
    <>
      <PageHead title="Course With Tab One - Online Courses & Education NEXTJS14 Template" />

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
                <CourseTab course={courseFilter} />
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
