import PageHead from "@/src/components/common/PageHead";

import Context from "@/context/Context";
import Store from "@/redux/store";
import { Provider } from "react-redux";

import { 
  Separator, 
  FooterOne, 
  HeaderStyleTen, 
  NotFound 
} from "@/src/components";

const ErrorPage = () => {
  return (
    <Provider store={Store}>
      <Context>
        <PageHead title="Page not found - Online Courses & Education NEXTJS14 Template" />
        <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />

        <NotFound />

        <Separator />
        <FooterOne />
      </Context>
    </Provider>
  );
};

export default ErrorPage;
