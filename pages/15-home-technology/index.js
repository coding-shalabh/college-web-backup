import PageHead from "../Head";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import BackToTop from "../backToTop";

import Context from "@/context/Context";
import Cart from "@/components/Header/Offcanvas/Cart";

import Separator from "@/components/Common/Separator";
import FooterThree from "@/components/Footer/Footer-Three";
import HeaderStyleTwelve from "@/components/Header/HeaderStyle-Twelve";
import SideNav from "@/components/Header/SideNav";
import HomeTechnology from "@/components/15-home-technology/HomeTechnology";

const HomeTechnologyPage = () => {
  return (
    <>
      <PageHead title="Home Technology - Online Courses & Education NEXTJS14 Template" />
      <Provider store={Store}>
        <Context>
          <SideNav />
          {/* BackDrop not show up "SideNav" */}
          <HeaderStyleTwelve />
          <Cart />

          <HomeTechnology />

          <BackToTop />
          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default HomeTechnologyPage;
