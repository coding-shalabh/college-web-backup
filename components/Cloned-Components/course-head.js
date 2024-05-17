import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Link } from "react-scroll";
import { Form, Modal, Input, Select, Button } from "antd";
import CourseBreadcrumb from "./Course-Breadcrumb";
import bgImage from "@/public/images/bg/bg-image-10.jpg";
import courseList from "@/data/admin_courses.json";
import { renderToStaticMarkup } from "react-dom/server";


const CourseHead = ({ checkMatch }) => {
  const [showModalForm, setShowModalForm] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const sendEmail = async (formBody) => {
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
            {Object.entries(formBody).map(([key, value], index) => (
              <tr key={index}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{key}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    };
  
    try {
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
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const applyForCourse = (values) => {
    sendEmail(values);
  };
  

  return (
    <>
      <div className="breadcrumb-inner">
        <Image src={bgImage} alt="Education Images" />
      </div>
      <div className="container">
        <div className="row">
          <CourseBreadcrumb getMatchCourse={checkMatch && checkMatch} />
        </div>
        <Link
          className="rbt-btn btn-gradient icon-hover text-center"
          href="#"
          style={{ width: '200px', zIndex: 1000 }}
          onClick={(e) => {
            e.preventDefault();
            setShowModalForm(true);
          }}
        >
          <span className="btn-text">Contact us</span>
          <span className="btn-icon">
            <i className="feather-arrow-right"></i>
          </span>
        </Link>
      </div>
      {/* Modal Code Here */}
      <Modal
        title="Contact Us"
        visible={showModalForm}
        onCancel={() => setShowModalForm(false)}
        footer={null}
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
            valuePropName={checkMatch?.name}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input
              readOnly
              defaultValue={checkMatch?.name}
              value={checkMatch?.name}
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
              options={courseList?.map((course) => {
                return {
                  label: `${course?.title}`,
                  value: `${course?._id?.$oid}`,
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

export default CourseHead;
