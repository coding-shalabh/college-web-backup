import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Modal, Button, Form, Input, Select } from "antd";
import courseList from "@/data/admin_courses.json";
import { renderToStaticMarkup } from "react-dom/server";
import "venobox/dist/venobox.min.css";

import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "@/context/Context";
import { addToCartAction } from "@/redux/action/CartAction";

const Viedo = ({ checkMatchCourses }) => {
  const { cartToggle, setCart } = useAppContext();
  const [toggle, setToggle] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false);
  const [form] = Form.useForm();

  // =====> Start ADD-To-Cart
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.CartReducer);
  const [courseListArray, setCourseListArray] = useState([]);
  const [amount, setAmount] = useState(1);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    // Set the state to true in useEffect which runs on client-side after mounting
    setShowModalForm(true);
  }, []);

  useEffect(() => {
    let courseArr = [];

    courseList?.forEach((course) => {
      checkMatchCourses?.courses?.forEach((list) => {
        if (list?.$oid == course?._id?.$oid) {
          courseArr.push(course);
        }
      });
    });
    setCourseListArray(courseArr);

    setSelectedCollege(checkMatchCourses?.name);
  }, [showModalForm]);

  const applyForCourse = (values) => {
    const formBody = {
      ...values,
      college: selectedCollege,
    };
    
    // text: `
    // ${Object.entries(formBody)?.map(([key, value], id) => {
    //   return `
    //   ${key}: ${value}
    //   `;
    // })}
    // `,
    const sendEmail = async () => {
      const emailData = {
        to: "abhishek23350@gmail.com",
        subject: "Enquiry for Registration",
        html: renderToStaticMarkup(
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
          <thead>
              <tr>
                  <th style={{ border: '1px solid black', padding: '8px', background: '#f2f2f2' }}>Field</th>
                  <th style={{ border: '1px solid black', padding: '8px', background: '#f2f2f2' }}>Value</th>
              </tr>
          </thead>
          <tbody>
              {Object.entries(formBody).map(([key, value]) => (
                  <tr key={key}>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{key}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{value}</td>
                  </tr>
              ))}
          </tbody>
      </table>
        )
      };

      const response = await fetch("https://api.gined.in/api/email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Email sent successfully:", data);
        setShowModalForm(false);
        form.resetFields();
      } else {
        console.error("Email sending failed:", data);
      }
    };

    sendEmail();
  };

  useEffect(() => {
    dispatch({ type: "COUNT_CART_TOTALS" });
    localStorage.setItem("hiStudy", JSON.stringify(cart));
  }, [cart]);

  // =====> For video PopUp
  useEffect(() => {
    import("venobox/dist/venobox.min.js").then((venobox) => {
      new venobox.default({
        selector: ".popup-video",
      });
    });

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isHide = currentScrollPos > 200;

      setHideOnScroll(isHide);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* <Link
        className={`video-popup-with-text video-popup-wrapper text-center popup-video sidebar-video-hidden mb--15 ${hideOnScroll ? "d-none" : ""
          }`}
        data-vbtype="video"
        href= {`${checkMatchCourses.virtualTourLink}`}
      >
        <div className="video-content">
            <video
              className="w-100 rbt-radius"
              src={checkMatchCourses?.courseImg}
              width={355}
              height={255}
              src={`${checkMatchCourses.virtualTourLink}`}
            />
          <div className="position-to-top">
            <span className="rbt-btn rounded-player-2 with-animation">
              <span className="play-icon"></span>
            </span>
          </div>
          <span className="play-view-text d-block color-white">
            <i className="feather-eye"></i> Preview this course
          </span>
        </div>
      </Link> */}
      <div className="video-content">
        <iframe
          src={checkMatchCourses?.virtualTourLink ? checkMatchCourses?.virtualTourLink : 'https://www.easytourz.com/BT-EmabedTour/all/9f30f3feef0a3ebb'}
          frameBorder="0"
          className="w-100 rbt-radius"
          width={355}
          height={255} // Adjust height as needed
          allowFullScreen
        ></iframe>
      </div>
      <div className="content-item-content">
        {/* <div className="rbt-price-wrapper d-flex flex-wrap align-items-center justify-content-between">
          <div className="rbt-price">
            <span className="current-price">${checkMatchCourses?.price}</span>
            <span className="off-price">${checkMatchCourses?.offPrice}</span>
          </div>
          <div className="discount-time">
            <span className="rbt-badge color-danger bg-color-danger-opacity">
              <i className="feather-clock"></i> {checkMatchCourses?.days} days
              left!
            </span>
          </div>
        </div> */}

        <div className="add-to-card-button mt--15">
          <Link
            className="rbt-btn btn-gradient icon-hover w-100 d-block text-center"
            href="#"
            onClick={() => setShowModalForm(true)}
          >
            <span className="btn-text">Apply Now</span>
            <span className="btn-icon">
              <i className="feather-arrow-right"></i>
            </span>
          </Link>
        </div>

        {/* <div className="buy-now-btn mt--15">
          <Link
            className="rbt-btn btn-border icon-hover w-100 d-block text-center"
            href="#"
          >
            <span className="btn-text">Buy Now</span>
            <span className="btn-icon">
              <i className="feather-arrow-right"></i>
            </span>
          </Link>
        </div> */}
        {/* <span className="subtitle">
          <i className="feather-rotate-ccw"></i> 30-Day Money-Back Guarantee
        </span> */}
        <div
          className={`rbt-widget-details has-show-more ${
            toggle ? "active" : ""
          }`}
        >
          <ul className="has-show-more-inner-content rbt-course-details-list-wrapper">
            {/* {checkMatchCourses &&
              checkMatchCourses?.roadmap.map((item, innerIndex) => (
                <li key={innerIndex}>
                  <span>{item.text}</span>
                  <span className="rbt-feature-value rbt-badge-5">
                    {item.desc}
                  </span>
                </li>
              ))} */}
          </ul>
          {/* <div
            className={`rbt-show-more-btn ${toggle ? "active" : ""}`}
            onClick={() => setToggle(!toggle)}
          >
            Show More
          </div> */}
        </div>

        <div className="social-share-wrapper mt--30 text-center">
          <div className="rbt-post-share d-flex align-items-center justify-content-center">
            <ul className="social-icon social-default transparent-with-border justify-content-center">
              <li>
                <Link href="https://www.facebook.com/">
                  <i className="feather-facebook"></i>
                </Link>
              </li>
              <li>
                <Link href="https://www.twitter.com">
                  <i className="feather-twitter"></i>
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/">
                  <i className="feather-instagram"></i>
                </Link>
              </li>
              <li>
                <Link href="https://www.linkdin.com/">
                  <i className="feather-linkedin"></i>
                </Link>
              </li>
            </ul>
          </div>
          <hr className="mt--20" />
          <div className="contact-with-us text-center">
            <p>For details about the course</p>
            <p className="rbt-badge-2 mt--10 justify-content-center w-100">
              <i className="feather-phone mr--5"></i> Call Us:{" "}
              <Link href="#">
                <strong>+444 555 666 777</strong>
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Modal
        className="course-enquire-registration-modal"
        title="Enquire Registration"
        open={showModalForm}
        onCancel={() => setShowModalForm(false)}
        footer={false}
      >
        <Form
          form={form}
          className="course-enquire-registration-form"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={(values) => {
            applyForCourse(values);
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: false,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mobile"
            name="mobile"
            rules={[
              {
                required: true,
                message: "Please input your mobile!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="College"
            valuePropName={checkMatchCourses?.name}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input
              readOnly
              defaultValue={checkMatchCourses?.name}
              value={checkMatchCourses?.name}
            />
          </Form.Item>

          <Form.Item
            label="Courses"
            name="courses"
            rules={[
              {
                required: true,
                message: "Please input your course!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a course"
              optionFilterProp="children"
              options={courseListArray?.map((course) => {
                return {
                  label: `${course?.title}`,
                  value: `${course?.title}`,
                };
              })}
            />
          </Form.Item>

          <Form.Item
            label="Neet score(optional)"
            name="neet_score"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Preferred state(optional)"
            name="preferred_state"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Preferred college(optional)"
            name="preferred_college"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Domicile(optional)"
            name="domicile"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Viedo;
