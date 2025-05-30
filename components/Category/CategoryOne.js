import Image from "next/image";
import Link from "next/link";

import CourseDetails from "../../data/course-details/courseData.json";
import useCategoryCount from "@/context/useCategoryCount";
import allCategories from "@/data/admin_categories";

const CategoryOne = () => {
  const { categoryCounts } = useCategoryCount(CourseDetails.courseDetails);

  return (
    <>
      {allCategories &&
        allCategories?.map((item, innerIndex) => {
          const count = categoryCounts[item.category] || 0;
          return (
            <>
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-12"
                key={innerIndex}
              >
                <Link
                  className="rbt-cat-box rbt-cat-box-1 text-center"
                  href="/courses"
                  // href={`/course-filter-one-toggle/${item.category}`}
                >
                  <div
                    className="inner"
                    style={{
                      border: "2px solid",
                      borderImage:
                        "linear-gradient(to right, var(--color-primary), var(--color-secondary), var(--color-secondary), var(--color-primary)) 1",
                      borderImageSlice: 1,
                      borderRadius: "20px", // ❗ Don't use !important inside React style
                      backgroundColor: "transparent",
                    }}
                  >
                    <div className="content">
                      <h5 className="title">{item.title}</h5>
                      <div className="read-more-btn">
                        <div className="rbt-btn-link">
                          50+ Courses
                          <i className="feather-arrow-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          );
        })}
    </>
  );
};

export default CategoryOne;
