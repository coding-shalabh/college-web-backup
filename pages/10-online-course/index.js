import PageHead from "../Head";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import BackToTop from "../backToTop";

import Context from "@/context/Context";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";

import HeaderStyleThree from "@/components/Header/HeaderStyle-Three";
import OnlineCourse from "@/components/10-online-course/OnlineCourse";
import FooterThree from "@/components/Footer/Footer-Three";

const OnlineCoursePage = () => {
  return (
    <>
      <PageHead title="Online Course - Online Courses & Education NEXTJS14 Template" />
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleThree
            headerType="rbt-transparent-header"
            headerSticky="rbt-sticky"
          />
          <Cart />

          <OnlineCourse />

          <BackToTop />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default OnlineCoursePage;
