import Image from "next/image";
import Link from "next/link";

import CourseDetails from "../../data/course-details/courseData.json";
import useCategoryCount from "@/context/useCategoryCount";
import allCategories from '@/data/admin_categories'

const CategoryOne = () => {
  const { categoryCounts } = useCategoryCount(CourseDetails.courseDetails);

  return (
    <>
      {allCategories &&
        allCategories?.map((item, innerIndex) => {
          const count = categoryCounts[item.category] || 0;
          return (
            <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={innerIndex}>
              <Link
                className="rbt-cat-box rbt-cat-box-1 text-center"
                href={`#`}
              // href={`/course-filter-one-toggle/${item.category}`}
              >
                <div className="inner">
                  <div className="icons">
                    <Image
                      src={item.cateSmallImg}
                      width={80}
                      height={80}
                      priority
                      alt="Icons Images"
                    />
                  </div>
                  <div className="content">
                    <h5 className="title">{item.title}</h5>
                    <div className="read-more-btn">
                      <span className="rbt-btn-link">
                        {count} Course{count !== 1 ? "s" : ""}
                        <i className="feather-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default CategoryOne;
