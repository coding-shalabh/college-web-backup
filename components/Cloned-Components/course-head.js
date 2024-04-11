import Image from "next/image";

import CourseBreadcrumb from "./Course-Breadcrumb";

import bgImage from "@/public/images/bg/bg-image-10.jpg";
import { useRouter } from "next/router";

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
      </div>
    </>
  );
};

export default CourseHead;
