import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import sal from "sal.js";
import CourseData from "../../../data/course-details/courseData.json";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";

import { 
  MobileMenu, 
  HeaderStyleTen, 
  Cart, 
  Separator, 
  FooterOne,
  CourseHead,
  CourseDetailsOne
} from "@/src/components";
import BackToTop from "@/pages/backToTop";
import PageHead from "@/src/components/common/PageHead";

import allCollegeDetails from '@/src/data/admin_colleges.json'
import Link from "next/link";

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
      console.log(detail)
      if (detail?._id?.$oid == postId) {
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

          <BackToTop />
          <Separator />
          <FooterOne />
        </Context>
      </Provider>
    </>
  );
};

export default SingleCourse;