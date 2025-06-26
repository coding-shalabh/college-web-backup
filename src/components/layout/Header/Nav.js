import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

import MenuData from "@/src/data/MegaMenu.json";

import CourseLayout from "./NavProps/CourseLayout";
import PageLayout from "./NavProps/PageLayout";
import ElementsLayout from "./NavProps/ElementsLayout";

import addImage from "@/images/service/mobile-cat.jpg";

const Nav = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const router = useRouter();

  const isActive = (href) => router.pathname === href;

  const toggleMenuItem = (item) => {
    setActiveMenuItem(activeMenuItem === item ? null : item);
  };

  return (
    <nav className="mainmenu-nav">
      <ul className="mainmenu">
        <li className="with-megamenu has-menu-child-item position-static">
          <Link
            href="/"
            className={`${isActive("/") ? "active" : ""}`}
          >
            Home
          </Link>
        </li>

        <li className="with-megamenu has-menu-child-item">
          <Link
            href="/courses"
            className={`${isActive("/courses") ? "active" : ""}`}
          >
            Our Courses
          </Link>
        </li>

        <li className="with-megamenu has-menu-child-item">
          <Link
            href="/colleges"
            className={`${isActive("/colleges") ? "active" : ""}`}
          >
            Our Colleges
          </Link>
        </li>

        <li className="with-megamenu has-menu-child-item position-static">
          <Link
            href="/about-us"
            className={`${isActive("/about-us") ? "active" : ""}`}
          >
            About Us
          </Link>
        </li>
        
        <li className="with-megamenu has-menu-child-item position-static">
          <Link
            href="/contact-us"
            className={`${isActive("/contact-us") ? "active" : ""}`}
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
