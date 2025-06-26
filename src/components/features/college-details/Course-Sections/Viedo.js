import React, { useState, useMemo } from "react";
import { Form, Modal, Input, Select, Button, Radio } from "antd";
import { renderToStaticMarkup } from "react-dom/server";
import allCourses from "../../../../data/admin_courses.json";

const Viedo = ({ checkMatchCourses }) => {
  const [showModalForm, setShowModalForm] = useState(false);
  const [form] = Form.useForm();

  // Get courses available in this specific college
  const collegeCourses = useMemo(() => {
    if (!checkMatchCourses?.courses || !Array.isArray(checkMatchCourses.courses)) {
      return [];
    }
    
    const courseList = [];
    checkMatchCourses.courses.forEach((courseRef) => {
      const courseId = courseRef.$oid || courseRef;
      const foundCourse = allCourses.find(course => 
        course._id.$oid === courseId || course._id === courseId
      );
      
      if (foundCourse) {
        courseList.push({
          id: foundCourse._id.$oid || foundCourse._id,
          title: foundCourse.title
        });
      }
    });
    
    return courseList;
  }, [checkMatchCourses?.courses]);

  const sendEmail = async (formBody) => {
    const emailData = {
      to: "abhishek23350@gmail.com",
      subject: "College Contact Request - Callback",
      html: renderToStaticMarkup(
        <div>
          <h2>New College Contact Request</h2>
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
        </div>
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
        // Show success message
        Modal.success({
          title: 'Request Submitted!',
          content: 'Thank you for your interest. We will contact you soon!',
        });
      } else {
        console.error("Email sending failed:", data);
        Modal.error({
          title: 'Error',
          content: 'Failed to submit your request. Please try again.',
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      Modal.error({
        title: 'Error',
        content: 'Failed to submit your request. Please try again.',
      });
    }
  };

  const handleContactSubmit = (values) => {
    sendEmail(values);
  };

  return (
    <div>
      <div className="video-wrapper">
        {checkMatchCourses?.virtualTourLink && checkMatchCourses.virtualTourLink.includes("easytourz") && (
          <div className="thumbnail">
            <iframe
              src={checkMatchCourses.virtualTourLink}
              title="Virtual Tour"
              className="w-100"
              style={{ border: 0, height: '400px' }}
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
        
      <div className="content">
        <div className="course-top-meta">
          <div className="d-flex align-items-center">
            <div className="course-top-price">
              <span className="current-price">
                {checkMatchCourses?.name || "College Information"}
              </span>
            </div>
          </div>
        </div>
        
        <div className="course-meta-wrapper" style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div className="course-meta">
            <span className="course-meta-text">
              <i className="feather-map-pin"></i>
              {checkMatchCourses?.location || "Location not specified"}
            </span>
          </div>
          
          {checkMatchCourses?.courses && (
            <div className="course-meta" style={{ marginTop: "10px", marginBottom: "10px" }}>
              <span className="course-meta-text">
                <i className="feather-book"></i>
                {checkMatchCourses.courses.length} Courses Available
              </span>
            </div>
          )}
        </div>
        
        <div className="rbt-purchase-btn">
          <button 
            className="rbt-btn btn-gradient hover-icon-reverse w-100"
            onClick={() => setShowModalForm(true)}
          >
            <span className="icon-reverse-wrapper">
              <span className="btn-text">Contact College</span>
              <span className="btn-icon">
                <i className="feather-arrow-right"></i>
              </span>
              <span className="btn-icon">
                <i className="feather-arrow-right"></i>
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Contact College Modal */}
      <Modal
        title="Request Callback - Contact College"
        open={showModalForm}
        onCancel={() => setShowModalForm(false)}
        footer={null}
        width={600}
      >
        <div className="contact-form-wrapper">
          <p className="mb-4">Fill out the form below and we&apos;ll have the college contact you shortly.</p>
          
          <Form
            form={form}
            className="college-contact-form"
            name="college-contact"
            layout="vertical"
            onFinish={handleContactSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter your full name!",
                },
              ]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Mobile Number"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "Please enter your mobile number!",
                },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit mobile number!",
                },
              ]}
            >
              <Input placeholder="Enter your mobile number" />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email address!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input placeholder="Enter your email address" />
            </Form.Item>

            <Form.Item
              label="College"
              name="college"
              initialValue={checkMatchCourses?.name}
            >
              <Input
                readOnly
                value={checkMatchCourses?.name}
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </Form.Item>

            <Form.Item
              label="Course of Interest"
              name="course"
              rules={[
                {
                  required: true,
                  message: "Please select a course!",
                },
              ]}
            >
              <div 
                style={{ 
                  maxHeight: '300px', 
                  overflowY: 'auto',
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  padding: '8px'
                }}
              >
                <Radio.Group>
                  {collegeCourses.length > 0 ? (
                    collegeCourses.map((course) => (
                      <Radio 
                        key={course.id} 
                        value={course.id}
                        style={{ 
                          display: 'block', 
                          height: '30px', 
                          lineHeight: '30px',
                          marginBottom: '4px'
                        }}
                      >
                        {course.title}
                      </Radio>
                    ))
                  ) : (
                    <div style={{ padding: '8px', color: '#999' }}>
                      No courses available in this college
                    </div>
                  )}
                </Radio.Group>
              </div>
            </Form.Item>

            <Form.Item
              label="Preferred Contact Time"
              name="preferredTime"
            >
              <div 
                style={{ 
                  maxHeight: '300px', 
                  overflowY: 'auto',
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  padding: '8px'
                }}
              >
                <Radio.Group>
                  <Radio 
                    value="morning"
                    style={{ 
                      display: 'block', 
                      height: '30px', 
                      lineHeight: '30px',
                      marginBottom: '4px'
                    }}
                  >
                    Morning (9 AM - 12 PM)
                  </Radio>
                  <Radio 
                    value="afternoon"
                    style={{ 
                      display: 'block', 
                      height: '30px', 
                      lineHeight: '30px',
                      marginBottom: '4px'
                    }}
                  >
                    Afternoon (12 PM - 4 PM)
                  </Radio>
                  <Radio 
                    value="evening"
                    style={{ 
                      display: 'block', 
                      height: '30px', 
                      lineHeight: '30px',
                      marginBottom: '4px'
                    }}
                  >
                    Evening (4 PM - 8 PM)
                  </Radio>
                  <Radio 
                    value="anytime"
                    style={{ 
                      display: 'block', 
                      height: '30px', 
                      lineHeight: '30px',
                      marginBottom: '4px'
                    }}
                  >
                    Anytime
                  </Radio>
                </Radio.Group>
              </div>
            </Form.Item>

            <Form.Item
              label="Additional Message (Optional)"
              name="message"
            >
              <Input.TextArea 
                rows={3} 
                placeholder="Any specific questions or requirements?" 
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="rbt-btn btn-gradient w-100"
                size="large"
              >
                Request Callback
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Viedo; 