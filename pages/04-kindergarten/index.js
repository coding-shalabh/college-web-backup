import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";
import PageHead from "../Head";

import MobileMenu from "@/components/Header/MobileMenu";
import Kindergarten from "@/components/04-kindergarten/04-kindergarten";
import Cart from "@/components/Header/Offcanvas/Cart";
import FooterOne from "@/components/Footer/Footer-One";
import BackToTop from "../backToTop";
import HeaderStyleEight from "@/components/Header/HeaderStyle-Eight";

const Home = () => {
  return (
    <>
      <PageHead title="Kindergarten - Online Courses & Education NEXTJS14 Template" />
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleEight headerSticky="rbt-sticky" headerType="" />
          <Kindergarten />
          <Cart />

          <BackToTop />
          <FooterOne />
        </Context>
      </Provider>
    </>
  );
};

export default Home;
