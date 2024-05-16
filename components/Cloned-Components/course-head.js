import Image from "next/image";

import CourseBreadcrumb from "./Course-Breadcrumb";

import bgImage from "@/public/images/bg/bg-image-10.jpg";
import { useRouter } from "next/router";
import { Link } from "react-scroll";

const CourseHead = ({ checkMatch }) => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <>
      <div className="breadcrumb-inner">
        <Image src={bgImage} alt="Education Images" />
      </div>
      <div className="container">
        <div className="row">
          <CourseBreadcrumb getMatchCourse={checkMatch && checkMatch} />
        </div>
        <Link
            className="rbt-btn btn-gradient icon-hover text-center"
            href="/contact-us"
            style={{width: '200px', zIndex:1000}}
          >
            <span className="btn-text">Contact us</span>
            <span className="btn-icon">
              <i className="feather-arrow-right"></i>
            </span>
          </Link>
      </div>
      
    </>
  );
};

export default CourseHead;
