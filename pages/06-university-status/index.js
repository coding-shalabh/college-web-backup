import PageHead from "../Head";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import BackToTop from "../backToTop";

import Context from "@/context/Context";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";

import HeaderStyleFour from "@/components/Header/HeaderStyle-Four";
import UniversityStatus from "@/components/06-university-status/UniversityStatus";
import FooterThree from "@/components/Footer/Footer-Three";

const UniversityStatusPage = () => {
  return (
    <>
      <PageHead title="University Status - Online Courses & Education NEXTJS14 Template" />
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleFour />
          <Cart />

          <UniversityStatus />

          <BackToTop />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default UniversityStatusPage;
