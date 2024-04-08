import PageHead from "../Head";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import BackToTop from "../backToTop";

import Context from "@/context/Context";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";

import HeaderStyleSix from "@/components/Header/HeaderStyle-Six";
import CourseSchool from "@/components/02-course-school/CourseSchool";
import FooterFour from "@/components/Footer/FooterFour";

const CourseSchoolPage = () => {
  return (
    <>
      <PageHead title="Course School - Online Courses & Education NEXTJS14 Template" />
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleSix headerType="rbt-transparent-header" />
          <Cart />

          <CourseSchool />

          <BackToTop />
          <FooterFour />
        </Context>
      </Provider>
    </>
  );
};

export default CourseSchoolPage;
