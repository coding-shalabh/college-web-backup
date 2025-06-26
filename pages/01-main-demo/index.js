import PageHead from "@/src/components/common/PageHead";
import { 
  HeaderStyleTen, 
  Separator, 
  MainDemo, 
  MobileMenu, 
  Cart, 
  FooterThree 
} from "@/src/components";

import Context from "@/context/Context";
import { Provider } from "react-redux";
import Store from "@/redux/store";

const Home = () => {
  return (
    <>
      <PageHead title="Home" />

      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <MainDemo />
          <Cart />

          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};


export default Home;
