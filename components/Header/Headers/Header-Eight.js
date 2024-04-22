import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/Context"; // Ensure the context is imported if used

import HeaderRightTwo from "../Header-Right/HeaderRight-Two";
import Search from "../Offcanvas/Search";
import Category from "../Category/Category";
import Nav from "../../Cloned-Components/Nav";

// import logo from "@/images/logo/logo.png";
import logo from "@/images/logo/logo.png";

const HeaderEight = ({
  headerType,
  gapSpaceBetween,
  sticky,
  headerSticky,
  navigationEnd,
  container,
  btnClass,
  btnText,
}) => {
  const { mobile, setMobile } = useAppContext(); // Using context if applicable
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`rbt-header-wrapper ${gapSpaceBetween} ${sticky} ${
          !headerType && isSticky ? headerSticky : ""
        }`}
      >
        <div className={`${container}`}>
          <div className={`mainbar-row ${navigationEnd} align-items-center`}>
            <div className="header-left rbt-header-content">
              <div className="header-info">
                <div className="logo">
                  <Link href="/">
                    {console.log(logo, "111111111")}
                    {/* <img src={logo.src} width={152} height={50} alt="Logo Image" /> */}
                    <Image
                      unoptimized
                      src={logo}
                      width={152}
                      height={50}
                      priority={true}
                      alt="Logo Image"
                    />
                  </Link>
                </div>
              </div>

              <div className="header-info d-none d-lg-block">
                <Category />
              </div>
            </div>

            <div className="rbt-main-navigation d-none d-xl-block">
              <Nav />
            </div>

            <div className="header-right">
              {/* <div className="rbt-btn-wrapper d-xl-block">
                <Link className={`rbt-btn ${btnClass}`} href="#">
                  <span data-text={`${btnText}`}>{btnText}</span>
                </Link>
              </div> */}

              <div className="mobile-menu-bar d-block d-xl-none">
                <div className="hamberger">
                  <button
                    className="hamberger-button rbt-round-btn"
                    onClick={() => setMobile(!mobile)}
                  >
                    <i className="feather-menu"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Search />
      </div>
    </>
  );
};

export default HeaderEight;
