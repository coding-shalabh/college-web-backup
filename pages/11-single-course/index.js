import PageHead from "../Head";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import BackToTop from "../backToTop";

import Context from "@/context/Context";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";

import HeaderStyleEleven from "@/components/Header/HeaderStyle-Eleven";
import SingleCourse from "@/components/11-single-course/SingleCourse";
import Separator from "@/components/Common/Separator";
import FooterThree from "@/components/Footer/Footer-Three";

const SingleCoursePage = () => {
  return (
    <>
      <PageHead title="Single Course - Online Courses & Education NEXTJS14 Template" />
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleEleven />
          <Cart />

          <SingleCourse />

          <BackToTop />
          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default SingleCoursePage;
