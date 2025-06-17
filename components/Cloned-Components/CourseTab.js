import Image from "next/image";
import Link from "next/link";

import { useAppContext } from "@/context/Context";

const CourseTab = ({ course, start, end, pageType = 1 }) => {
  const { toggle } = useAppContext();

  return (
    <>
      <div
        className={`rbt-course-grid-column ${
          !toggle ? "active-list-view" : ""
        }`}
      >
        {pageType == 1
          ? course?.slice(start, end)?.map((data, index) => (
              <Link
                href={
                  pageType == 1
                    ? `/colleges/${data._id.$oid}`
                    : pageType == 2
                    ? `/college-details/${data._id.$oid}`
                    : "#"
                }
                className="course-grid-3"
                key={index}
              >
                <div
                  className={`rbt-card variation-01 rbt-hover ${
                    !toggle ? "card-list-2" : ""
                  }`}
                >
                  {/* <div className="rbt-card-img">
                <Image
                  className="h-100"
                  src={data.courseImg}
                  width={362}
                  height={448}
                  alt="Card image"
                />
                <div className="rbt-badge-3 bg-white">
                    <span>-{data.offPrice}%</span>
                    <span>Off</span>
                  </div>
              </div> */}
                  <div className="rbt-card-body">
                    {/* <div className="rbt-card-top">
                  <div className="rbt-review">
                    <div className="rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <span className="rating-count">
                      ({data.reviews} Reviews)
                    </span>
                  </div>
                  <div className="rbt-bookmark-btn">
                    <i className="feather-bookmark"></i>
                  </div>
                </div> */}

                    <h4 className="rbt-card-title">{data.title}</h4>

                    {/* <ul className="rbt-meta">
                  <li>
                  <i className="feather-book"></i>
                  {data.lesson} Lessons
                  </li>
                  <li>
                  <i className="feather-users"></i>
                  {data.student} Students
                  </li>
                </ul> */}

                    <p
                      className="rbt-card-text"
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    ></p>
                    {/* <div className="rbt-author-meta mb--10">
                  <div className="rbt-avater">
                  <Link href="#">
                  <Image
                  src={data.userImg}
                  width={33}
                  height={33}
                  alt="Sophia Jaymes"
                  />
                  </Link>
                  </div>
                  <div className="rbt-author-info">
                  By <Link href={`/profile/${data.id}`}>{data.userName}</Link>{" "}
                  In <Link href="#">{data.userCategory}</Link>
                  </div>
                </div> */}
                    <div className="rbt-card-bottom">
                      {/* <div className="rbt-price">
                    <span className="current-price">${data.price}</span>
                    <span className="off-price">${data.offPrice}</span>
                  </div> */}
                      Learn More<i className="feather-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          : course?.slice(start, end)?.map((data, index) => (
              <Link
                href={
                  pageType == 1
                    ? `/colleges/${data?._id?.$oid}`
                    : pageType == 2
                    ? `/college-details/${data?._id?.$oid}`
                    : "#"
                }
                className="course-grid-3"
                key={index}
              >
                <div
                  className={`rbt-card variation-01 rbt-hover ${
                    !toggle ? "card-list-2" : ""
                  }`}
                >
                  <div className="rbt-card-img">
                      {data?.image ? (
                      <img
                        className="h-100"
                        src={data?.image}
                        width={362}
                        height={448}
                        alt="Card image"
                      />
                    ) : (
                      <div className="rbt-card-img">
                        <span>No Image</span>
                      </div>
                    )}
                    {/* <div className="rbt-badge-3 bg-white">
                    <span>-{data.offPrice}%</span>
                    <span>Off</span>
                  </div> */}
                  </div>
                  <div className="rbt-card-body">
                    <div className="rbt-card-top">
                      <div className="rbt-review">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                        <span className="rating-count">
                          ({data.reviews} Reviews)
                        </span>
                      </div>
                      <div className="rbt-bookmark-btn">
                        <i className="feather-bookmark"></i>
                      </div>
                    </div>

                    <h4 className="rbt-card-title">{data.name}</h4>

                    {/* <ul className="rbt-meta">
                  <li>
                  <i className="feather-book"></i>
                  {data.lesson} Lessons
                  </li>
                  <li>
                  <i className="feather-users"></i>
                  {data.student} Students
                  </li>
                </ul> */}

                    <p
                      className="rbt-card-text"
                      dangerouslySetInnerHTML={{ __html: data.excerpt }}
                    ></p>
                    {/* <div className="rbt-author-meta mb--10">
                  <div className="rbt-avater">
                  <Link href="#">
                  <Image
                  src={data.userImg}
                  width={33}
                  height={33}
                  alt="Sophia Jaymes"
                  />
                  </Link>
                  </div>
                  <div className="rbt-author-info">
                  By <Link href={`/profile/${data.id}`}>{data.userName}</Link>{" "}
                  In <Link href="#">{data.userCategory}</Link>
                  </div>
                </div> */}
                    <div className="rbt-card-bottom">
                      {/* <div className="rbt-price">
                    <span className="current-price">${data.price}</span>
                    <span className="off-price">${data.offPrice}</span>
                  </div> */}
                      Learn More<i className="feather-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </>
  );
};

export default CourseTab;
