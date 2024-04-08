import PageHead from "../Head";
import { Provider } from "react-redux";
import Context from "@/context/Context";
import Store from "@/redux/store";

import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import BackToTop from "../backToTop";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import UdemyAffiliate from "@/components/16-udemy-affiliate/UdemyAffiliate";

const UdemyAffiliateLayout = () => {
  return (
    <>
      <PageHead title="Udemy Affiliate - Online Courses & Education NEXTJS14 Template" />
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <UdemyAffiliate />
          <Cart />

          <BackToTop />
          <Separator />
          <FooterOne bgColor="bg-color-darker" />
        </Context>
      </Provider>
    </>
  );
};

export default UdemyAffiliateLayout;
