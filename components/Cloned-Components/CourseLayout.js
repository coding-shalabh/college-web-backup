import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const CourseLayout = ({ MenuData, courseTitle, type, courseType, num, colType = 2 }) => {
  const router = useRouter();

  const isActive = (href) => router.pathname === href;

  return (
    <>
      <div className={`col-lg-12 ${colType === 2 ? 'col-xl-6' : 'col-xl-4'} ${colType === 2 ? 'col-xxl-6' : 'col-xxl-4'} single-mega-item`}>
        <h3 className="rbt-short-title">{courseTitle}</h3>
        <ul className="mega-menu-item">
          {MenuData &&
            MenuData?.map((data, index) => {
              if (courseTitle === "Online Courses") {
                if (index >= 0 && index < 10) {
                  return (<li>
                    <Link
                      href={'/course-with-tab/1'}
                    >
                      {data.title}
                    </Link>
                  </li>);
                }
              }
              else if (courseTitle === "Offline Courses") {
                if (index >= 10 && index < 20) {
                  return (<li>
                    <Link
                      href={'/course-with-tab/2'}
                    >
                      {data.title}
                    </Link>
                  </li>);
                }
              }
              else if (courseTitle === "Overseas Courses") {
                if (index >= 20 && index < 30) {
                  return (<li>
                    <Link
                      href={'/course-with-tab/3'}
                    >
                      {data.title}
                    </Link>
                  </li>);
                }
              }
              else if (courseTitle === "Top Colleges") {
                if (index >= 0 && index < 10) {
                  return (<li>
                    <Link
                      href={'/course-details/' + data._id.$oid}
                    >
                      {data.name}
                    </Link>
                  </li>);
                }
              }
              else if (courseTitle === "Colleges By Location") {
                if (index >= 0 && index < 10) {
                  return (<li>
                    <Link
                      href={'/course-details/' + data._id.$oid}
                    >
                      {data.name}
                    </Link>
                  </li>);
                }
              }
            })}
        </ul>
        <div style={{ position: 'absolute', bottom: 20, right: 50 }}>
          <Link
            href={'/course-with-tab'}
          >
            View All
          </Link>
        </div>
      </div>
    </>
  );
};
export default CourseLayout;
