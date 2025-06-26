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
  const [_window, setWindowObject] = useState(null)
  const [courseId, setCourseId] = useState(router.query.coursetype)

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
        setCollegeFilter(updateItem);
      } else {
        setCollegeFilter(getAllColleges);
      }
    }
  };

  useEffect(() => {
    if (path.includes('/courses'))
      setPageType(1)
    else if (path.includes('/colleges'))
      setPageType(2)

    setWindowObject(window)

  }, [])

  useEffect(() => {
    if (pageType == 2) {
      let newFilterArr = []
      getAllColleges?.forEach(college => {
        college.courses.forEach(item => {
          if (item.$oid == courseId) {
            newFilterArr.push(college)
          }
        })
      })
      setCollegeFilter(newFilterArr)
    }
  }, [pageType, courseId])

  useEffect(() => {
    if (_window)
      setCourseId(_window.location.pathname.substring(router.pathname.indexOf('['), _window.location.pathname.length))
  }, [_window])

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
                <CourseTab pageType={pageType} course={pageType == 1 ? courseFilter : pageType == 2 ? collegeFilter : null} />
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
