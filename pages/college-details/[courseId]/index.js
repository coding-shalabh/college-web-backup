import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import sal from "sal.js";
import CourseData from "../../../data/course-details/courseData.json";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";

import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Cart from "@/components/Header/Offcanvas/Cart";
import BackToTop from "@/pages/backToTop";
import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import CourseHead from "@/components/Cloned-Components/course-head";
// import CourseHead from "@/components/Course-Details/Course-Sections/course-head";
import CourseDetailsOne from "@/components/Course-Details/CourseDetails-One";
import PageHead from "@/pages/Head";
import CourseActionBottom from "@/components/Course-Details/Course-Sections/Course-Action-Bottom";
import SimilarCourses from "@/components/Course-Details/Course-Sections/SimilarCourses";

import allCollegeDetails from '@/data/admin_colleges.json'

const SingleCourse = () => {
  const router = useRouter();
  const postId = router.query.courseId;
  const [collegeDetails, setCollegeDetails] = useState('');

  let getCourse;

  getCourse = JSON.parse(JSON.stringify(CourseData.courseDetails));

  const checkMatch = getCourse.find((course) => course.id === postId);

  useEffect(() => {
    let college = null;
    allCollegeDetails?.forEach((detail, id) => {
      if (detail._id.$oid == postId) {
        college = detail;
      }
    })

    allCollegeDetails?.forEach((detail, id) => {
      detail?.courses.forEach(ele => {
        if (ele?.$oid == postId) {
          college = detail;
        }
      })
    })

    console.log(college)

    setCollegeDetails(college)

    sal({
      threshold: 0.01,
      once: true,
    });
  }, [checkMatch, router, postId]);

  return (
    <>
      <PageHead title="Course Details" />
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="" headerType={true} />
          <Cart />

          <div className="rbt-breadcrumb-default rbt-breadcrumb-style-3">
            <CourseHead
              checkMatch={collegeDetails !== undefined ? collegeDetails : ""}
            />
          </div>

          <div className="rbt-course-details-area ptb--60">
            <div className="container">
              <div className="row g-5">
                <CourseDetailsOne
                  checkMatchCourses={collegeDetails !== undefined ? collegeDetails : ""}
                />
              </div>
            </div>
          </div>

          {/* <CourseActionBottom
            checkMatchCourses={collegeDetails !== undefined ? collegeDetails : ""}
          /> */}

          <div className="rbt-related-course-area bg-color-white pt--60 rbt-section-gapBottom">
            {/* <SimilarCourses
              checkMatchCourses={
                collegeDetails !== undefined ? collegeDetails : ""
              }
            /> */}
          </div>

          <BackToTop />
          <Separator />
          <FooterOne />
        </Context>
      </Provider>
    </>
  );
};

export default SingleCourse;
